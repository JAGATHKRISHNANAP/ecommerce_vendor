// // HeroSection.jsx - Hero Section Component
// import React from 'react';
// import { 
//   TrendingUp, 
//   Package, 
//   ShoppingCart, 
//   DollarSign,
//   ArrowRight,
//   Star,
//   Clock
// } from 'lucide-react';

// const HeroSection = () => {
//   const currentTime = new Date().toLocaleString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });

//   const quickStats = [
//     {
//       icon: ShoppingCart,
//       label: 'Today\'s Orders',
//       value: '24',
//       change: '+15%',
//       color: 'text-green-600',
//       bgColor: 'bg-green-50'
//     },
//     {
//       icon: DollarSign,
//       label: 'Today\'s Revenue',
//       value: '$2,847',
//       change: '+8%',
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       icon: Package,
//       label: 'Pending Orders',
//       value: '12',
//       change: '-3%',
//       color: 'text-orange-600',
//       bgColor: 'bg-orange-50'
//     },
//     {
//       icon: TrendingUp,
//       label: 'Conversion Rate',
//       value: '3.2%',
//       change: '+12%',
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50'
//     }
//   ];

//   const recentAlerts = [
//     {
//       type: 'success',
//       message: 'Product "Wireless Headphones" is trending',
//       time: '10 min ago'
//     },
//     {
//       type: 'warning',
//       message: 'Low stock alert for "Gaming Mouse"',
//       time: '25 min ago'
//     },
//     {
//       type: 'info',
//       message: 'New customer review received',
//       time: '1 hour ago'
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Welcome Section */}
//         <div className="text-white mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 Good morning, John! 👋
//               </h1>
//               <p className="text-blue-200 text-lg">
//                 Here's what's happening with your store today
//               </p>
//               <div className="flex items-center mt-2 text-blue-200">
//                 <Clock className="h-4 w-4 mr-2" />
//                 <span className="text-sm">{currentTime}</span>
//               </div>
//             </div>
//             <div className="mt-6 md:mt-0">
//               <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
//                 <Star className="h-5 w-5 text-yellow-400 mr-2" />
//                 <div>
//                   <p className="text-white font-semibold">4.8 Rating</p>
//                   <p className="text-blue-200 text-sm">From 1,247 reviews</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {quickStats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-3 rounded-lg ${stat.bgColor}`}>
//                   <stat.icon className={`h-6 w-6 ${stat.color}`} />
//                 </div>
//                 <span className={`text-sm font-medium ${
//                   stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {stat.change}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
//                 <p className="text-gray-600 text-sm">{stat.label}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Cards and Alerts */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Quick Actions */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <button className="flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
//                   <Package className="h-5 w-5 mr-2" />
//                   Add Product
//                 </button>
//                 <button className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
//                   <ShoppingCart className="h-5 w-5 mr-2" />
//                   View Orders
//                 </button>
//                 <button className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105">
//                   <TrendingUp className="h-5 w-5 mr-2" />
//                   Analytics
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Recent Alerts */}
//           <div className="bg-white rounded-xl p-6 shadow-lg">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Recent Alerts</h3>
//               <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
//                 View All
//                 <ArrowRight className="h-4 w-4 ml-1" />
//               </button>
//             </div>
//             <div className="space-y-3">
//               {recentAlerts.map((alert, index) => (
//                 <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
//                   <div className={`w-2 h-2 rounded-full mt-2 ${
//                     alert.type === 'success' ? 'bg-green-500' :
//                     alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
//                   }`} />
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-900">{alert.message}</p>
//                     <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



// import React from 'react';
// import { 
//   TrendingUp, 
//   Package, 
//   ShoppingCart, 
//   DollarSign,
//   ArrowRight,
//   Star,
//   Clock,
//   Bell,
//   Plus,
//   BarChart3
// } from 'lucide-react';

// const HeroSection = () => {
//   const currentTime = new Date().toLocaleString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });

