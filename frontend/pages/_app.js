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
        {/* Fonts moved to _document.js */}
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default MyApp;
