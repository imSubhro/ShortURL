import { useState } from 'react';
import { FiLink, FiCopy, FiCheck, FiExternalLink, FiTrendingUp, FiZap, FiArrowLeft } from 'react-icons/fi';
import { shortenUrl, isValidUrl, copyToClipboard } from '../utils/api';
import toast from 'react-hot-toast';

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlData, setUrlData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!longUrl.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    if (!isValidUrl(longUrl)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setLoading(true);
    
    try {
      const response = await shortenUrl(longUrl);
      
      if (response.success) {
        setShortUrl(response.data.shortUrl);
        setUrlData(response.data);
        toast.success('URL shortened successfully!');
      } else {
        toast.error(response.error || 'Failed to shorten URL');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    
    const success = await copyToClipboard(shortUrl);
    
    if (success) {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy URL');
    }
  };

  const handleReset = () => {
    setLongUrl('');
    setShortUrl('');
    setUrlData(null);
    setCopied(false);
  };

  return (
    <div className="w-full">
      <div className="relative max-w-full">
        {/* Main Card - Fixed height to prevent layout shift */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6 transition-all duration-500 min-h-[280px] sm:min-h-[320px] flex flex-col justify-center">
          {!shortUrl ? (
            <>
              {/* Input Section */}
              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-center">
                <div className="relative">
                  <div className="relative group">
                    <input
                      type="url"
                      id="longUrl"
                      value={longUrl}
                      onChange={(e) => setLongUrl(e.target.value)}
                      placeholder="https://example.com/very-long-url..."
                      className="w-full px-3 py-3 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-gray-300 border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none bg-white/10 backdrop-blur-sm pr-10 sm:pr-12"
                      disabled={loading}
                      style={{ fontSize: '16px' }} // Prevent zoom on iOS
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FiLink className="text-gray-300 w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !longUrl.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base min-h-[48px]"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                      <span>Shortening...</span>
                    </>
                  ) : (
                    <>
                      <FiZap className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Shorten URL</span>
                    </>
                  )}
                </button>
              </form>

              {/* Features Preview */}
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="flex flex-col items-center space-y-1.5 p-2.5 sm:p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                  <FiZap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <p className="text-xs font-medium text-white">Instant</p>
                </div>
                <div className="flex flex-col items-center space-y-1.5 p-2.5 sm:p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                  <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <p className="text-xs font-medium text-white">Analytics</p>
                </div>
                <div className="flex flex-col items-center space-y-1.5 p-2.5 sm:p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                  <FiCopy className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <p className="text-xs font-medium text-white">Easy Share</p>
                </div>
              </div>
            </>
          ) : (
            /* Result Section - Same height as input section */
            <div className="text-center space-y-4 flex-1 flex flex-col justify-center animate-fade-in">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-2 animate-bounce-in">
                <FiCheck className="w-6 h-6 text-green-400" />
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  URL Shortened! 🎉
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Ready to share
                </p>
              </div>

              {/* Short URL Display */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Short URL:</span>
                  <div className="flex items-center space-x-1 text-xs text-gray-300">
                    <FiTrendingUp className="w-3 h-3" />
                    <span>{urlData?.clicks || 0} clicks</span>
                  </div>
                </div>
                
                {/* URL Display - Responsive layout */}
                <div className="space-y-3">
                  {/* URL Text */}
                  <div className="p-3 bg-white/10 rounded-lg border border-white/10 overflow-hidden">
                    <p className="font-mono text-xs sm:text-sm text-white break-all select-all">
                      {shortUrl}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopy}
                      className="flex-1 p-2.5 sm:p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 min-h-[44px]"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">Copy</span>
                        </>
                      )}
                    </button>
                    
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 p-2.5 sm:p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 min-h-[44px]"
                      title="Open in new tab"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">Open</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Original URL - Collapsible on mobile */}
              <div className="text-left bg-white/5 rounded-lg p-3 overflow-hidden">
                <p className="text-xs font-medium text-gray-300 mb-1">Original:</p>
                <p className="text-xs text-gray-400 break-all line-clamp-2 sm:line-clamp-none">
                  {urlData?.longUrl}
                </p>
              </div>
              
              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Shorten Another URL</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
