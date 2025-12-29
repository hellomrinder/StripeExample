# Stripe Setup Guide

This guide will help you set up Stripe payment integration for the MindCare psychologist landing page.

## Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Sign up for a free account (or log in if you already have one)
3. Complete the account setup process

## Step 2: Get Your API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys** (or go directly to [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys))
3. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)
   - **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)

## Step 3: Configure Environment Variables

1. In the root directory of your project, create or edit the `.env` file
2. Add your Stripe keys:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
STRIPE_SECRET_KEY=sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**Important Notes:**
- Replace the example keys above with your actual keys from Stripe Dashboard
- For development, use **test keys** (they start with `pk_test_` and `sk_test_`)
- For production, use **live keys** (they start with `pk_live_` and `sk_live_`)
- The `.env` file should be in `.gitignore` and won't be committed to version control

## Step 4: Restart Your Development Server

After adding the keys to `.env`, restart your Next.js development server:

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

## Step 5: Test the Integration

1. Open your website at `http://localhost:3000`
2. Click "Book Consultation" on any consultation card
3. Use Stripe's test card numbers:
   - **Card number:** `4242 4242 4242 4242`
   - **Expiry date:** Any future date (e.g., `12/34`)
   - **CVC:** Any 3 digits (e.g., `123`)
   - **ZIP:** Any 5 digits (e.g., `12345`)

## Test Card Numbers

Stripe provides several test card numbers for different scenarios:

| Card Number | Description |
|------------|-------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0025 0000 3155` | Requires authentication |

For more test cards, visit: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

## Troubleshooting

### Error: "Stripe is not configured"
- Make sure you've created the `.env` file in the root directory
- Verify the keys are correctly copied (no extra spaces or quotes)
- Restart your development server after adding the keys

### Error: "Invalid API Key"
- Double-check that you copied the keys correctly
- Ensure you're using test keys for development (not live keys)
- Make sure there are no extra spaces or line breaks in the keys

### Payment not processing
- Check the browser console for errors
- Verify your Stripe account is activated
- Make sure you're using test mode keys in test mode

## Going Live

When you're ready to accept real payments:

1. Switch to **Live mode** in your Stripe Dashboard
2. Get your **live keys** (they start with `pk_live_` and `sk_live_`)
3. Update your `.env` file with the live keys
4. Update the success and cancel URLs in `app/api/create-checkout-session/route.ts` to your production domain
5. Test with a real card (you can refund test payments)

## Security Best Practices

- ✅ Never commit `.env` to version control (make sure it's in `.gitignore`)
- ✅ Never expose your secret key in client-side code
- ✅ Use test keys for development
- ✅ Use environment variables for different environments (development, staging, production)
- ✅ Regularly rotate your API keys
- ✅ Monitor your Stripe Dashboard for suspicious activity

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

