# MindCare - Psychologist Landing Page

A modern, beautiful landing page for psychological consultation services with Stripe payment integration.

## Features

- 🎨 Modern, responsive design with gradient backgrounds
- 💳 Stripe payment integration for secure checkout
- 📱 Mobile-friendly interface
- ⚡ Fast and optimized with Next.js
- 🎯 Three consultation packages (all 5-minute sessions)
- ✅ Success and cancel pages for payment flow

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Stripe account (for payment processing)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Stripe API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - Make sure to use test keys for development

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Stripe Setup

**📖 For detailed Stripe setup instructions, see [STRIPE_SETUP.md](./STRIPE_SETUP.md)**

Quick setup:
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Create a `.env` file in the root directory with:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```
4. Replace the placeholder keys with your actual Stripe keys
5. Restart your development server

## Project Structure

```
app/
├── components/
│   └── ConsultationCard.tsx    # Consultation card component with Stripe integration
├── api/
│   └── create-checkout-session/
│       └── route.ts            # API route for creating Stripe checkout sessions
├── success/
│   └── page.tsx                # Success page after payment
├── cancel/
│   └── page.tsx                # Cancel page if payment is cancelled
├── page.tsx                    # Main landing page
├── layout.tsx                  # Root layout
└── globals.css                 # Global styles
```

## Consultation Packages

The landing page includes three consultation options:

1. **Quick Consultation** - $29.99
   - Brief assessment
   - Quick guidance
   - Resource recommendations

2. **Standard Consultation** - $39.99
   - Detailed assessment
   - Personalized guidance
   - Action plan
   - Follow-up resources

3. **Premium Consultation** - $49.99
   - Comprehensive assessment
   - Expert guidance
   - Detailed action plan
   - Priority follow-up
   - Resource package

All sessions are 5 minutes long.

## Customization

- Update consultation packages in `app/page.tsx`
- Modify colors and styling in `app/globals.css` and component files
- Update metadata in `app/layout.tsx`
- Customize Stripe checkout session in `app/api/create-checkout-session/route.ts`

## Production Deployment

Before deploying to production:

1. Switch to Stripe live keys in your production environment
2. Update success and cancel URLs in the checkout session creation
3. Test the payment flow thoroughly
4. Set up webhooks if needed for additional payment verification

## License

This project is open source and available for use.
# StripeExample
