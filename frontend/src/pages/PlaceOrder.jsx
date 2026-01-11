import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import QRCode from 'react-qr-code';
import sendOrderMail from '../components/sendOrderMail';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [upiConfirmed, setUpiConfirmed] = useState(false);
  const [isPlacingUPIOrder, setIsPlacingUPIOrder] = useState(false);

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const playOrderSound = () => {
    const audio = new Audio('/darklord.mp3');
    audio.volume = 0.7;
    audio.play().catch(err => console.log('Failed to play sound:', err));
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const buildOrderItems = () => {
    const orderItems = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const product = products.find(p => p._id === items);
          if (product) {
            const itemInfo = JSON.parse(JSON.stringify(product));
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    return orderItems;
  };

  const handlePostOrderEmail = async (orderItems) => {
    try {
      await sendOrderMail({
        items: orderItems,
        address: formData,
        amount: getCartAmount()
      });
    } catch (err) {
      console.error('Failed to send order email', err);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Please login first.");
      navigate('/login');
      return;
    }

    if (method === 'upi' && !upiConfirmed) {
      toast.error("Please confirm UPI payment before placing the order.");
      return;
    }

    try {
      const orderItems = buildOrderItems();
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
        payment_method: method
      };

      switch (method) {
        case 'cod': {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            await handlePostOrderEmail(orderItems);
            setCartItems({});
            playOrderSound();
            toast.success('Order placed successfully!');
            navigate('/orders');
          } else toast.error(response.data.message);
          break;
        }

        case 'stripe': {
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (responseStripe.data.success) {
            await handlePostOrderEmail(orderItems);
            playOrderSound();
            window.location.replace(responseStripe.data.session_url);
          } else toast.error(responseStripe.data.message);
          break;
        }

        case 'razorpay': {
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order, orderItems);
          } else toast.error(responseRazorpay.data.message);
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Failed to place order');
    }
  };

  const initPay = (order, orderItems) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (data.success) {
            await handlePostOrderEmail(orderItems);
            setCartItems({});
            playOrderSound();
            toast.success('Payment successful!');
            navigate('/orders');
          }
        } catch (error) {
          toast.error(error.message || 'Payment verification failed');
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const placeUPIOrder = async () => {
    setIsPlacingUPIOrder(true);
    try {
      const orderItems = buildOrderItems();
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
        payment_method: 'upi'
      };

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        await handlePostOrderEmail(orderItems);
        playOrderSound();
        toast.success('UPI Order Placed Successfully');
        setCartItems({});
        navigate('/orders');
      } else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error('Failed to place UPI order');
    } finally {
      setIsPlacingUPIOrder(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='container flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]' style={{ fontFamily: "ui-monospace" }}>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required name='firstName' value={formData.firstName} onChange={onChangeHandler} placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required name='lastName' value={formData.lastName} onChange={onChangeHandler} placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required name='email' value={formData.email} onChange={onChangeHandler} placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required name='street' value={formData.street} onChange={onChangeHandler} placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input required name='city' value={formData.city} onChange={onChangeHandler} placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input name='state' value={formData.state} onChange={onChangeHandler} placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler} placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required name='country' value={formData.country} onChange={onChangeHandler} placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required name='phone' value={formData.phone} onChange={onChangeHandler} placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        {method === 'upi' && (
          <div className="mt-4 text-center">
            {!upiConfirmed ? (
              <>
                <p className="text-lg font-semibold mb-2">Scan & Pay via UPI</p>
                <div style={{ background: 'white', padding: '16px', display: 'inline-block' }}>
                  <QRCode value={`upi://pay?pa=pattemanosh@ybl&pn=Epic Moments&am=${getCartAmount()}&cu=INR`} size={200} />
                </div>
                <p className="text-sm mt-2 text-gray-600">Pay ₹{getCartAmount()} to <strong>Epic Moments</strong></p>
                <div className="mt-4 flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="upiConfirm"
                    checked={upiConfirmed}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUpiConfirmed(true);
                        toast.success("Payment Confirmed. Placing Order...");
                        setTimeout(() => placeUPIOrder(), 3000);
                      } else setUpiConfirmed(false);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="upiConfirm" className="text-sm text-gray-700">I have completed the UPI payment</label>
                </div>
              </>
            ) : (
              <p className="text-green-600 font-semibold mt-4">UPI Payment Confirmed. Placing your order...</p>
            )}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className='mt-8' style={{ fontFamily: "ui-monospace" }}>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('upi')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'upi' ? 'bg-green-400' : ''}`}></p>
              <p className='text-sm text-gray-600'>UPI QR</p>
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-1 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Order Confirm after Payment</p>
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <p className='text-sm text-gray-600'>Razor Pay</p>
            </div>
          </div>

          <p className="text-red-600 text-sm mt-4 break-words">
            * After UPI payment, send the UPI Transaction ID and screenshot to WhatsApp: <strong>+91 98765 43210</strong>.
          </p>

          {method !== 'upi' && (
            <div style={{ width: "100%", textAlign: "center", margin: "2rem" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "#400c70",
                  color: "white",
                  padding: "0.75rem 4rem",
                  fontSize: "0.875rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease-in-out"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#f50202bf"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#400c70"}
              >
                PLACE ORDER
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
