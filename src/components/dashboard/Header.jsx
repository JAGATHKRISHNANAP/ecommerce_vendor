// // Header.jsx
// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Badge,
//   InputBase,
//   Menu,
//   MenuItem,
//   Box,
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   useMediaQuery
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   Search as SearchIcon,
//   Notifications as NotificationsIcon,
//   AccountCircle,
//   Settings,
//   HelpOutline,
//   Logout,
//   Store as StoreIcon
// } from '@mui/icons-material';
// import { useTheme, styled } from '@mui/material/styles';

// const SearchWrapper = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: theme.palette.grey[100],
//   '&:hover': {
//     backgroundColor: theme.palette.grey[200],
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(2),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   pointerEvents: 'none',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//   width: '100%',
// }));

// const Header = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notifAnchorEl, setNotifAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const notifications = [
//     { id: 1, title: 'New order received', time: '2 min ago' },
//     { id: 2, title: 'Payment processed', time: '1 hour ago' },
//     { id: 3, title: 'Inventory low warning', time: '3 hours ago' },
//   ];

//   const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleNotifMenuOpen = (event) => setNotifAnchorEl(event.currentTarget);
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setNotifAnchorEl(null);
//   };
//   const toggleDrawer = () => setMobileOpen(!mobileOpen);

//   return (
//     <>
//       <AppBar position="static" color="default" elevation={1} >
//         <Toolbar sx={{ justifyContent: 'space-between' ,        background: '#232f3e',
//         boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
//         borderBottom: '1px solid #3c4043' }}>
//           <Box display="flex" alignItems="center">
//             <StoreIcon sx={{ color: 'primary.main', mr: 1 }} />
//             <Typography variant="h6" noWrap component="div" color='white' sx={{ display: { xs: 'none', sm: 'block' } }}>
//               E Commerce
//             </Typography>
//             <Typography variant="body2" sx={{ color: theme => theme.palette.common.white, fontSize : 11, ml: 1, display: { xs: 'none', sm: 'block' } }}>
//               vendor center
//             </Typography>
//           </Box>

//           {!isMobile && (
//             <SearchWrapper>
//               <SearchIconWrapper>
//                 <SearchIcon />
//               </SearchIconWrapper>
//               <StyledInputBase placeholder="Search orders, products..." />
//             </SearchWrapper>
//           )}

//           <Box display="flex" alignItems="center">
//             <IconButton onClick={handleNotifMenuOpen} color="inherit">
//               <Badge badgeContent={notifications.length} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>

//             <IconButton onClick={handleProfileMenuOpen} color="inherit">
//               <AccountCircle />
//             </IconButton>

//             {isMobile && (
//               <IconButton onClick={toggleDrawer}>
//                 <MenuIcon />
//               </IconButton>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Notifications Dropdown */}
//       <Menu
//         anchorEl={notifAnchorEl}
//         open={Boolean(notifAnchorEl)}
//         onClose={handleMenuClose}
//         PaperProps={{ sx: { width: 300 } }}
//       >
//         <Typography sx={{ px: 2, pt: 1, fontWeight: 600 }}>Notifications</Typography>
//         <Divider />
//         {notifications.map((n) => (
//           <MenuItem key={n.id}>
//             <Box>
//               <Typography variant="body2" fontWeight="bold">{n.title}</Typography>
//               <Typography variant="caption" color="text.secondary">{n.time}</Typography>
//             </Box>
//           </MenuItem>
//         ))}
//         <Divider />
//         <MenuItem onClick={handleMenuClose}>
//           <Typography color="primary">View all notifications</Typography>
//         </MenuItem>
//       </Menu>

//       {/* Profile Dropdown */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//         PaperProps={{ sx: { width: 220 } }}
//       >
//         <Box sx={{ px: 2, py: 1 }}>
//           <Typography fontWeight={600}>John Doe</Typography>
//           <Typography variant="caption" color="text.secondary">john@example.com</Typography>
//         </Box>
//         <Divider />
//         <MenuItem><AccountCircle fontSize="small" sx={{ mr: 1 }} /> Profile</MenuItem>
//         <MenuItem><Settings fontSize="small" sx={{ mr: 1 }} /> Settings</MenuItem>
//         <MenuItem><HelpOutline fontSize="small" sx={{ mr: 1 }} /> Help & Support</MenuItem>
//         <Divider />
//         <MenuItem sx={{ color: 'error.main' }}><Logout fontSize="small" sx={{ mr: 1 }} /> Sign Out</MenuItem>
//       </Menu>

