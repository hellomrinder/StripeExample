import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
});

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe secret key is configured
    const secretKey = process.env.STRIPE_SECRET_KEY;
    console.log('Server-side key check:', {
      exists: !!secretKey,
      length: secretKey?.length || 0,
      startsWith: secretKey?.substring(0, 7) || 'none'
    });

    if (!secretKey || 
        secretKey.includes('your_secret_key') || 
        secretKey.trim() === '' ||
        !secretKey.startsWith('sk_')) {
      console.error('STRIPE_SECRET_KEY is missing or invalid:', {
        exists: !!secretKey,
        isPlaceholder: secretKey?.includes('your_secret_key'),
        isEmpty: secretKey?.trim() === '',
        startsWithSk: secretKey?.startsWith('sk_')
      });
      return NextResponse.json(
        { 
          error: 'Stripe secret key is not configured. Please add STRIPE_SECRET_KEY to your .env file and restart the server.',
          details: secretKey ? 'Key exists but appears to be invalid' : 'Key is missing',
          hint: 'Make sure the key starts with sk_test_ or sk_live_'
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Creating checkout session for:', body);
    const { priceId, title, price, duration } = body;

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: title,
              description: `${duration} consultation session`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin') || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin') || 'http://localhost:3000'}/cancel`,
      metadata: {
        consultationType: title,
        duration: duration,
      },
    });

    console.log('Checkout session created successfully:', session.id);
    // Return both sessionId and url for compatibility
    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error.message || 'Unknown error occurred';
    const errorType = error.type || 'Unknown';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        type: errorType,
        details: error.raw?.message || error.raw || 'Check server logs for more details'
      },
      { status: 500 }
    );
  }
}

