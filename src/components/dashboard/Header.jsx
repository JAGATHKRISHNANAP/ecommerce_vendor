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
