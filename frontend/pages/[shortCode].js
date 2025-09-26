export async function getServerSideProps(context) {
  const { shortCode } = context.params;

  // Skip favicon and other static files
  if (shortCode === 'favicon.ico' || shortCode.includes('.')) {
    return { notFound: true };
  }
  console.log('🔍 Redirect request for shortCode:', shortCode);

  try {
    // Get the backend API URL from environment variables
    const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Fetch URL data from backend API (not the redirect endpoint)
    const response = await fetch(`${backendUrl}/api/stats/${shortCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('❌ Short code not found:', shortCode);
      return {
        notFound: true,
      };
    }

    const data = await response.json();
    
    if (data.success && data.data.longUrl) {
      console.log('✅ Found URL:', data.data.longUrl);
      console.log('🔄 Redirecting to:', data.data.longUrl);

      // Increment click count by calling the redirect endpoint
      fetch(`${backendUrl}/${shortCode}`, { method: 'GET' }).catch(console.error);

      return {
        redirect: {
          destination: data.data.longUrl,
          permanent: false,
        },
      };
    }

    return {
      notFound: true,
    };
  } catch (error) {
    console.error('❌ Redirect error:', error);
    return {
      notFound: true,
    };
  }
}


export default function RedirectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