//       {/* Mobile Drawer for Search */}
//       <Drawer anchor="top" open={mobileOpen} onClose={toggleDrawer}>
//         <Box p={2}>
//           <SearchWrapper>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase placeholder="Search..." />
//           </SearchWrapper>
//         </Box>
//         <Divider />
//         <List>
//           <ListItem button>
//             <ListItemIcon><AccountCircle /></ListItemIcon>
//             <ListItemText primary="Profile" />
//           </ListItem>
//           <ListItem button>
//             <ListItemIcon><Settings /></ListItemIcon>
//             <ListItemText primary="Settings" />
//           </ListItem>
//           <ListItem button>
//             <ListItemIcon><Logout /></ListItemIcon>
//             <ListItemText primary="Sign Out" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Header;




// // import React, { useState, useRef, useEffect } from 'react'
// // import { useSelector, useDispatch } from 'react-redux'
// // import { logout } from '../../redux/slices/authSlices'
// // import LoadingSpinner from '../ui/LoadingSpinner'
// // import { useNavigate } from 'react-router-dom'
// // import { cartAPI } from '../../services/api/cartAPI'

// // const Header = ({ onSearch, searchQuery }) => {
// //   const dispatch = useDispatch()
// //   const navigate = useNavigate()  
// //   const { user, isLoading } = useSelector(state => state.auth)
// //   const [showProfileDropdown, setShowProfileDropdown] = useState(false)
// //   const [searchInput, setSearchInput] = useState(searchQuery || '')
// //   const [searchSuggestions, setSearchSuggestions] = useState([])
// //   const [showSuggestions, setShowSuggestions] = useState(false)

// //   const [cartCount, setCartCount] = useState(0);
// //   const dropdownRef = useRef(null)
// //   const searchRef = useRef(null)
  

// //   console.log('Header rendered with searchQuery:', user)
// //   sessionStorage.setItem("customer_id", user?.customer_id);
// //   // const customer_id = user?.customer_id;
// //   const handleLogout = async () => {
// //     if (window.confirm('Are you sure you want to logout?')) {
// //       dispatch(logout())
// //     }
// //   }

// //   const handleSearch = (e) => {
// //     e.preventDefault()
// //     if (searchInput.trim()) {
// //       onSearch(searchInput.trim())
// //       setShowSuggestions(false)
// //     }
// //   }

// // useEffect(() => {
// //   const fetchCartCount = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         console.warn('No token found in localStorage');
// //         return;
// //       }

// //       const cartData = await cartAPI.getCartCount();
// //       setCartCount(cartData.total_items);
// //     } catch (error) {
// //       console.error('Failed to fetch cart count:', error);
// //     }
// //   };

// //   fetchCartCount();
// // }, []);



// //   console.log('Cart count:', cartCount);

// //   const handleSearchInputChange = async (e) => {
// //     const value = e.target.value
// //     setSearchInput(value)
    
// //     if (value.length >= 2) {
// //       try {
// //         const response = await fetch(`http://localhost:8000/api/v1/api/search/suggestions?q=${encodeURIComponent(value)}`)
// //         if (response.ok) {
// //           const suggestions = await response.json()
// //           setSearchSuggestions(suggestions)
// //           setShowSuggestions(true)
// //         }
// //       } catch (error) {
// //         console.error('Error fetching suggestions:', error)
// //       }
// //     } else {
// //       setShowSuggestions(false)
// //     }
// //   }

// //   const handleSuggestionClick = (suggestion) => {
// //     setSearchInput(suggestion)
// //     setShowSuggestions(false)
// //     onSearch(suggestion)
// //   }

// //   const handleCartClick = () => {
// //     navigate('/cart')
// //   }

// //   // Close dropdowns when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setShowProfileDropdown(false)
// //       }
// //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// //         setShowSuggestions(false)
// //       }
// //     }

// //     document.addEventListener('mousedown', handleClickOutside)
// //     return () => document.removeEventListener('mousedown', handleClickOutside)
// //   }, [])

