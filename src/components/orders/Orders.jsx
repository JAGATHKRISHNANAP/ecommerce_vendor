import React, { useState, useEffect } from 'react';
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
    Tab,
    Tabs,
    CircularProgress,
    Button,
    Select,
    MenuItem,
    Collapse,
    IconButton,
    Alert
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import orderAPI from '../../services/api/orderAPI';

const statusColors = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'error',
    returned: 'default'
};

const Row = ({ order, onStatusUpdate }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        // Don't update if same
        if (newStatus === order.status) return;

        setLoading(true);
        try {
            await onStatusUpdate(order.order_id, newStatus);
        } catch (error) {
            console.error("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{order.order_number}</TableCell>
                <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                <TableCell>
                    {/* Replace this select logic later if we want a safer UI (like a modal) */}
                    <Select
                        value={order.status}
                        size="small"
                        onChange={handleStatusChange}
                        disabled={loading}
                        sx={{
                            fontSize: '0.875rem',
                            '& .MuiSelect-select': { py: 0.5, pl: 1, pr: 3 },
                            minWidth: 120
                        }}
                    >
                        {Object.keys(statusColors).map((status) => (
                            <MenuItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Order Items
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell align="right">Unit Price</TableCell>
                                        <TableCell align="right">Total Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                <Box display="flex" alignItems="center" gap={2}>
                                                    {item.product_image && (
                                                        <img
                                                            src={item.product_image.startsWith('http') ? item.product_image : `/api${item.product_image.startsWith('/') ? '' : '/'}${item.product_image}`}
                                                            alt={item.product_name}
                                                            width={40}
                                                            height={40}
                                                            style={{ objectFit: 'cover', borderRadius: 4 }}
                                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=NA'; }}
                                                        />
                                                    )}
                                                    {item.product_name}
                                                </Box>
                                            </TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell align="right">${item.unit_price.toFixed(2)}</TableCell>
                                            <TableCell align="right">${item.total_price.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Box mt={2}>
                                <Typography variant="subtitle2">Shipping Address:</Typography>
                                <Typography variant="body2" color="textSecondary">{order.shipping_address}</Typography>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tabValue, setTabValue] = useState(0);

    const tabs = [
        { label: 'All Orders', value: '' },
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
    ];

    const fetchOrders = async (status = '') => {
        setLoading(true);
        try {
            const data = await orderAPI.getOrders(status);
            setOrders(data);
            setError('');
        } catch (err) {
            setError('Failed to load orders. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(tabs[tabValue].value);
    }, [tabValue]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await orderAPI.updateOrderStatus(orderId, { status: newStatus });
            // Refresh list to update UI safely
            fetchOrders(tabs[tabValue].value);
        } catch (err) {
            alert("Failed to update status");
            throw err;
        }
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" gutterBottom>
                        Order Management
                    </Typography>
                    <Button variant="outlined" size="small" onClick={() => fetchOrders(tabs[tabValue].value)} disabled={loading}>
                        Refresh
                    </Button>
                </Box>

                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
                >
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab.label} />
                    ))}
                </Tabs>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {loading ? (
                    <Box display="flex" justifyContent="center" p={4}>
                        <CircularProgress />
                    </Box>
                ) : orders.length === 0 ? (
                    <Box p={4} textAlign="center">
                        <Typography color="textSecondary">No orders found.</Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Order #</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <Row key={order.order_id} order={order} onStatusUpdate={handleStatusUpdate} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );
};

export default Orders;
