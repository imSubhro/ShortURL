import { useState } from 'react';
import { FiLink, FiMenu, FiX } from 'react-icons/fi';

const Header = ({ onHowItWorksClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', onClick: onHowItWorksClick },
  ];

  return (
    <header className="relative z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <FiLink className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">ShortURL</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={item.onClick || (() => {
                  if (item.href) {
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                })}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-1"
            >
              {isMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="py-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.href) {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