// //   return (
// //     <>
// //       <header className="header-container" style={{
// //         position: 'sticky',
// //         top: 0,
// //         zIndex: 1000,
// //         background: '#232f3e',
// //         boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
// //         borderBottom: '1px solid #3c4043'
// //       }}>
// //         <div style={{
// //           maxWidth: '1400px',
// //           margin: '0 auto',
// //           padding: '12px 24px',
// //           display: 'flex',
// //           alignItems: 'center',
// //           gap: '20px'
// //         }}>
// //           {/* Logo */}
// //           <div className="header-logo" style={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             gap: '12px',
// //             minWidth: 'fit-content'
// //           }}>
// //             <div style={{
// //               width: '40px',
// //               height: '40px',
// //               background: 'linear-gradient(135deg, #ff9900 0%, #ffad33 100%)',
// //               borderRadius: '6px',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               fontSize: '20px',
// //               boxShadow: '0 2px 4px rgba(255, 153, 0, 0.3)'
// //             }}>
// //               🛒
// //             </div>
// //             <h1 style={{
// //               fontSize: '22px',
// //               fontWeight: '700',
// //               color: '#fff',
// //               margin: '0',
// //               letterSpacing: '-0.5px'
// //             }}>
// //               E-commerce
// //             </h1>
// //           </div>

// //           {/* Search Bar */}
// //           <div ref={searchRef} className="header-search" style={{
// //             flex: 1,
// //             position: 'relative',
// //             maxWidth: '1000px'
// //           }}>
// //             <form onSubmit={handleSearch} style={{
// //               display: 'flex',
// //               alignItems: 'center',
// //               background: '#fff',
// //               borderRadius: '4px',
// //               border: '2px solid transparent',
// //               overflow: 'hidden',
// //               transition: 'border-color 0.2s ease'
// //             }}
// //             onFocus={(e) => {
// //               e.currentTarget.style.borderColor = '#ff9900'
// //             }}
// //             onBlur={(e) => {
// //               e.currentTarget.style.borderColor = 'transparent'
// //             }}
// //             >
// //               <input
// //                 type="text"
// //                 placeholder="Search e-Commerce"
// //                 value={searchInput}
// //                 onChange={handleSearchInputChange}
// //                 style={{
// //                   flex: 1,
// //                   padding: '10px 16px',
// //                   border: 'none',
// //                   fontSize: '14px',
// //                   outline: 'none',
// //                   background: 'transparent',
// //                   color: '#111'
// //                 }}
// //               />
// //               <button
// //                 type="submit"
// //                 style={{
// //                   padding: '10px 16px',
// //                   background: '#febd69',
// //                   color: '#111',
// //                   border: 'none',
// //                   cursor: 'pointer',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   gap: '6px',
// //                   fontSize: '14px',
// //                   fontWeight: '500',
// //                   transition: 'background 0.2s ease'
// //                 }}
// //                 onMouseOver={(e) => {
// //                   e.target.style.background = '#ff9900'
// //                 }}
// //                 onMouseOut={(e) => {
// //                   e.target.style.background = '#febd69'
// //                 }}
// //               >
// //                 🔍
// //               </button>
// //             </form>

// //             {/* Search Suggestions */}
// //             {showSuggestions && searchSuggestions.length > 0 && (
// //               <div style={{
// //                 position: 'absolute',
// //                 top: '100%',
// //                 left: 0,
// //                 right: 0,
// //                 background: '#fff',
// //                 border: '1px solid #ddd',
// //                 borderTop: 'none',
// //                 borderRadius: '0 0 4px 4px',
// //                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// //                 zIndex: 1001,
// //                 maxHeight: '300px',
// //                 overflowY: 'auto'
// //               }}>
// //                 {searchSuggestions.map((suggestion, index) => (
// //                   <div
// //                     key={index}
// //                     className="search-suggestion"
// //                     onClick={() => handleSuggestionClick(suggestion)}
// //                     style={{
// //                       padding: '10px 16px',
// //                       cursor: 'pointer',
// //                       borderBottom: index < searchSuggestions.length - 1 ? '1px solid #eee' : 'none',
// //                       fontSize: '14px',
// //                       color: '#111',
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       gap: '10px'
// //                     }}
// //                   >
// //                     <span style={{ opacity: 0.6 }}>🔍</span>
// //                     <span>{suggestion}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Right Side Actions */}
// //           <div style={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             gap: '16px',
// //             marginLeft: 'auto'
// //           }}>
// //             {/* Cart Icon */}
// //             <button 
// //               onClick={handleCartClick}
// //               style={{
// //                 padding: '8px 12px',
// //                 background: 'transparent',
// //                 color: '#fff',
// //                 border: '1px solid #5a6c7d',
// //                 borderRadius: '4px',
// //                 cursor: 'pointer',
// //                 fontSize: '14px',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 gap: '6px',
// //                 position: 'relative',
// //                 transition: 'all 0.2s ease',
// //                 fontWeight: '500'
// //               }}
// //               onMouseOver={(e) => {
// //                 e.target.style.borderColor = '#ff9900'
// //                 e.target.style.color = '#ff9900'
// //               }}
// //               onMouseOut={(e) => {
// //                 e.target.style.borderColor = '#5a6c7d'
// //                 e.target.style.color = '#fff'
// //               }}
// //             >
// //               <span style={{ fontSize: '16px' }}>🛒</span>
// //               <span className="cart-text" style={{ fontSize: '12px' }}>Cart</span>
// //               <span style={{
// //                 position: 'absolute',
// //                 top: '-6px',
// //                 right: '-6px',
// //                 background: '#ff9900',
// //                 color: '#232f3e',
// //                 borderRadius: '50%',
// //                 width: '18px',
// //                 height: '18px',
// //                 fontSize: '11px',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 fontWeight: '700'
// //               }}>
// //                 {/* 0 */}

