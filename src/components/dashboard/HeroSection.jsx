//src/components/dashboard/HeroSection.jsx
import React from 'react';
import { Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import { ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';
import RecentOrders from './RecentOrders';

const itemStyle = {
  padding: '16px',
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#3f51b5',
};

const MultiGridLayout = () => {
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
    },
  ];

  return (
    <>
      {/* Row 1 - Stat Cards */}
      <Grid container spacing={2} bgcolor={'#2f89e2'} padding={2}>
        {/* {stats.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper sx={{ p: 2, borderRadius: 2, '&:hover': { boxShadow: 6 } }}>
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
        ))} */}
      </Grid>

      {/* Row 2 - Two Halves (6 + 6) */}
      <Grid container spacing={2} padding={2}>
        <Grid item xs={6} spacing={1}>
          {/* <Paper style={itemStyle}>
            <Typography>Half (6)</Typography>
          </Paper> */}
           <Grid container spacing={2}>
                  {stats.map((s, i) => (
          <Grid item xs={3} sm={3} md={1} key={i}>
            <Paper sx={{ p: 2, borderRadius: 2, '&:hover': { boxShadow: 6 } }}>
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
        </Grid>
        <Box mt={2}>
          <RecentOrders />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Paper style={itemStyle}>
            <Typography>Half (6)</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Row 3 - Three Thirds (4 + 4 + 4) */}
      <Grid container spacing={2} padding={2}>
        <Grid item xs={4}>
          <Paper style={itemStyle}>
            <Typography>One Third (4)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={itemStyle}>
            <Typography>One Third (4)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={itemStyle}>
            <Typography>One Third (4)</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default MultiGridLayout;
