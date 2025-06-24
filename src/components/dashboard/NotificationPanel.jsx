// // NotificationPanel.jsx - Notification Panel Component
// import React, { useState } from 'react';
// import { 
//   Bell, 
//   AlertTriangle,
//   CheckCircle,
//   Info,
//   X,
//   Settings,
//   Filter,
//   MoreVertical,
//   Clock,
//   ArrowRight,
//   Star,
//   Package,
//   Users,
//   TrendingUp
// } from 'lucide-react';

// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       type: 'alert',
//       priority: 'high',
//       title: 'Low Stock Alert',
//       message: 'Gaming Mouse inventory is running low (3 units left)',
//       time: '5 min ago',
//       read: false,
//       actionable: true,
//       icon: AlertTriangle,
//       color: 'text-orange-600',
//       bgColor: 'bg-orange-50'
//     },
//     {
//       id: 2,
//       type: 'success',
//       priority: 'medium',
//       title: 'Payment Received',
//       message: 'Payment of $149.99 received for Order #ORD-001',
//       time: '15 min ago',
//       read: false,
//       actionable: false,
//       icon: CheckCircle,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50'
//     },
//     {
//       id: 3,
//       type: 'info',
//       priority: 'medium',
//       title: 'New Customer Review',
//       message: 'Sarah J. left a 5-star review for Wireless Headphones',
//       time: '1 hour ago',
//       read: true,
//       actionable: true,
//       icon: Star,
//       color: 'text-yellow-600',
//       bgColor: 'bg-yellow-50'
//     },
//     {
//       id: 4,
//       type: 'info',
//       priority: 'low',
//       title: 'Weekly Report Ready',
//       message: 'Your weekly performance report is now available',
//       time: '2 hours ago',
//       read: true,
//       actionable: true,
//       icon: TrendingUp,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       id: 5,
//       type: 'alert',
//       priority: 'medium',
//       title: 'Order Requires Attention',
//       message: 'Order #ORD-002 has been pending for 24 hours',
//       time: '3 hours ago',
//       read: false,
//       actionable: true,
//       icon: Package,
//       color: 'text-red-600',
//       bgColor: 'bg-red-50'
//     },
//     {
//       id: 6,
//       type: 'info',
//       priority: 'low',
//       title: 'New Customer Signup',
//       message: 'Mike Johnson created an account',
//       time: '4 hours ago',
//       read: true,
//       actionable: false,
//       icon: Users,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50'
//     }
//   ]);

//   const [filter, setFilter] = useState('all');

//   const filters = [
//     { value: 'all', label: 'All', count: notifications.length },
//     { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
//     { value: 'high', label: 'High Priority', count: notifications.filter(n => n.priority === 'high').length },
//     { value: 'actionable', label: 'Action Required', count: notifications.filter(n => n.actionable).length }
//   ];

//   const filteredNotifications = notifications.filter(notification => {
//     switch (filter) {
//       case 'unread':
//         return !notification.read;
//       case 'high':
//         return notification.priority === 'high';
//       case 'actionable':
//         return notification.actionable;
//       default:
//         return true;
//     }
//   });

//   const markAsRead = (id) => {
//     setNotifications(prev => 
//       prev.map(notification => 
//         notification.id === id ? { ...notification, read: true } : notification
//       )
//     );
//   };

//   const dismissNotification = (id) => {
//     setNotifications(prev => prev.filter(notification => notification.id !== id));
//   };

//   const markAllAsRead = () => {
//     setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high':
//         return 'bg-red-100 text-red-800';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'low':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <Bell className="h-6 w-6 text-gray-700 mr-2" />
//             <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
//             {unreadCount > 0 && (
//               <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                 {unreadCount}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
//               className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
//             >
//               <Filter className="h-4 w-4" />
//             </button>
//             <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
//               <Settings className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
//           {filters.map((filterOption) => (
//             <button
//               key={filterOption.value}
//               onClick={() => setFilter(filterOption.value)}
//               className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                 filter === filterOption.value
//                   ? 'bg-white text-blue-600 shadow-sm'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               {filterOption.label}
//               <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
//                 {filterOption.count}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Notifications List */}
//       <div className="max-h-96 overflow-y-auto">
//         {filteredNotifications.length === 0 ? (
//           <div className="p-6 text-center">
//             <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500">No notifications to show</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-100">
//             {filteredNotifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`p-4 hover:bg-gray-50 transition-colors ${
//                   !notification.read ? 'bg-blue-50' : ''
//                 }`}
//               >
//                 <div className="flex items-start space-x-3">
//                   {/* Icon */}
//                   <div className={`flex-shrink-0 p-2 rounded-lg ${notification.bgColor}`}>
//                     <notification.icon className={`h-4 w-4 ${notification.color}`} />
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2 mb-1">
//                           <h4 className={`text-sm font-medium ${
//                             !notification.read ? 'text-gray-900' : 'text-gray-700'
//                           }`}>
//                             {notification.title}
//                           </h4>
//                           <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)}`}>
//                             {notification.priority}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-600 mb-2">
//                           {notification.message}
//                         </p>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center text-xs text-gray-500">
//                             <Clock className="h-3 w-3 mr-1" />
//                             {notification.time}
//                           </div>
//                           {notification.actionable && (
//                             <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center">
//                               Take Action
//                               <ArrowRight className="h-3 w-3 ml-1" />
//                             </button>
//                           )}
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       <div className="flex items-center space-x-1 ml-2">
//                         {!notification.read && (
//                           <button
//                             onClick={() => markAsRead(notification.id)}
//                             className="p-1 text-gray-400 hover:text-blue-600"
//                             title="Mark as read"
//                           >
//                             <CheckCircle className="h-4 w-4" />
//                           </button>
//                         )}
//                         <button
//                           onClick={() => dismissNotification(notification.id)}
//                           className="p-1 text-gray-400 hover:text-red-600"
//                           title="Dismiss"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
//         <div className="flex items-center justify-between">
//           <button
//             onClick={markAllAsRead}
//             className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//             disabled={unreadCount === 0}
//           >
//             Mark all as read
//           </button>
//           <button className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center">
//             View all notifications
//             <ArrowRight className="h-4 w-4 ml-1" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;