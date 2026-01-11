import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatPaymentMethod = (method) => {
    switch (method) {
      case 'cod': return 'Cash on Delivery';
      case 'upi': return 'UPI Payment';
      case 'stripe': return 'Stripe';
      case 'razorpay': return 'Razorpay';
      default: return method;
    }
  };

  const loadOrderData = async () => {
    if (!token) {
      setError('You must be logged in to view orders.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success && Array.isArray(response.data.orders)) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          const itemsArray = Array.isArray(order.items) ? order.items : [];
          itemsArray.forEach((item) => {
            allOrdersItem.push({
              ...item,
              _orderId: order._id,
              status: order.status,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else setError(response.data.message || 'Failed to fetch orders');
    } catch (err) {
      console.error('Failed to load orders:', err.response || err.message || err);
      setError(err.response?.data?.message || err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (!token) return <p className="text-center mt-10 text-red-600">Please login to see your orders.</p>;
  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (orderData.length === 0) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="container border-t pt-16" style={{ fontFamily: "ui-monospace" }}>
      <div className="text-2xl mb-8">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={item._orderId + '-' + index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex flex-col gap-2 text-sm sm:text-base">
              <p className="font-medium">{item.name}</p>
              <div className="flex items-center gap-3 text-base text-gray-700">
                <p>{currency}{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                {item.size && <p>Size: {item.size}</p>}
              </div>
              <p>
                Date: <span className="text-gray-400">{item.date ? new Date(item.date).toDateString() : 'N/A'}</span>
              </p>
              <p>
                Payment: <span className="text-gray-400">{formatPaymentMethod(item.paymentMethod)}</span>
              </p>
            </div>
            <div className="md:w-1/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base capitalize">{item.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
