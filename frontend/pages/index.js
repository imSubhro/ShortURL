import { useState } from 'react';
import Head from 'next/head';
import UrlShortener from '../components/UrlShortener';

export default function Home() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME || 'ShortURL'} - Fast & Reliable URL Shortener</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Transform your long URLs into short, shareable links instantly. Free, fast, and reliable URL shortener with click analytics."} />
        <meta name="keywords" content="url shortener, short links, link shortener, free url shortener, shorten url, short url" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"} />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-tr from-indigo-500/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
        </div>
        
        {/* Main Content */}
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Free • Fast • Reliable
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Shorten URLs
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl sm:max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
              Transform your long URLs into short, shareable links with our lightning-fast URL shortener
            </p>
            
            {/* Quick Features */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No registration
              </div>
              <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited URLs
              </div>
              <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Click analytics
              </div>
            </div>
          </div>
          
          {/* URL Shortener Component */}
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl flex-grow flex items-center justify-center">
            <UrlShortener />
          </div>
          
          {/* Footer */}
          <div className="mt-6 sm:mt-8 flex-shrink-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center">
              Made with ❤️ by ImSubhro
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
