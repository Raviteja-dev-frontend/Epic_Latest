import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token, setNewOrdersCount }) => {
  const [orders, setOrders] = useState([]);
  const [openOrderIndex, setOpenOrderIndex] = useState(null);
  const audioRef = useRef(null);
  const prevOrderCount = useRef(0);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Correct header
        }
      );

      if (response.data.success) {
        const fetchedOrders = response.data.orders.reverse();

        if (fetchedOrders.length > prevOrderCount.current) {
          playNotificationSound();
        }

        prevOrderCount.current = fetchedOrders.length;
        setOrders(fetchedOrders);

        const recentCount = fetchedOrders.filter((order) => {
          const diffSeconds = (new Date() - new Date(order.date)) / 1000;
          return diffSeconds < 120;
        }).length;

        setNewOrdersCount(recentCount);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ Correct header
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch {
      toast.error('Failed to update order status');
    }
  };

  const handleOpenOrder = (index) => {
    setOpenOrderIndex(openOrderIndex === index ? null : index);

    const order = orders[index];
    const diffSeconds = (new Date() - new Date(order.date)) / 1000;
    if (diffSeconds < 120) {
      setNewOrdersCount((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(fetchAllOrders, 10000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Orders</h3>

      <audio ref={audioRef} src="/Sounds/notification_sound.mp3" preload="auto" />

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 border p-4 mb-3 text-sm bg-white shadow-sm"
          >
            <img
              className="w-10 cursor-pointer"
              src={assets.parcel_icon}
              alt="parcel"
              onClick={() => handleOpenOrder(index)}
            />

            <div>
              {openOrderIndex === index && (
                <div className="bg-gray-50 p-2 mb-3 border rounded">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 items-center border-b pb-2 last:border-none"
                    >
                      <img
                        src={item.image?.[0] || assets.placeholder_image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded border"
                      />
                      <div>
                        <p>{item.name}</p>
                        <p>Qty: {item.quantity}</p>
                        {item.price && <p>Price: {currency}{item.price}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}, {order.address.city}, {order.address.state}</p>
              <p>{order.address.country} - {order.address.zipcode}</p>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
            </div>

            <p>{currency}{Number(order.amount).toFixed(2)}</p>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 border rounded"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
