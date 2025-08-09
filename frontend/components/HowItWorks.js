import { FiLink, FiZap, FiShare2, FiArrowRight } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      icon: FiLink,
      title: 'Paste Your URL',
      description: 'Simply paste your long URL into our secure input field. We support all types of URLs and validate them instantly.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-600'
    },
    {
      icon: FiZap,
      title: 'Get Short Link',
      description: 'Our advanced algorithm generates a unique, secure short URL in milliseconds with built-in analytics tracking.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-600'
    },
    {
      icon: FiShare2,
      title: 'Share Anywhere',
      description: 'Copy your short URL with one click and share it across any platform, email, or social media channel.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-600'
    }
  ];

  return (
    <div className="py-12">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
          Simple Process
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          How It
          <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Works
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Transform your long URLs into short, shareable links in just three simple steps
        </p>
      </div>

      {/* Steps */}
      <div className="relative max-w-5xl mx-auto">
        {/* Connection Line for Desktop */}
        <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 rounded-full z-0"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-sm font-bold text-gray-700">{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${step.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <IconComponent className={`w-7 h-7 ${step.color}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 -right-6 z-20">
                    <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100">
                      <FiArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Arrow for Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 rotate-90">
                      <FiArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Use Short URLs?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Social Media:</strong> Perfect for Twitter, Instagram, and platforms with character limits
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Email Marketing:</strong> Clean, professional links that don't break in email clients
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Print Materials:</strong> Easy to type and remember for offline marketing
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Analytics:</strong> Track clicks and engagement on your shared links
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">User Experience:</strong> Cleaner, more professional appearance
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Mobile Friendly:</strong> Easier to share and click on mobile devices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