//   const quickStats = [
//     {
//       icon: ShoppingCart,
//       label: 'Today\'s Orders',
//       value: '24',
//       change: '+15%',
//       color: '#10b981',
//       bgColor: '#ecfdf5'
//     },
//     {
//       icon: DollarSign,
//       label: 'Today\'s Revenue',
//       value: '$2,847',
//       change: '+8%',
//       color: '#3b82f6',
//       bgColor: '#eff6ff'
//     },
//     {
//       icon: Package,
//       label: 'Pending Orders',
//       value: '12',
//       change: '-3%',
//       color: '#f59e0b',
//       bgColor: '#fffbeb'
//     },
//     {
//       icon: TrendingUp,
//       label: 'Conversion Rate',
//       value: '3.2%',
//       change: '+12%',
//       color: '#8b5cf6',
//       bgColor: '#f3e8ff'
//     }
//   ];

//   const recentAlerts = [
//     {
//       type: 'success',
//       message: 'Product "Wireless Headphones" is trending',
//       time: '10 min ago',
//       icon: TrendingUp,
//       color: '#10b981'
//     },
//     {
//       type: 'warning',
//       message: 'Low stock alert for "Gaming Mouse"',
//       time: '25 min ago',
//       icon: Package,
//       color: '#f59e0b'
//     },
//     {
//       type: 'info',
//       message: 'New customer review received',
//       time: '1 hour ago',
//       icon: Star,
//       color: '#3b82f6'
//     }
//   ];

//   const quickActions = [
//     {
//       label: 'Add Product',
//       icon: Plus,
//       color: '#10b981',
//       action: () => console.log('Add Product clicked')
//     },
//     {
//       label: 'View Orders',
//       icon: ShoppingCart,
//       color: '#3b82f6',
//       action: () => console.log('View Orders clicked')
//     },
//     {
//       label: 'Analytics',
//       icon: BarChart3,
//       color: '#8b5cf6',
//       action: () => console.log('Analytics clicked')
//     }
//   ];

//   // Inline styles to ensure proper rendering
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
//       padding: '2rem 1rem'
//     },
//     mainWrapper: {
//       maxWidth: '1200px',
//       margin: '0 auto'
//     },
//     heroCard: {
//       background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
//       borderRadius: '1rem',
//       padding: '3rem 2rem',
//       marginBottom: '2rem',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//       color: 'white'
//     },
//     heroHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       flexWrap: 'wrap',
//       gap: '2rem'
//     },
//     heroTitle: {
//       fontSize: '2.5rem',
//       fontWeight: 'bold',
//       marginBottom: '0.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem'
//     },
//     heroSubtitle: {
//       fontSize: '1.25rem',
//       opacity: 0.9,
//       marginBottom: '1rem'
//     },
//     timeInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       opacity: 0.8,
//       fontSize: '0.875rem'
//     },
//     ratingCard: {
//       background: 'rgba(255, 255, 255, 0.1)',
//       backdropFilter: 'blur(10px)',
//       borderRadius: '0.75rem',
//       padding: '1.5rem',
//       border: '1px solid rgba(255, 255, 255, 0.2)',
//       minWidth: '150px'
//     },
//     statsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//       gap: '1.5rem',
//       marginBottom: '2rem'
//     },
//     statCard: {
//       background: 'white',
//       borderRadius: '0.75rem',
//       padding: '1.5rem',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       border: '1px solid rgba(0, 0, 0, 0.05)',
//       transition: 'all 0.2s ease',
//       cursor: 'pointer'
//     },
//     statCardHover: {
//       transform: 'translateY(-2px)',
//       boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
//     },
//     statHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '1rem'
//     },
//     statIcon: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '0.75rem',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     statValue: {
//       fontSize: '2rem',
//       fontWeight: 'bold',
//       color: '#111827',
//       marginBottom: '0.25rem'
//     },
//     statLabel: {
//       fontSize: '0.875rem',
//       color: '#6b7280',
//       fontWeight: '500'
//     },
//     contentGrid: {
//       display: 'grid',
//       gridTemplateColumns: '2fr 1fr',
//       gap: '2rem'
//     },
//     actionCard: {
//       background: 'white',
//       borderRadius: '0.75rem',
//       padding: '2rem',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       border: '1px solid rgba(0, 0, 0, 0.05)'
//     },
//     cardTitle: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//       color: '#111827',
//       marginBottom: '1.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem'
//     },
//     actionGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
//       gap: '1rem'
//     },
//     actionButton: {
//       padding: '1rem',
//       borderRadius: '0.75rem',
//       border: 'none',
//       color: 'white',
//       fontWeight: '600',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '0.5rem',
//       transition: 'all 0.2s ease',
//       fontSize: '0.875rem'
//     },
//     alertsContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1rem'
//     },
//     alertItem: {
//       display: 'flex',
//       alignItems: 'flex-start',
//       gap: '1rem',
//       padding: '1rem',
//       borderRadius: '0.5rem',
//       background: '#f9fafb',
//       border: '1px solid #e5e7eb',
//       transition: 'all 0.2s ease'
//     },
//     alertIcon: {
//       width: '32px',
//       height: '32px',
//       borderRadius: '0.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexShrink: 0
//     },
//     alertContent: {
//       flex: 1
//     },
//     alertMessage: {
//       fontSize: '0.875rem',
//       fontWeight: '500',
//       color: '#111827',
//       marginBottom: '0.25rem'
//     },
//     alertTime: {
//       fontSize: '0.75rem',
//       color: '#6b7280'
//     },
//     viewAllButton: {
//       color: '#3b82f6',
//       fontSize: '0.875rem',
//       fontWeight: '600',
//       textDecoration: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.25rem',
//       cursor: 'pointer'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.mainWrapper}>
        
