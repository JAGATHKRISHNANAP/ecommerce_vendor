// Footer.jsx - Footer Component
import React from 'react';
import { 
  Store,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  HelpCircle,
  Shield,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Seller Resources': [
      { name: 'Getting Started', href: '#' },
      { name: 'Seller Guidelines', href: '#' },
      { name: 'Best Practices', href: '#' },
      { name: 'Fee Structure', href: '#' },
      { name: 'Payout Information', href: '#' }
    ],
    'Support': [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Support', href: '#' },
      { name: 'Live Chat', href: '#' },
      { name: 'Video Tutorials', href: '#' },
      { name: 'Community Forum', href: '#' }
    ],
    'Tools & Services': [
      { name: 'Analytics Dashboard', href: '#' },
      { name: 'Inventory Management', href: '#' },
      { name: 'Marketing Tools', href: '#' },
      { name: 'Shipping Calculator', href: '#' },
      { name: 'API Documentation', href: '#' }
    ],
    'Legal': [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Seller Agreement', href: '#' },
      { name: 'Intellectual Property', href: '#' },
      { name: 'Dispute Resolution', href: '#' }
    ]
  };

  const quickActions = [
    {
      title: 'Need Help?',
      description: 'Get instant support',
      icon: HelpCircle,
      action: 'Contact Support',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Join Community',
      description: 'Connect with other sellers',
      icon: MessageCircle,
      action: 'Join Forum',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Resources',
      description: 'Guides and tutorials',
      icon: FileText,
      action: 'View Resources',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Quick Actions Section */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-6 w-6 ${action.textColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {action.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {action.description}
                    </p>
                    <button className={`text-sm font-medium ${action.textColor} hover:underline`}>
                      {action.action} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Store className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">SellerHub</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering sellers to grow their business with powerful tools, 
              analytics, and support. Join thousands of successful sellers 
              who trust SellerHub for their e-commerce success.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">support@sellerhub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">1-800-SELLER-1</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">Available 24/7</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-gray-300 text-sm">Active Sellers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">$2.5B+</div>
              <div className="text-gray-300 text-sm">Sales Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">180+</div>
              <div className="text-gray-300 text-sm">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">99.9%</div>
              <div className="text-gray-300 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-300 text-sm">
                © {currentYear} SellerHub. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <a href="#" className="text-gray-300 hover:text-white flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Security
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Status
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Accessibility
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 md:mt-0">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Scroll to Top */}
              <button
                onClick={scrollToTop}
                className="ml-6 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;