// //                 {cartCount}
// //               </span>
// //             </button>

// //             {/* Profile Dropdown - Enhanced Right Positioning */}
// //             <div ref={dropdownRef} style={{ 
// //               position: 'relative',
// //               marginLeft: '8px'
// //             }}>
// //               <button
// //                 onClick={() => setShowProfileDropdown(!showProfileDropdown)}
// //                 style={{
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   gap: '8px',
// //                   padding: '6px 12px',
// //                   background: 'transparent',
// //                   border: '1px solid #5a6c7d',
// //                   borderRadius: '4px',
// //                   cursor: 'pointer',
// //                   color: '#fff',
// //                   transition: 'all 0.2s ease',
// //                   fontSize: '14px'
// //                 }}
// //                 onMouseOver={(e) => {
// //                   e.target.style.borderColor = '#ff9900'
// //                   e.target.style.color = '#ff9900'
// //                 }}
// //                 onMouseOut={(e) => {
// //                   if (!showProfileDropdown) {
// //                     e.target.style.borderColor = '#5a6c7d'
// //                     e.target.style.color = '#fff'
// //                   }
// //                 }}
// //               >
// //                 <div style={{
// //                   width: '24px',
// //                   height: '24px',
// //                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //                   borderRadius: '50%',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                   color: '#fff',
// //                   fontWeight: '700',
// //                   fontSize: '12px'
// //                 }}>
// //                   {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
// //                 </div>
// //                 <div className="profile-text" style={{ 
// //                   textAlign: 'left',
// //                   lineHeight: '1.2'
// //                 }}>
// //                   <div style={{
// //                     fontSize: '12px',
// //                     fontWeight: '500',
// //                     margin: '0'
// //                   }}>
// //                     Hello, {user?.name?.split(' ')[0] || 'User'}
// //                   </div>
// //                   <div style={{
// //                     fontSize: '11px',
// //                     opacity: 0.8,
// //                     margin: '0',
// //                     fontWeight: '700'
// //                   }}>
// //                     Account & Lists ▼
// //                   </div>
// //                 </div>
// //               </button>

// //               {/* Enhanced Dropdown Menu - Right Aligned */}
// //               {showProfileDropdown && (
// //                 <div 
// //                   className="profile-dropdown-enter"
// //                   style={{
// //                     position: 'absolute',
// //                     top: '100%',
// //                     right: '0', // Right aligned dropdown
// //                     background: '#fff',
// //                     borderRadius: '4px',
// //                     boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
// //                     marginTop: '8px',
// //                     minWidth: '280px',
// //                     zIndex: 1001,
// //                     border: '1px solid #ddd',
// //                     overflow: 'hidden'
// //                   }}
// //                 >
// //                   {/* User Info Header */}
// //                   <div style={{
// //                     padding: '16px 20px',
// //                     borderBottom: '1px solid #eee',
// //                     background: '#f7f7f7'
// //                   }}>
// //                     <div style={{
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       gap: '12px'
// //                     }}>
// //                       <div style={{
// //                         width: '40px',
// //                         height: '40px',
// //                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //                         borderRadius: '50%',
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         justifyContent: 'center',
// //                         color: '#fff',
// //                         fontWeight: '700',
// //                         fontSize: '16px'
// //                       }}>
// //                         {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
// //                       </div>
// //                       <div>
// //                         <p style={{
// //                           fontSize: '16px',
// //                           fontWeight: '600',
// //                           color: '#111',
// //                           margin: '0 0 4px 0'
// //                         }}>
// //                           {/* {user?.name || 'User'} */}
// //                           {user?.name || 'User'}
// //                         </p>
// //                         <p style={{
// //                           fontSize: '13px',
// //                           color: '#666',
// //                           margin: '0'
// //                         }}>
// //                           {user?.email || user?.phoneNumber || 'user@example.com'}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
                  
