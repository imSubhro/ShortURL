import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ShortURL - URL Shortener Service</title>
        <meta name="description" content="Transform your long URLs into short, shareable links with our fast and reliable URL shortener service." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/" />
        <meta property="og:title" content="ShortURL - URL Shortener Service" />
        <meta property="og:description" content="Transform your long URLs into short, shareable links with our fast and reliable URL shortener service." />
        <meta property="og:image" content="https://your-domain.com/og-image.jpg" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://your-domain.com/" />
        <meta property="twitter:title" content="ShortURL - URL Shortener Service" />
        <meta property="twitter:description" content="Transform your long URLs into short, shareable links with our fast and reliable URL shortener service." />
        <meta property="twitter:image" content="https://your-domain.com/og-image.jpg" />
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px 16px',
          },
          success: {
            duration: 3000,
            style: {
              background: 'rgba(34, 197, 94, 0.9)',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: 'rgba(34, 197, 94, 0.9)',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: 'rgba(239, 68, 68, 0.9)',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: 'rgba(239, 68, 68, 0.9)',
            },
          },
        }}
      />
    </>
  );
}

export default MyApp;