//         {/* Hero Section */}
//         <div style={styles.heroCard}>
//           <div style={styles.heroHeader}>
//             <div>
//               <h1 style={styles.heroTitle}>
//                 Good morning, John! 
//                 <span>👋</span>
//               </h1>
//               <p style={styles.heroSubtitle}>
//                 Here's what's happening with your store today
//               </p>
//               <div style={styles.timeInfo}>
//                 <Clock size={16} />
//                 <span>{currentTime}</span>
//               </div>
//             </div>
            
//             <div style={styles.ratingCard}>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
//                 <Star size={20} style={{ color: '#fbbf24', marginRight: '0.5rem' }} />
//                 <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4.8</span>
//               </div>
//               <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
//                 From 1,247 reviews
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div style={styles.statsGrid}>
//           {quickStats.map((stat, index) => (
//             <div 
//               key={index} 
//               style={styles.statCard}
//               onMouseEnter={(e) => {
//                 Object.assign(e.target.style, styles.statCardHover);
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
//               }}
//             >
//               <div style={styles.statHeader}>
//                 <div style={{...styles.statIcon, backgroundColor: stat.bgColor}}>
//                   <stat.icon size={24} style={{ color: stat.color }} />
//                 </div>
//                 <span style={{
//                   fontSize: '0.875rem',
//                   fontWeight: '600',
//                   color: stat.change.startsWith('+') ? '#10b981' : '#ef4444',
//                   background: stat.change.startsWith('+') ? '#ecfdf5' : '#fef2f2',
//                   padding: '0.25rem 0.5rem',
//                   borderRadius: '0.375rem'
//                 }}>
//                   {stat.change}
//                 </span>
//               </div>
//               <div>
//                 <p style={styles.statValue}>{stat.value}</p>
//                 <p style={styles.statLabel}>{stat.label}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div style={styles.contentGrid}>
          
//           {/* Quick Actions */}
//           <div style={styles.actionCard}>
//             <h2 style={styles.cardTitle}>
//               <div style={{width: '4px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '2px'}}></div>
//               Quick Actions
//             </h2>
//             <div style={styles.actionGrid}>
//               {quickActions.map((action, index) => (
//                 <button
//                   key={index}
//                   onClick={action.action}
//                   style={{
//                     ...styles.actionButton,
//                     background: `linear-gradient(135deg, ${action.color}, ${action.color}dd)`
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.transform = 'translateY(-2px)';
//                     e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.transform = 'translateY(0)';
//                     e.target.style.boxShadow = 'none';
//                   }}
//                 >
//                   <action.icon size={18} />
//                   {action.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Recent Alerts */}
//           <div style={styles.actionCard}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
//               <h2 style={{...styles.cardTitle, marginBottom: 0}}>
//                 <Bell size={20} style={{ color: '#3b82f6' }} />
//                 Recent Alerts
//               </h2>
//               <button style={styles.viewAllButton}>
//                 View All
//                 <ArrowRight size={16} />
//               </button>
//             </div>
            
