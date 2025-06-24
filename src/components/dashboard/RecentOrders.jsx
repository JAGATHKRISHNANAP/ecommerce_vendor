import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
} from '@mui/material';

const orders = [
  {
    id: 'ORD001',
    customer: 'John Doe',
    date: '2025-06-20',
    amount: 249.99,
    status: 'Delivered',
  },
  {
    id: 'ORD002',
    customer: 'Alice Smith',
    date: '2025-06-19',
    amount: 149.5,
    status: 'Pending',
  },
  {
    id: 'ORD003',
    customer: 'Bob Johnson',
    date: '2025-06-18',
    amount: 89.0,
    status: 'Cancelled',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const RecentOrders = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Orders
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
