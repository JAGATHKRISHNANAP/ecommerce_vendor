// // PerformanceMetrics.jsx - Performance Metrics Component
// import React, { useState } from 'react';
// import { 
//   TrendingUp, 
//   TrendingDown, 
//   Target,
//   Award,
//   Users,
//   ShoppingBag,
//   Star,
//   RefreshCw,
//   Info,
//   ArrowRight
// } from 'lucide-react';

// const PerformanceMetrics = () => {
//   const [selectedMetric, setSelectedMetric] = useState('sales');

//   const metrics = [
//     {
//       id: 'sales',
//       title: 'Sales Performance',
//       icon: TrendingUp,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50'
//     },
//     {
//       id: 'customer',
//       title: 'Customer Metrics',
//       icon: Users,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       id: 'quality',
//       title: 'Quality Score',
//       icon: Star,
//       color: 'text-yellow-600',
//       bgColor: 'bg-yellow-50'
//     }
//   ];

//   const salesData = {
//     score: 87,
//     trend: 'up',
//     change: '+12%',
//     metrics: [
//       { label: 'Revenue Growth', value: '15.3%', target: '12%', status: 'above' },
//       { label: 'Conversion Rate', value: '3.2%', target: '2.8%', status: 'above' },
//       { label: 'Avg Order Value', value: '$117', target: '$105', status: 'above' },
//       { label: 'Return Rate', value: '2.1%', target: '3%', status: 'below' }
//     ]
//   };

//   const customerData = {
//     score: 92,
//     trend: 'up',
//     change: '+8%',
//     metrics: [
//       { label: 'Customer Satisfaction', value: '4.8/5', target: '4.5/5', status: 'above' },
//       { label: 'Response Time', value: '2.3h', target: '4h', status: 'below' },
//       { label: 'Repeat Customers', value: '68%', target: '60%', status: 'above' },
//       { label: 'Customer Retention', value: '85%', target: '80%', status: 'above' }
//     ]
//   };

//   const qualityData = {
//     score: 94,
//     trend: 'up',
//     change: '+5%',
//     metrics: [
//       { label: 'Product Rating', value: '4.7/5', target: '4.0/5', status: 'above' },
//       { label: 'Review Score', value: '4.6/5', target: '4.0/5', status: 'above' },
//       { label: 'Defect Rate', value: '0.8%', target: '2%', status: 'below' },
//       { label: 'On-time Delivery', value: '96%', target: '90%', status: 'above' }
//     ]
//   };

//   const getCurrentData = () => {
//     switch (selectedMetric) {
//       case 'sales':
//         return salesData;
//       case 'customer':
//         return customerData;
//       case 'quality':
//         return qualityData;
//       default:
//         return salesData;
//     }
//   };

//   const currentData = getCurrentData();

//   const getScoreColor = (score) => {
//     if (score >= 90) return 'text-green-600';
//     if (score >= 70) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const getScoreBgColor = (score) => {
//     if (score >= 90) return 'from-green-500 to-green-600';
//     if (score >= 70) return 'from-yellow-500 to-yellow-600';
//     return 'from-red-500 to-red-600';
//   };

//   const achievements = [
//     {
//       title: 'Top Seller',
//       description: 'Best performer this month',
//       icon: Award,
//       color: 'text-yellow-600',
//       bgColor: 'bg-yellow-50'
//     },
//     {
//       title: 'Customer Favorite',
//       description: '95% positive reviews',
//       icon: Star,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50'
//     },
//     {
//       title: 'Fast Shipper',
//       description: '99% on-time delivery',
//       icon: Target,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50'
//     }
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-gray-900">Performance</h2>
//           <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Update
//           </button>
//         </div>

//         {/* Metric Selection */}
//         <div className="flex space-x-2">
//           {metrics.map((metric) => (
//             <button
//               key={metric.id}
//               onClick={() => setSelectedMetric(metric.id)}
//               className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 selectedMetric === metric.id
//                   ? `${metric.bgColor} ${metric.color}`
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               <metric.icon className="h-4 w-4 mr-2" />
//               {metric.title}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="p-6">
//         {/* Score Circle */}
//         <div className="flex items-center justify-center mb-6">
//           <div className="relative">
//             <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
//               <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${getScoreBgColor(currentData.score)} flex items-center justify-center`}>
//                 <div className="text-center">
//                   <div className={`text-2xl font-bold text-white`}>
//                     {currentData.score}
//                   </div>
//                   <div className="text-xs text-white opacity-90">Score</div>
//                 </div>
//               </div>
//             </div>
//             <div className="absolute -top-2 -right-2">
//               {currentData.trend === 'up' ? (
//                 <div className="bg-green-500 rounded-full p-1">
//                   <TrendingUp className="h-4 w-4 text-white" />
//                 </div>
//               ) : (
//                 <div className="bg-red-500 rounded-full p-1">
//                   <TrendingDown className="h-4 w-4 text-white" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Change Indicator */}
//         <div className="text-center mb-6">
//           <span className={`text-sm font-medium ${
//             currentData.trend === 'up' ? 'text-green-600' : 'text-red-600'
//           }`}>
//             {currentData.change} from last period
//           </span>
//         </div>

//         {/* Detailed Metrics */}
//         <div className="space-y-4 mb-6">
//           {currentData.metrics.map((metric, index) => (
//             <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//               <div className="flex items-center">
//                 <div className="flex flex-col">
//                   <span className="text-sm font-medium text-gray-900">{metric.label}</span>
//                   <div className="flex items-center mt-1">
//                     <span className="text-xs text-gray-500 mr-2">Target: {metric.target}</span>
//                     {metric.status === 'above' ? (
//                       <TrendingUp className="h-3 w-3 text-green-500" />
//                     ) : (
//                       <TrendingDown className="h-3 w-3 text-green-500" />
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className={`font-semibold ${
//                   metric.status === 'above' ? 'text-green-600' : 'text-blue-600'
//                 }`}>
//                   {metric.value}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Achievements */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
//           <div className="space-y-3">
//             {achievements.map((achievement, index) => (
//               <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                 <div className={`flex-shrink-0 p-2 rounded-lg ${achievement.bgColor}`}>
//                   <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
//                 </div>
//                 <div className="ml-3 flex-1">
//                   <h4 className="text-sm font-medium text-gray-900">{achievement.title}</h4>
//                   <p className="text-xs text-gray-600">{achievement.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* View Details */}
//         <div className="mt-6 pt-4 border-t border-gray-200">
//           <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium transition-colors">
//             View Detailed Report
//             <ArrowRight className="h-4 w-4 ml-2" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PerformanceMetrics;