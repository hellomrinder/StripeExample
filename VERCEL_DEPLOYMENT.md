# Vercel Deployment Guide

This guide will help you deploy your MindCare psychologist landing page to Vercel with Stripe integration.

## Step 1: Prepare Your Project

1. Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Ensure your `.env` file is in `.gitignore` (it should be by default)

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Configure your project:
   - **Framework Preset:** Next.js (should be auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

## Step 3: Add Environment Variables

**⚠️ IMPORTANT:** You MUST add environment variables in Vercel before deploying, or the build will fail.

### In Vercel Dashboard:

1. Go to your project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

#### For Production:
- **Name:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Value:** Your Stripe publishable key (starts with `pk_live_` for production or `pk_test_` for testing)
- **Environment:** Select **Production**, **Preview**, and **Development**

- **Name:** `STRIPE_SECRET_KEY`
- **Value:** Your Stripe secret key (starts with `sk_live_` for production or `sk_test_` for testing)
- **Environment:** Select **Production**, **Preview**, and **Development**

#### Optional (Recommended):
- **Name:** `NEXT_PUBLIC_APP_URL`
- **Value:** Your production URL (e.g., `https://your-domain.vercel.app`)
- **Environment:** Select **Production**

### Important Notes:

- ✅ **Select all environments** (Production, Preview, Development) when adding variables
- ✅ Use **live keys** (`pk_live_` and `sk_live_`) for production
- ✅ Use **test keys** (`pk_test_` and `sk_test_`) for preview/development
- ❌ **Never** commit your `.env` file to Git
- ❌ **Never** expose your secret key in client-side code

## Step 4: Redeploy After Adding Environment Variables

**CRITICAL:** After adding environment variables:

1. Go to your project's **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Select **Redeploy**
4. Make sure **Use existing Build Cache** is **unchecked**
5. Click **Redeploy**

**Why?** Environment variables are only available during the build process. If you add them after deployment, you need to redeploy for them to take effect.

## Step 5: Verify Deployment

1. Visit your deployed site: `https://your-project.vercel.app`
2. Test the Stripe integration:
   - Click "Book Consultation" on any card
   - You should be redirected to Stripe Checkout
   - Use test card: `4242 4242 4242 4242`

3. Check environment variables:
   - Visit: `https://your-project.vercel.app/api/test-keys`
   - This will show if your keys are loaded correctly

## Troubleshooting

### Error: "Stripe secret key is not configured"

**Solution:**
1. Verify environment variables are set in Vercel:
   - Go to **Settings** → **Environment Variables**
   - Make sure both `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` are present
   - Check that they're enabled for the correct environment (Production/Preview)

2. **Redeploy** your application after adding variables

3. Check Vercel logs:
   - Go to **Deployments** → Click on a deployment → **Functions** tab
   - Look for any errors related to Stripe

### Error: "Invalid API Key"

**Solution:**
1. Make sure you're using the correct keys:
   - **Production:** Use `pk_live_` and `sk_live_` keys
   - **Preview/Development:** Use `pk_test_` and `sk_test_` keys

2. Verify keys in Stripe Dashboard:
   - Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
   - Make sure you copied the full key (they're very long)
   - Check that you're in the correct mode (Test vs Live)

### Build Fails

**Solution:**
1. Check build logs in Vercel:
   - Go to **Deployments** → Click on failed deployment
   - Review the build logs for errors

2. Common issues:
   - Missing environment variables (add them and redeploy)
   - TypeScript errors (fix in local development first)
   - Missing dependencies (check `package.json`)

### Environment Variables Not Working

**Solution:**
1. **Redeploy** after adding environment variables
2. Make sure variables are set for the correct environment:
   - Production deployments use "Production" environment variables
   - Preview deployments use "Preview" environment variables
3. Check variable names are exact (case-sensitive):
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (not `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_`)
   - `STRIPE_SECRET_KEY` (not `STRIPE_SECRET_KEY_`)

## Best Practices

1. **Use different keys for different environments:**
   - Production: Live keys
   - Preview: Test keys
   - Development: Test keys

2. **Never commit secrets:**
   - Keep `.env` in `.gitignore`
   - Use Vercel's environment variables for all secrets

3. **Monitor your Stripe Dashboard:**
   - Check for failed payments
   - Monitor API usage
   - Set up webhooks if needed

4. **Test before going live:**
   - Test with Stripe test cards first
   - Verify checkout flow works
   - Test success and cancel pages

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Next.js Deployment on Vercel](https://nextjs.org/docs/deployment)

