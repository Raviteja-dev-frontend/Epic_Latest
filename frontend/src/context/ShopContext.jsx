import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [token, setToken] = useState("");
  const [slides, setSlides] = useState([]);
  const [catagere, setCatagere] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [deskDecoratives, setDeskDecorative] = useState([]);
  const [wallDecoratives, setWallDecoratives] = useState([]);
  const [carDecoratives, setCarDecoratives] = useState([]);
  const [businessNeeds, setBusinessNeeds] = useState([]);
  const [googleReviews, setGoogleReviews] = useState([]);

  const navigate = useNavigate();

  // 🔁 Generic fetch function
  const fetchData = async (url, setter, key = null) => {
    try {
      const res = await axios.get(url);
      if (res.data.success) {
        const dataArray = key ? res.data[key] : res.data.products || res.data.slides || res.data.data || [];
        if (Array.isArray(dataArray)) setter([...dataArray].reverse());
        else setter([]);
      } else {
        setter([]);
      }
    } catch (err) {
      console.error(err);
      setter([]);
    }
  };

  // 🛒 Cart Functions
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Select Product Size");
    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  const getCartCount = () => Object.values(cartItems).reduce((acc, sizes) => {
    return acc + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
  }, 0);

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find(p => p._id === itemId);
      if (!itemInfo) continue;
      for (const size in cartItems[itemId]) {
        totalAmount += itemInfo.price * cartItems[itemId][size];
      }
    }
    return totalAmount;
  };

  const getUserCart = async (userToken) => {
    try {
      const res = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { Authorization: `Bearer ${userToken}` } });
      if (res.data.success) setCartItems(res.data.cartData);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // 🔁 Fetch all data on mount
  useEffect(() => {
    fetchData(`${backendUrl}/api/product/list`, setProducts);
    fetchData(`${backendUrl}/api/slides/list`, setSlides);
    fetchData(`${backendUrl}/api/catagere/list`, setCatagere);
    fetchData(`${backendUrl}/api/keyword`, setKeywords);
    fetchData(`${backendUrl}/api/popular/list`, setPopularProducts, "popularProducts"); // ✅ key specified
    fetchData(`${backendUrl}/api/offer/list`, setOfferProducts);
    fetchData(`${backendUrl}/api/deskdecoratives/list`, setDeskDecorative);
    fetchData(`${backendUrl}/api/walldecoratives/list`, setWallDecoratives);
    fetchData(`${backendUrl}/api/cardecoratives/list`, setCarDecoratives);
    fetchData(`${backendUrl}/api/businessneeds/list`, setBusinessNeeds);
    fetchData(`${backendUrl}/api/googlereviews/list`, setGoogleReviews);
  }, []);

  // 🔁 Token-based cart fetch
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        slides,
        catagere,
        keywords,
        popularProducts,
        offerProducts,
        deskDecoratives,
        wallDecoratives,
        carDecoratives,
        businessNeeds,
        googleReviews,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
