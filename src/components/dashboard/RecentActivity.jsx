// // RecentActivity.jsx - Recent Activity Component
// import React, { useState } from 'react';
// import { 
//   ShoppingCart, 
//   Package, 
//   Users, 
//   MessageSquare, 
//   Star,
//   TrendingUp,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   Filter,
//   ExternalLink,
//   DollarSign,
//   Eye
// } from 'lucide-react';

// const RecentActivity = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [showFilters, setShowFilters] = useState(false);

//   const tabs = [
//     { id: 'all', label: 'All Activity', count: 24 },
//     { id: 'orders', label: 'Orders', count: 12 },
//     { id: 'products', label: 'Products', count: 5 },
//     { id: 'customers', label: 'Customers', count: 7 }
//   ];

//   const activities = [
//     {
//       id: 1,
//       type: 'order',
//       title: 'New order received',
//       description: 'Order #ORD-2024-001 from John Smith',
//       amount: '$149.99',
//       status: 'pending',
//       time: '2 minutes ago',
//       icon: ShoppingCart,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50',
//       actionable: true
//     },
//     {
//       id: 2,
//       type: 'review',
//       title: 'New 5-star review',
//       description: 'Customer loved the "Wireless Headphones"',
//       rating: 5,
//       status: 'positive',
//       time: '15 minutes ago',
//       icon: Star,
//       color: 'text-yellow-600',
//       bgColor: 'bg-yellow-50',
//       actionable: false
//     },
//     {
//       id: 3,
//       type: 'inventory',
//       title: 'Low stock alert',
//       description: 'Gaming Mouse - Only 3 units left',
//       status: 'warning',
//       time: '1 hour ago',
//       icon: AlertCircle,
//       color: 'text-orange-600',
//       bgColor: 'bg-orange-50',
//       actionable: true
//     },
//     {
//       id: 4,
//       type: 'order',
//       title: 'Order shipped',
//       description: 'Order #ORD-2024-002 shipped via FedEx',
//       trackingNumber: 'FX123456789',
//       status: 'shipped',
//       time: '2 hours ago',
//       icon: Package,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50',
//       actionable: false
//     },
//     {
//       id: 5,
//       type: 'customer',
//       title: 'New customer registered',
//       description: 'Sarah Johnson joined your store',
//       status: 'info',
//       time: '3 hours ago',
//       icon: Users,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50',
//       actionable: false
//     },
//     {
//       id: 6,
//       type: 'message',
//       title: 'Customer inquiry',
//       description: 'Question about return policy',
//       status: 'pending',
//       time: '4 hours ago',
//       icon: MessageSquare,
//       color: 'text-indigo-600',
//       bgColor: 'bg-indigo-50',
//       actionable: true
//     },
//     {
//       id: 7,
//       type: 'product',
//       title: 'Product updated',
//       description: 'Price updated for "Smart Watch Pro"',
//       status: 'completed',
//       time: '5 hours ago',
//       icon: Package,
//       color: 'text-gray-600',
//       bgColor: 'bg-gray-50',
//       actionable: false
//     },
//     {
//       id: 8,
//       type: 'order',
//       title: 'Order completed',
//       description: 'Order #ORD-2024-003 delivered successfully',
//       amount: '$89.99',
//       status: 'completed',
//       time: '6 hours ago',
//       icon: CheckCircle,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50',
//       actionable: false
//     }
//   ];

//   const filteredActivities = activeTab === 'all' 
//     ? activities 
//     : activities.filter(activity => {
//         switch (activeTab) {
//           case 'orders':
//             return activity.type === 'order';
//           case 'products':
//             return activity.type === 'product' || activity.type === 'inventory';
//           case 'customers':
//             return activity.type === 'customer' || activity.type === 'message' || activity.type === 'review';
//           default:
//             return true;
//         }
//       });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'shipped':
//         return 'bg-blue-100 text-blue-800';
//       case 'warning':
//         return 'bg-orange-100 text-orange-800';
//       case 'positive':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Activity</h2>
//             <p className="text-gray-600">Stay updated with your store's latest activities</p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
//             >
//               <Filter className="h-4 w-4 mr-2" />
//               Filter
//             </button>
//             <button className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50">
//               <Eye className="h-4 w-4 mr-2" />
//               View All
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 activeTab === tab.id
//                   ? 'bg-white text-blue-600 shadow-sm'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               {tab.label}
//               <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
//                 {tab.count}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Activity List */}
//       <div className="p-6">
//         <div className="space-y-4">
//           {filteredActivities.map((activity) => (
//             <div
//               key={activity.id}
//               className="flex items-start space-x-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
//             >
//               {/* Icon */}
//               <div className={`flex-shrink-0 p-2 rounded-lg ${activity.bgColor}`}>
//                 <activity.icon className={`h-5 w-5 ${activity.color}`} />
//               </div>

//               {/* Content */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h4 className="text-sm font-semibold text-gray-900 mb-1">
//                       {activity.title}
//                     </h4>
//                     <p className="text-sm text-gray-600 mb-2">
//                       {activity.description}
//                     </p>
                    
//                     {/* Additional Info */}
//                     <div className="flex items-center space-x-4 text-xs text-gray-500">
//                       <div className="flex items-center">
//                         <Clock className="h-3 w-3 mr-1" />
//                         {activity.time}
//                       </div>
//                       {activity.amount && (
//                         <div className="flex items-center text-green-600">
//                           <DollarSign className="h-3 w-3 mr-1" />
//                           {activity.amount}
//                         </div>
//                       )}
//                       {activity.rating && (
//                         <div className="flex items-center text-yellow-600">
//                           <Star className="h-3 w-3 mr-1 fill-current" />
//                           {activity.rating}/5
//                         </div>
//                       )}
//                       {activity.trackingNumber && (
//                         <div className="text-blue-600">
//                           Tracking: {activity.trackingNumber}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Status and Actions */}
//                   <div className="flex items-center space-x-2 ml-4">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
//                       {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
//                     </span>
//                     {activity.actionable && (
//                       <button className="text-blue-600 hover:text-blue-700 p-1">
//                         <ExternalLink className="h-4 w-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Load More */}
//         <div className="mt-6 text-center">
//           <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
//             Load More Activities
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentActivity;