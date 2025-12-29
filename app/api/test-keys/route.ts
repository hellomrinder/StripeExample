import { NextResponse } from 'next/server';

export async function GET() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  return NextResponse.json({
    secretKeyPrefix: secretKey ? secretKey.substring(0, 12) + '...' : 'Not set',
    environment: process.env.NODE_ENV || 'unknown',
    message: 'Check the console for full details. Keys are partially hidden for security.'
  });
}