// //                   {/* Menu Items */}
// //                   <div style={{ padding: '8px 0' }}>
// //                     {[
// //                        { icon: '👤', label: 'Your Account', action: () => {
// //                         navigate('/your-account')
// //                         setShowProfileDropdown(false)
// //                       }},
// //                       { icon: '📦', label: 'Your Orders', action: () => {} },
// //                       { icon: '❤️', label: 'Your Wish List', action: () => {} },
// //                       { icon: '🔄', label: 'Your Subscriptions', action: () => {} },
// //                       { icon: '💳', label: 'Payment Options', action: () => {} },
// //                       { icon: '⚙️', label: 'Account Settings', action: () => {} }
// //                     ].map((item, index) => (
// //                       <button
// //                         key={index}
// //                         onClick={item.action}
// //                         style={{
// //                           width: '100%',
// //                           padding: '12px 20px',
// //                           background: 'none',
// //                           border: 'none',
// //                           textAlign: 'left',
// //                           cursor: 'pointer',
// //                           display: 'flex',
// //                           alignItems: 'center',
// //                           gap: '12px',
// //                           fontSize: '14px',
// //                           color: '#111',
// //                           transition: 'background 0.2s ease'
// //                         }}
// //                         onMouseOver={(e) => {
// //                           e.target.style.background = '#f3f3f3'
// //                         }}
// //                         onMouseOut={(e) => {
// //                           e.target.style.background = 'none'
// //                         }}
// //                       >
// //                         <span style={{ fontSize: '16px', opacity: 0.7 }}>{item.icon}</span>
// //                         <span style={{ fontWeight: '400' }}>{item.label}</span>
// //                       </button>
// //                     ))}
                    
// //                     <div style={{
// //                       height: '1px',
// //                       background: '#eee',
// //                       margin: '8px 0'
// //                     }} />
                    
// //                     <button
// //                       onClick={handleLogout}
// //                       disabled={isLoading}
// //                       style={{
// //                         width: '100%',
// //                         padding: '12px 20px',
// //                         background: 'none',
// //                         border: 'none',
// //                         textAlign: 'left',
// //                         cursor: isLoading ? 'not-allowed' : 'pointer',
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         gap: '12px',
// //                         fontSize: '14px',
// //                         color: '#d73027',
// //                         opacity: isLoading ? 0.7 : 1,
// //                         fontWeight: '500',
// //                         transition: 'background 0.2s ease'
// //                       }}
// //                       onMouseOver={(e) => {
// //                         if (!isLoading) {
// //                           e.target.style.background = '#fff5f5'
// //                         }
// //                       }}
// //                       onMouseOut={(e) => {
// //                         e.target.style.background = 'none'
// //                       }}
// //                     >
// //                       {isLoading ? (
// //                         <>
// //                           <LoadingSpinner size="small" color="#d73027" />
// //                           <span>Signing out...</span>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <span style={{ fontSize: '16px' }}>🚪</span>
// //                           <span>Sign Out</span>
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </header>
// //     </>
// //   )
// // }

// // export default Header








// // src/components/AppHeader.jsx
// import React from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   InputBase,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import { Search as SearchIcon, Logout as LogoutIcon } from '@mui/icons-material';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../redux/slices/authSlices';

// const AppHeader = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector(state => state.auth);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       dispatch(logout());
//       localStorage.clear();
//     }
//     handleMenuClose();
//   };

//   return (
//     <AppBar position="static" elevation={2} sx={{ bgcolor: '#232f3e' }}>
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         {/* Title / Logo */}
// <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' ,fontFamily: 'cursive'}}>
//   E commerce&nbsp;
//   <Typography component="span" variant="h6" sx={{ fontSize:10, fontWeight: 'normal', color: 'grey.300' ,fontFamily: 'cursive'}}>
//     Vendor Central
//   </Typography>
// </Typography>


