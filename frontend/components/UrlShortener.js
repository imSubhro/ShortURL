import { useState } from 'react';
import { FiLink, FiCopy, FiCheck, FiExternalLink, FiTrendingUp, FiZap } from 'react-icons/fi';
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-10">
          {!shortUrl ? (
            <>
              {/* Input Section */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label htmlFor="longUrl" className="block text-sm font-semibold text-gray-700 mb-3">
                    Paste your long URL here
                  </label>
                  <div className="relative group">
                    <input
                      type="url"
                      id="longUrl"
                      value={longUrl}
                      onChange={(e) => setLongUrl(e.target.value)}
                      placeholder="https://example.com/very-long-url-that-needs-shortening"
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white/50 backdrop-blur-sm group-hover:border-gray-300"
                      disabled={loading}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <FiLink className="text-gray-400 w-6 h-6" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !longUrl.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 text-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      <span>Shortening...</span>
                    </>
                  ) : (
                    <>
                      <FiZap className="w-6 h-6" />
                      <span>Shorten URL</span>
                    </>
                  )}
                </button>
              </form>

              {/* Features Preview */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-blue-50/50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiZap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Instant</p>
                    <p className="text-sm text-gray-600">Lightning fast</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50/50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Analytics</p>
                    <p className="text-sm text-gray-600">Track clicks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-purple-50/50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiCopy className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Easy Share</p>
                    <p className="text-sm text-gray-600">One-click copy</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Result Section */
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FiCheck className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Your URL is ready! 🎉
                </h3>
                <p className="text-gray-600">
                  Share your shortened link anywhere
                </p>
              </div>

              {/* Short URL Display */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Your short URL:</span>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiTrendingUp className="w-4 h-4" />
                    <span>{urlData?.clicks || 0} clicks</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-1 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="font-mono text-lg text-gray-900 break-all">{shortUrl}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopy}
                      className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center group"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <FiCheck className="w-5 h-5" />
                      ) : (
                        <FiCopy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      )}
                    </button>
                    
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center group"
                      title="Open in new tab"
                    >
                      <FiExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Original URL */}
              <div className="text-left bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Original URL:</p>
                <p className="text-sm text-gray-600 break-all">{urlData?.longUrl}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Shorten Another URL
                </button>
                <button
                  onClick={handleCopy}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <FiCopy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
