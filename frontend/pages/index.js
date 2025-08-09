import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import UrlShortener from '../components/UrlShortener';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

export default function Home() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      <Head>
        <title>ShortURL - Fast & Reliable URL Shortener</title>
        <meta name="description" content="Transform your long URLs into short, shareable links instantly. Free, fast, and reliable URL shortener with click analytics." />
        <meta name="keywords" content="url shortener, short links, link shortener, free url shortener, shorten url, short url" />
        <link rel="canonical" href="https://your-domain.com" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header onHowItWorksClick={() => setShowHowItWorks(true)} />
        
        {/* Hero Section with URL Shortener */}
        <main className="relative">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
          </div>
          
          {/* Hero Content with URL Shortener */}
          <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Free • Fast • Reliable
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Shorten URLs
                  <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Instantly
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Transform your long URLs into short, shareable links with our lightning-fast URL shortener
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    No registration required
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Unlimited URLs
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Click analytics
                  </div>
                </div>
              </div>
              
              <UrlShortener />
            </div>
          </section>
          
          <Features />
        </main>
        
        <Footer />

        {/* How It Works Modal */}
        {showHowItWorks && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Close Button */}
              <button
                onClick={() => setShowHowItWorks(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Modal Content */}
              <div className="p-8">
                <HowItWorks />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