//         {/* Search Bar */}
//         <Box
//           sx={{
//             position: 'relative',
//             borderRadius: 2,
//             backgroundColor: 'white',
//             mx: 2,
//             width: { xs: '100%', sm: '50%' },
//             display: 'flex',
//             alignItems: 'center',
//             px: 2,
//           }}
//         >
//           <SearchIcon color="action" />
//           <InputBase
//             placeholder="Search…"
//             sx={{ ml: 1, flex: 1 }}
//             inputProps={{ 'aria-label': 'search' }}
//           />
//         </Box>

//         {/* User Profile */}
//         <Box display="flex" alignItems="center">
//           <Typography variant="body1" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
//             {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'User'}
//           </Typography>
          
//           <IconButton onClick={handleMenuOpen}>
//             <Avatar>{user?.name?.charAt(0).toUpperCase() || 'U'}</Avatar>
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleLogout}>
//               <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
//               Logout
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AppHeader;


// // src/components/dashboard/AppHeader.jsx
// import React, { useEffect, useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   InputBase,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
//   Rating,
// } from '@mui/material';
// import { Search as SearchIcon, Logout as LogoutIcon } from '@mui/icons-material';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../redux/slices/authSlices';

// const AppHeader = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector(state => state.auth);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

//   // Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       dispatch(logout());
//       localStorage.clear();
//     }
//     handleMenuClose();
//   };

//   return (
//     <AppBar position="static" elevation={2} sx={{ bgcolor: '#232f3e' }}>
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         {/* Title / Logo */}
//         <Typography
//           variant="h6"
//           noWrap
//           sx={{
//             fontWeight: 'bold',
//             display: 'flex',
//             alignItems: 'center',
//             fontFamily: 'cursive',
//           }}
//         >
//           E commerce&nbsp;
//           <Typography
//             component="span"
//             variant="h6"
//             sx={{
//               fontSize: 10,
//               fontWeight: 'normal',
//               color: 'grey.300',
//               fontFamily: 'cursive',
//             }}
//           >
//             Vendor Central
//           </Typography>
//         </Typography>

//         {/* Search Bar */}
//         <Box
//           sx={{
//             position: 'relative',
//             borderRadius: 2,
//             backgroundColor: 'white',
//             mx: 2,
//             width: { xs: '100%', sm: '50%' },
//             display: 'flex',
//             alignItems: 'center',
//             px: 2,
//           }}
//         >
//           <SearchIcon color="action" />
//           <InputBase
//             placeholder="Search…"
//             sx={{ ml: 1, flex: 1 }}
//             inputProps={{ 'aria-label': 'search' }}
//           />
//         </Box>

//         {/* User Profile + Time + Rating */}
// {/* User Profile + Time + Average Rating */}
// <Box display="flex" alignItems="center" gap={2}>
//   <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
//     <Typography variant="body1">
//       {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'User'}
//     </Typography>
//     <Typography variant="caption" sx={{ color: 'grey.300' }}>
//       {currentTime}
//     </Typography>
//     <Typography variant="caption" sx={{ color: 'gold' }}>
//       ⭐ 4.5
//     </Typography>
//   </Box>

//   <IconButton onClick={handleMenuOpen}>
//     <Avatar>{user?.name?.charAt(0).toUpperCase() || 'U'}</Avatar>
//   </IconButton>

//   <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//     <MenuItem onClick={handleLogout}>
//       <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
//       Logout
//     </MenuItem>
//   </Menu>
// </Box>

//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AppHeader;










// src/components/dashboard/AppHeader.jsx
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlices';

const AppHeader = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      localStorage.clear();
    }
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        bgcolor: '#232f3e',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Sidebar Toggle + Brand */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={onToggleSidebar} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
            E commerce&nbsp;
            <Typography
              component="span"
              variant="caption"
              sx={{
                fontSize: 10,
                color: 'grey.300',
                fontFamily: 'cursive',
              }}
            >
              Vendor Central
            </Typography>
          </Typography>
        </Box>

        {/* Center: Search */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: 'white',
            mx: 2,
            width: { xs: '100%', sm: '50%' },
            display: 'flex',
            alignItems: 'center',
            px: 2,
          }}
        >
          <SearchIcon color="action" />
          <InputBase
            placeholder="Search…"
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>

        {/* Right: User Info */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="body1">
              {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'User'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.300' }}>
              {currentTime}
            </Typography>
            <Typography variant="caption" sx={{ color: 'gold' }}>
              ⭐ 4.5
            </Typography>
          </Box>

          <IconButton onClick={handleMenuOpen}>
            <Avatar>{user?.name?.charAt(0).toUpperCase() || 'U'}</Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
