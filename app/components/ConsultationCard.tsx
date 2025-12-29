'use client';

import { useState } from 'react';

interface ConsultationCardProps {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  features: string[];
}

export default function ConsultationCard({
  id,
  title,
  duration,
  price,
  description,
  features,
}: ConsultationCardProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      console.log('Creating checkout session...');
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: id,
          title,
          price,
          duration,
        }),
      });

      console.log('API Response status:', response.status);
      const data = await response.json();
      console.log('API Response data:', data);

      if (!response.ok) {
        const errorMessage = data.error || data.message || 'Failed to create checkout session';
        console.error('API Error:', errorMessage, data);
        alert(`Error: ${errorMessage}\n\nCheck the browser console for more details.`);
        setLoading(false);
        return;
      }

      if (!data.url) {
        console.error('No checkout URL in response:', data);
        alert('Error: No checkout URL received from server. Check the console for details.');
        setLoading(false);
        return;
      }

      const { url, sessionId } = data;
      console.log('Checkout URL received:', url);
      console.log('Session ID:', sessionId);

      // Redirect to Stripe Checkout using the URL directly
      // This is the new recommended approach after redirectToCheckout was deprecated
      if (url) {
        console.log('Redirecting to Stripe checkout...');
        window.location.href = url;
      } else {
        console.error('No URL available for redirect');
        alert('Error: Unable to redirect to checkout. Please try again.');
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      alert(`Unexpected error: ${error.message || 'An error occurred. Please check the console for details.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
            {duration}
          </span>
        </div>
        
        <div className="mb-6">
          <div className="flex items-baseline mb-2">
            <span className="text-4xl font-bold text-gray-900">${price}</span>
            <span className="text-gray-500 ml-2">per session</span>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Processing...' : 'Book Consultation'}
        </button>
      </div>
    </div>
  );
}

