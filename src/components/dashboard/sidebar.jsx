// src/components/dashboard/sidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Collapse,
  Avatar,
  Chip,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Home,
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  Star,
  TrendingUp,
  FileText,
  Bell,
  CreditCard,
  Truck,
  Tag,
  MessageSquare,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const Sidebar = ({ open, onToggle, variant }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [expandedItems, setExpandedItems] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState('dashboard');

  const drawerWidth = 280;
  const collapsedWidth = 80;



  const handleExpandClick = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <Home size={20} />,
      badge: null,
      path: '/dashboard',
    },
    {
      id: 'products',
      title: 'Products',
      icon: <Package size={20} />,
      subItems: [
        { id: 'all-products', title: 'All Products', path: '/products' },
        { id: 'add-product', title: 'Add Product', path: '/add-product' },
        { id: 'categories', title: 'Categories', path: '/categories' },
        { id: 'add-category', title: 'Add Category', path: '/add-category' },
        { id: 'inventory', title: 'Inventory' },
      ]
    },
    {
      id: 'orders',
      title: 'Orders',
      icon: <ShoppingCart size={20} />,
      // badge: '12', // Dynamic badge can be implemented later
      badgeColor: 'warning',
      path: '/orders' // Direct link to orders page, filters handled internally
    },
    {
      id: 'customers',
      title: 'Customers',
      icon: <Users size={20} />,
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: <BarChart3 size={20} />,
      subItems: [
        { id: 'overview', title: 'Overview' },
        { id: 'sales', title: 'Sales Report' },
        { id: 'traffic', title: 'Traffic Analytics' },
        { id: 'conversion', title: 'Conversion Rate' },
      ]
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: <CreditCard size={20} />,
      badgeColor: 'error',
    },
    {
      id: 'shipping',
      title: 'Shipping',
      icon: <Truck size={20} />,
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: <Tag size={20} />,
      subItems: [
        { id: 'campaigns', title: 'Campaigns' },
        { id: 'coupons', title: 'Coupons' },
        { id: 'seo', title: 'SEO Tools' },
      ]
    },
    {
      id: 'reviews',
      title: 'Reviews',
      icon: <Star size={20} />,
      badgeColor: 'success',
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: <MessageSquare size={20} />,
    },
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={20} />,
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={20} />,
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} />,
    },
  ];

  const renderMenuItem = (item, isSubItem = false) => {
    const isActive = activeItem === item.id;
    const isHovered = hoveredItem === item.id;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems[item.id];

    return (
      <React.Fragment key={item.id}>
        <ListItem
          button
          onClick={() => {
            setActiveItem(item.id);
            if (item.path) navigate(item.path);
            if (hasSubItems) handleExpandClick(item.id);
          }}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            mx: 1,
            pl: isSubItem ? 4 : 2,
            backgroundColor: isActive
              ? alpha(theme.palette.primary.main, 0.15)
              : isHovered
                ? alpha(theme.palette.primary.main, 0.05)
                : 'transparent',
            borderLeft: isActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              transform: 'translateX(4px)',
            },
            ...(isActive && {
              '&::after': {
                content: '""',
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 4,
                height: '70%',
                backgroundColor: theme.palette.primary.main,
                // backgroundColor: '#00ff00',
                borderRadius: '4px 0 0 4px',
              },
            }),
          }}
        >
          {!isSubItem && (
            <ListItemIcon
              sx={{
                color: isActive ? '#ffffff' : '#eed0d0',
                minWidth: open ? 40 : 'auto',
              }}
            >
              {open ? (
                item.icon
              ) : (
                <Tooltip title={item.title} placement="right" arrow>
                  {item.icon}
                </Tooltip>
              )}
            </ListItemIcon>
          )}

          {open && (
            <>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: isSubItem ? 13 : 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#ffffff' : '#eed0d0',
                }}
              />

              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  color={item.badgeColor || 'primary'}
                  sx={{
                    height: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    ...(item.badgeColor === 'success' && {
                      backgroundColor: '#10b981',
                      color: 'white',
                    }),
                  }}
                />
              )}

              {hasSubItems && (
                <IconButton size="small" sx={{ ml: 'auto' }}>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </IconButton>
              )}
            </>
          )}
        </ListItem>

        {hasSubItems && open && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map(subItem => renderMenuItem(subItem, true))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Drawer
      // variant="permanent"
      variant={variant}
      open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          backgroundColor: '#232f3e',
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          p: 2,
          minHeight: 20,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {open && (
          <Box display="flex" alignItems="center" gap={1}>
          </Box>
        )}

        <IconButton onClick={onToggle} size="small" backgroundColor="transparent" sx={{ color: 'white' }}>
          {open ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </IconButton>
      </Box>

      {/* Main Menu */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden', py: 1 }}>
        <List sx={{ backgroundColor: "#232f3e", color: 'white', padding: 0 }}>
          {menuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
