import { FiHeart, FiGithub, FiTwitter, FiLinkedin, FiMail, FiLink } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How it Works', href: '#how-it-works' },
      { name: 'API Documentation', href: '#api' },
      { name: 'Pricing', href: '#pricing' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Status Page', href: '#status' },
      { name: 'Bug Reports', href: '#bugs' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: FiGithub, href: 'https://github.com/yourusername/url-shortener' },
    { name: 'Twitter', icon: FiTwitter, href: 'https://twitter.com/yourusername' },
    { name: 'LinkedIn', icon: FiLinkedin, href: 'https://linkedin.com/in/yourusername' },
    { name: 'Email', icon: FiMail, href: 'mailto:contact@shorturl.com' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FiLink className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">ShortURL</h3>
                  <p className="text-gray-400 text-sm">Fast & Reliable URL Shortener</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Transform your long URLs into short, shareable links with our lightning-fast URL shortener. 
                Built with modern technologies for maximum performance and reliability.
              </p>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                      title={social.name}
                    >
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Product Links */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support Links */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Links */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © {currentYear} ShortURL. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>🌍 Global CDN</span>
                <span>⚡ 99.9% Uptime</span>
                <span>🔒 SSL Secured</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by</span>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Your Name
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
