import { NextResponse } from 'next/server';

export async function GET() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  return NextResponse.json({
    publishableKeyConfigured: !!publishableKey && !publishableKey.includes('your_publishable_key'),
    secretKeyConfigured: !!secretKey && !secretKey.includes('your_secret_key'),
    publishableKeyPrefix: publishableKey ? publishableKey.substring(0, 12) + '...' : 'Not set',
    secretKeyPrefix: secretKey ? secretKey.substring(0, 12) + '...' : 'Not set',
    message: 'Check the console for full details. Keys are partially hidden for security.'
  });
}

