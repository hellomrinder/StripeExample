'use client';

export default function DebugPage() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const secretKey = 'Hidden for security'; // Never expose secret key in client

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Environment Variables Debug</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold mb-2">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{' '}
                {publishableKey ? (
                  <span className="text-green-600">✓ Loaded</span>
                ) : (
                  <span className="text-red-600">✗ Not found</span>
                )}
              </p>
              {publishableKey && (
                <>
                  <p className="text-sm text-gray-600">
                    <strong>Length:</strong> {publishableKey.length} characters
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Starts with:</strong> {publishableKey.substring(0, 12)}...
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Valid format:</strong>{' '}
                    {publishableKey.startsWith('pk_') ? (
                      <span className="text-green-600">✓ Yes (pk_test_ or pk_live_)</span>
                    ) : (
                      <span className="text-red-600">✗ No (should start with pk_)</span>
                    )}
                  </p>
                  <details className="mt-2">
                    <summary className="text-sm text-blue-600 cursor-pointer">Show full key (first 50 chars)</summary>
                    <p className="text-xs font-mono bg-gray-100 p-2 mt-2 rounded break-all">
                      {publishableKey.substring(0, 50)}...
                    </p>
                  </details>
                </>
              )}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold mb-2">STRIPE_SECRET_KEY</h2>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {secretKey} (server-side only)
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Secret keys are never exposed to the client. Check server logs or use /api/test-keys endpoint.
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold mb-2">Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>If keys show as "Not found", make sure .env file is in the root directory</li>
              <li>Restart your development server after adding/changing .env file</li>
              <li>Clear .next cache: <code className="bg-gray-200 px-1 rounded">rm -rf .next</code></li>
              <li>Check server-side keys at: <a href="/api/test-keys" className="text-blue-600 underline">/api/test-keys</a></li>
            </ol>
          </div>

          <div className="mt-4">
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

