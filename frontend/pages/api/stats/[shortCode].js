// API route for getting URL statistics
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { shortCode } = req.query;

  try {
    // Get the backend API URL from environment variables
    const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/stats/${shortCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    // Return the response from the backend
    res.status(response.status).json(data);

  } catch (error) {
    console.error('Stats API Proxy Error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to connect to backend service'
    });
  }
}