//             <div style={styles.alertsContainer}>
//               {recentAlerts.map((alert, index) => (
//                 <div 
//                   key={index} 
//                   style={styles.alertItem}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#f3f4f6';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = '#f9fafb';
//                   }}
//                 >
//                   <div style={{
//                     ...styles.alertIcon,
//                     backgroundColor: alert.type === 'success' ? '#ecfdf5' :
//                                    alert.type === 'warning' ? '#fffbeb' : '#eff6ff'
//                   }}>
//                     <alert.icon size={16} style={{ color: alert.color }} />
//                   </div>
//                   <div style={styles.alertContent}>
//                     <p style={styles.alertMessage}>{alert.message}</p>
//                     <p style={styles.alertTime}>{alert.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;







// src/components/dashboard/HeroSectionMui.jsx
import React from 'react';
import { Box, Typography, Grid, Paper, Button, Avatar, useTheme } from '@mui/material';
import {
  ShoppingCart, DollarSign, Package, TrendingUp, Star, Clock, Plus, BarChart3, Bell, ArrowRight
} from 'lucide-react';
import RecentOrders from './RecentOrders';
import QuickActions from './QuickActions';
const HeroSectionMui = () => {
  const stats = [
    {
      icon: <ShoppingCart color="#10b981" />,
      label: "Today's Orders",
      value: '24',
      change: '+15%',
      bg: '#ecfdf5',
    },
    {
      icon: <DollarSign color="#3b82f6" />,
      label: "Today's Revenue",
      value: '$2,847',
      change: '+8%',
      bg: '#eff6ff',
    },
    {
      icon: <Package color="#f59e0b" />,
      label: 'Pending Orders',
      value: '12',
      change: '-3%',
      bg: '#fffbeb',
    },
    {
      icon: <TrendingUp color="#8b5cf6" />,
      label: 'Conversion Rate',
      value: '3.2%',
      change: '+12%',
      bg: '#f3e8ff',
    }
  ];

  const actions = [
    { icon: <Plus size={18} />, label: 'Add Product' },
    { icon: <ShoppingCart size={18} />, label: 'View Orders' },
    { icon: <BarChart3 size={18} />, label: 'Analytics' }
  ];

  const alerts = [
    { icon: <TrendingUp size={18} color="#10b981" />, msg: 'Wireless Headphones is trending', time: '10 mins ago' },
    { icon: <Package size={18} color="#f59e0b" />, msg: 'Low stock alert for Gaming Mouse', time: '25 mins ago' },
    { icon: <Star size={18} color="#3b82f6" />, msg: 'New customer review received', time: '1 hour ago' },
  ];

  return (
    <Box sx={{ px: 3, py: 1, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Grid container spacing={1}>
        {stats.map((s, i) => (
          <Grid item xs={2} sm={2} md={2} key={i}>
            <Paper sx={{ p: 1, borderRadius: 2, '&:hover': { boxShadow: 6 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Avatar sx={{ bgcolor: s.bg }}>{s.icon}</Avatar>
                <Typography fontWeight="bold" color={s.change.includes('+') ? 'green' : 'red'}>
                  {s.change}
                </Typography>
              </Box>
              <Typography variant="h5" mt={2}>{s.value}</Typography>
              <Typography variant="body2" color="textSecondary">{s.label}</Typography>
            </Paper>
          </Grid>
        ))}
      

      {/* Actions & Alerts */}
      <Grid container spacing={2} mt={.1}>
        {/* Quick Actions */}


        {/* Alerts */}
        <Grid item xs={12} md={4}>
          {/* <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">Recent Alerts</Typography>
              <Button size="small" endIcon={<ArrowRight size={16} />} sx={{ textTransform: 'none' }}>
                View All
              </Button>
            </Box>
            {alerts.map((a, i) => (
              <Box key={i} display="flex" gap={2} py={1.2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: '#f1f5f9', width: 32, height: 32 }}>{a.icon}</Avatar>
                <Box>
                  <Typography variant="body2">{a.msg}</Typography>
                  <Typography variant="caption" color="textSecondary">{a.time}</Typography>
                </Box>
              </Box>
            ))}
          </Paper> */}
          <RecentOrders />
        </Grid>


                <Grid item xs={12} md={8}>
          {/* <Paper sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {actions.map((a, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={a.icon}
                    sx={{ textTransform: 'none', borderRadius: 2 }}
                  >
                    {a.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper> */}
          <QuickActions actions={actions} />
        </Grid>
      </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSectionMui;
