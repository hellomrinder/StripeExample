# Troubleshooting Stripe Integration

## Common Issues and Solutions

### Issue: "Stripe is not configured" or Keys not loading

**Solution 1: Restart the Development Server**
- Stop your development server (press `Ctrl+C` in the terminal)
- Start it again with `npm run dev`
- Environment variables are only loaded when the server starts

**Solution 2: Verify .env File Location**
- Make sure `.env` is in the **root directory** of your project (same level as `package.json`)
- The file should be named exactly `.env` (not `.env.local` or `.env.txt`)

**Solution 3: Check .env File Format**
Your `.env` file should look like this (no quotes, no spaces around `=`):

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
STRIPE_SECRET_KEY=sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**Common mistakes:**
- ❌ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "pk_test_..."` (spaces around =)
- ❌ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."` (quotes)
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...` (correct)

**Solution 4: Test Your Keys**
1. Visit `http://localhost:3000/api/test-keys` in your browser
2. This will show you if the keys are being loaded correctly
3. Check the browser console for any errors

**Solution 5: Clear Next.js Cache**
If keys still don't load after restarting:
```bash
# Delete .next folder
rm -rf .next
# Or on Windows:
rmdir /s .next

# Restart server
npm run dev
```

### Issue: "Invalid API Key" Error

1. **Verify your keys are correct:**
   - Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
   - Make sure you're copying the full key (they're very long)
   - Publishable keys start with `pk_test_` or `pk_live_`
   - Secret keys start with `sk_test_` or `sk_live_`

2. **Check for extra characters:**
   - Make sure there are no spaces or line breaks in the keys
   - Copy the key directly from Stripe dashboard

3. **Test vs Live keys:**
   - For development, use **test keys** (start with `pk_test_` and `sk_test_`)
   - For production, use **live keys** (start with `pk_live_` and `sk_live_`)

### Issue: Payment Redirect Not Working

1. **Check browser console** for JavaScript errors
2. **Verify publishable key** is loaded in the client:
   - Open browser DevTools (F12)
   - Go to Console tab
   - Check for any Stripe-related errors

3. **Check network tab:**
   - Open DevTools → Network tab
   - Click "Book Consultation"
   - Look for the `/api/create-checkout-session` request
   - Check if it returns an error

### Issue: Server-Side Errors

1. **Check server terminal** for error messages
2. **Verify secret key** is set correctly:
   - The secret key should only be used in API routes (server-side)
   - Never expose it in client-side code

3. **Check Stripe API version:**
   - The code uses Stripe API version `2024-11-20.acacia`
   - If you get API version errors, update the version in `app/api/create-checkout-session/route.ts`

## Quick Diagnostic Steps

1. ✅ **Restart server** after adding/changing .env
2. ✅ **Verify .env file** is in root directory
3. ✅ **Check .env format** (no quotes, no spaces)
4. ✅ **Test keys endpoint**: `http://localhost:3000/api/test-keys`
5. ✅ **Check browser console** for errors
6. ✅ **Check server terminal** for errors

## Still Having Issues?

1. Check the exact error message in:
   - Browser console (F12 → Console)
   - Server terminal
   - Network tab (F12 → Network)

2. Verify your Stripe account is active:
   - Log in to [Stripe Dashboard](https://dashboard.stripe.com)
   - Make sure your account is not restricted

3. Test with Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

