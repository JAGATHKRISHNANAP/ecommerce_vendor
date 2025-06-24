
// // src/pages/Dashboard.jsx
// import AppHeader from '../components/dashboard/Header';
// import HeroSection from '../components/dashboard/HeroSection';

// const Dashboard = () => {
//   return (
//     <>
//       <AppHeader />
//       <div style={{ padding: '.1rem', textAlign: 'center' }}>

//         <HeroSection />
//       </div>
//     </>
//   );
// };

// export default Dashboard;




// // src/pages/Dashboard.jsx
// import React, { useState } from 'react';
// import { Box } from '@mui/material';
// import AppHeader from '../components/dashboard/Header';
// import HeroSection from '../components/dashboard/HeroSection';
// import Sidebar from '../components/dashboard/sidebar';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const drawerWidth = 280;
//   const collapsedWidth = 80;

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
//       {/* Sidebar */}
//       <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />
      
//       {/* Main Content Area */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedWidth}px)`,
//           transition: theme => theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//         }}
//       >
//         {/* Header */}
//         <AppHeader />
        
//         {/* Page Content */}
//         <Box sx={{ p: 3 }}>
//           <HeroSection />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;











// // src/pages/Dashboard.jsx
// import React, { useState } from 'react';
// import { Box } from '@mui/material';
// import AppHeader from '../components/dashboard/Header';
// import HeroSection from '../components/dashboard/HeroSection';
// import Sidebar from '../components/dashboard/sidebar';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const drawerWidth = 280;
//   const collapsedWidth = 80;

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
//       {/* Sidebar */}
//       <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />
      
//       {/* Main Content Area */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedWidth}px)`,
//           transition: theme => theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//         }}
//       >
//         {/* Header */}
//         <AppHeader />
        
//         {/* Page Content */}
//         <Box sx={{ p: 3 }}>
//           <HeroSection />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;


// // src/pages/Dashboard.jsx
// import React, { useState } from 'react';
// import { Box } from '@mui/material';
// import AppHeader from '../components/dashboard/Header';
// import HeroSection from '../components/dashboard/HeroSection';
// import Sidebar from '../components/dashboard/sidebar';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const drawerWidth = 280;
//   const collapsedWidth = 80;

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
//       <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />
      
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedWidth}px)`,
//           transition: theme => theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//         }}
//       >
//         <AppHeader onToggleSidebar={handleSidebarToggle} />

//         <Box sx={{ p: 3, mt: 8 }}>
//           <HeroSection />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;






import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AppHeader from '../components/dashboard/Header';
import HeroSection from '../components/dashboard/HeroSection';
import Sidebar from '../components/dashboard/sidebar';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // screen < 600px

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const drawerWidth = 280;
  const collapsedWidth = 80;

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Sidebar
        open={sidebarOpen}
        onToggle={handleSidebarToggle}
        variant={isMobile ? 'temporary' : 'persistent'}
        drawerWidth={drawerWidth}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: isMobile
            ? '100%'
            : `calc(100% - ${sidebarOpen ? drawerWidth : collapsedWidth}px)`,
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <AppHeader onToggleSidebar={handleSidebarToggle} />

        <Box sx={{ p: 3, mt: 8 }}>
          <HeroSection />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
