// QuickActions.jsx - Quick Actions Component
import React from 'react';
import { 
  Plus, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Settings,
  FileText,
  MessageSquare,
  Download,
  Upload,
  CreditCard,
  Truck,
  BarChart3,
  Gift,
  Tag,
  Calendar
} from 'lucide-react';

const QuickActions = () => {
  const primaryActions = [
    {
      title: 'Add New Product',
      description: 'List a new product in your store',
      icon: Plus,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      title: 'Manage Inventory',
      description: 'Update stock and product details',
      icon: Package,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      title: 'Process Orders',
      description: 'View and fulfill pending orders',
      icon: ShoppingCart,
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    },
    {
      title: 'View Analytics',
      description: 'Check detailed performance reports',
      icon: TrendingUp,
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white'
    }
  ];

  const secondaryActions = [
    {
      title: 'Customer Messages',
      description: 'Respond to customer inquiries',
      icon: MessageSquare,
      badge: '5 new'
    },
    {
      title: 'Export Reports',
      description: 'Download sales and inventory reports',
      icon: Download,
      badge: null
    },
    {
      title: 'Bulk Upload',
      description: 'Upload multiple products via CSV',
      icon: Upload,
      badge: null
    },
    {
      title: 'Payment Settings',
      description: 'Manage payment methods',
      icon: CreditCard,
      badge: null
    },
    {
      title: 'Shipping Options',
      description: 'Configure delivery settings',
      icon: Truck,
      badge: null
    },
    {
      title: 'Promotions',
      description: 'Create discounts and offers',
      icon: Gift,
      badge: null
    }
  ];

  const quickLinks = [
    { title: 'Product Categories', icon: Tag },
    { title: 'Customer Reviews', icon: MessageSquare },
    { title: 'Sales Calendar', icon: Calendar },
    { title: 'Store Settings', icon: Settings },
    { title: 'Performance Reports', icon: BarChart3 },
    { title: 'Customer Database', icon: Users }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-600">Frequently used tools and shortcuts</p>
      </div>

      <div className="p-6">
        {/* Primary Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {primaryActions.map((action, index) => (
            <button
              key={index}
              className={`${action.color} ${action.textColor} p-6 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg group`}
            >
              <div className="flex flex-col items-center text-center">
                <action.icon className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Secondary Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Management Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryActions.map((action, index) => (
              <button
                key={index}
                className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300 group"
              >
                <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                  <action.icon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                </div>
                <div className="ml-4 flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    {action.badge && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 hover:border-blue-200 group"
              >
                <link.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 text-center">
                  {link.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Get started with our comprehensive guides and tutorials
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Tutorial
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-12 w-12 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;