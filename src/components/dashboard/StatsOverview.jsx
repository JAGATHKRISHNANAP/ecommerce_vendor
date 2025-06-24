// // StatsOverview.jsx - Stats Overview Component
// import React, { useState } from 'react';
// import { 
//   TrendingUp, 
//   TrendingDown,
//   Users, 
//   Package, 
//   ShoppingCart, 
//   DollarSign,
//   Eye,
//   RefreshCw,
//   Calendar,
//   BarChart3
// } from 'lucide-react';

// const StatsOverview = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState('7d');

//   const periods = [
//     { value: '24h', label: '24 Hours' },
//     { value: '7d', label: '7 Days' },
//     { value: '30d', label: '30 Days' },
//     { value: '90d', label: '90 Days' }
//   ];

//   const mainStats = [
//     {
//       title: 'Total Revenue',
//       value: '$18,249',
//       change: '+12.5%',
//       trend: 'up',
//       icon: DollarSign,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50',
//       description: 'vs last period'
//     },
//     {
//       title: 'Total Orders',
//       value: '156',
//       change: '+8.2%',
//       trend: 'up',
//       icon: ShoppingCart,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50',
//       description: 'vs last period'
//     },
//     {
//       title: 'Active Products',
//       value: '89',
//       change: '+3.1%',
//       trend: 'up',
//       icon: Package,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50',
//       description: 'vs last period'
//     },
//     {
//       title: 'Store Visitors',
//       value: '2,847',
//       change: '-2.4%',
//       trend: 'down',
//       icon: Users,
//       color: 'text-orange-600',
//       bgColor: 'bg-orange-50',
//       description: 'vs last period'
//     }
//   ];

//   const additionalMetrics = [
//     {
//       label: 'Conversion Rate',
//       value: '3.2%',
//       change: '+0.8%',
//       trend: 'up'
//     },
//     {
//       label: 'Average Order Value',
//       value: '$117',
//       change: '+$12',
//       trend: 'up'
//     },
//     {
//       label: 'Return Rate',
//       value: '2.1%',
//       change: '-0.3%',
//       trend: 'down'
//     },
//     {
//       label: 'Customer Satisfaction',
//       value: '4.8/5',
//       change: '+0.2',
//       trend: 'up'
//     }
//   ];

//   const chartData = [
//     { day: 'Mon', orders: 23, revenue: 2840 },
//     { day: 'Tue', orders: 31, revenue: 3920 },
//     { day: 'Wed', orders: 18, revenue: 2180 },
//     { day: 'Thu', orders: 27, revenue: 3350 },
//     { day: 'Fri', orders: 35, revenue: 4280 },
//     { day: 'Sat', orders: 42, revenue: 5120 },
//     { day: 'Sun', orders: 28, revenue: 3460 }
//   ];

//   const maxRevenue = Math.max(...chartData.map(d => d.revenue));

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance Overview</h2>
//             <p className="text-gray-600">Track your store's key metrics and performance</p>
//           </div>
//           <div className="mt-4 sm:mt-0 flex items-center space-x-3">
//             <select
//               value={selectedPeriod}
//               onChange={(e) => setSelectedPeriod(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               {periods.map((period) => (
//                 <option key={period.value} value={period.value}>
//                   {period.label}
//                 </option>
//               ))}
//             </select>
//             <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <RefreshCw className="h-4 w-4 mr-2" />
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Stats Grid */}
//       <div className="p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {mainStats.map((stat, index) => (
//             <div key={index} className="relative">
//               <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className={`p-2 rounded-lg ${stat.bgColor}`}>
//                     <stat.icon className={`h-5 w-5 ${stat.color}`} />
//                   </div>
//                   {stat.trend === 'up' ? (
//                     <TrendingUp className="h-4 w-4 text-green-500" />
//                   ) : (
//                     <TrendingDown className="h-4 w-4 text-red-500" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
//                   <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
//                   <div className="flex items-center">
//                     <span className={`text-sm font-medium ${
//                       stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                     }`}>
//                       {stat.change}
//                     </span>
//                     <span className="text-xs text-gray-500 ml-1">{stat.description}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Chart Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
//             <div className="flex items-center space-x-4 text-sm">
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//                 <span className="text-gray-600">Revenue</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//                 <span className="text-gray-600">Orders</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Simple Chart */}
//           <div className="bg-gray-50 rounded-lg p-4">
//             <div className="flex items-end justify-between h-32 space-x-2">
//               {chartData.map((data, index) => (
//                 <div key={index} className="flex flex-col items-center flex-1">
//                   <div className="flex flex-col items-center mb-2 space-y-1">
//                     <div
//                       className="w-full bg-blue-500 rounded-t"
//                       style={{ height: `${(data.revenue / maxRevenue) * 80}px` }}
//                     ></div>
//                     <div
//                       className="w-full bg-green-500 rounded-t"
//                       style={{ height: `${(data.orders / 50) * 40}px` }}
//                     ></div>
//                   </div>
//                   <span className="text-xs text-gray-600">{data.day}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Additional Metrics */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Metrics</h3>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             {additionalMetrics.map((metric, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm text-gray-600">{metric.label}</span>
//                   {metric.trend === 'up' ? (
//                     <TrendingUp className="h-4 w-4 text-green-500" />
//                   ) : (
//                     <TrendingDown className="h-4 w-4 text-red-500" />
//                   )}
//                 </div>
//                 <p className="text-lg font-semibold text-gray-900 mb-1">{metric.value}</p>
//                 <span className={`text-sm ${
//                   metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {metric.change}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatsOverview;