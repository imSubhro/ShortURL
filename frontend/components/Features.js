import { FiZap, FiCopy, FiBarChart2, FiShield, FiSmartphone, FiGlobe } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Generate short URLs instantly with our optimized backend infrastructure and global CDN.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200'
    },
    {
      icon: FiCopy,
      title: 'One-Click Copy',
      description: 'Copy shortened links to your clipboard with a single click for seamless sharing across platforms.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      icon: FiBarChart2,
      title: 'Click Analytics',
      description: 'Track detailed analytics including click counts, geographic data, and referrer information.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    {
      icon: FiShield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with SSL encryption and 99.9% uptime guarantee for your links.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Optimized',
      description: 'Fully responsive design that works perfectly on all devices and screen sizes.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      borderColor: 'border-pink-200'
    },
    {
      icon: FiGlobe,
      title: 'Global Access',
      description: 'Access your shortened URLs from anywhere in the world with our distributed infrastructure.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      borderColor: 'border-indigo-200'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime', description: 'Guaranteed availability' },
    { value: '<50ms', label: 'Response Time', description: 'Lightning fast redirects' },
    { value: 'Unlimited', label: 'URLs', description: 'No limits on usage' },
    { value: '24/7', label: 'Support', description: 'Always here to help' }
  ];

  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Why Choose ShortURL?
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Powerful Features for
            <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Modern Teams
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create, manage, and track your shortened URLs with enterprise-grade reliability
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl border-2 ${feature.borderColor} bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.bgColor} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-7 h-7 ${feature.color}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h3>
            <p className="text-gray-600 text-lg">
              Join the community of users who rely on ShortURL for their link management needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/50 group-hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
