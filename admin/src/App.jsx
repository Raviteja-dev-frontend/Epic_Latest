import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";

import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import SlidesList from "./pages/SlidesList";
import SlidesAdding from "./pages/SlidesAdding";
import CatagereList from "./pages/CatagereList";
import Catagere from "./pages/Catagere";
import ManageCategory from "./pages/ManageCategory";
import EnquiryList from "./pages/EnquiryList";
import KeywordManager from "./components/KeywordManager";

import PopularProducts from "./pages/PopularProducts";
import PopularProductsList from "./pages/PopularProductsList";
import OfferProducts from "./pages/OfferProducts";
import OfferProductsList from "./pages/OfferProductsList";
import DeskDecoratives from "./pages/DeskDecoratives";
import DeskDecorativesList from "./pages/DeskDecorativesList";
import WallDecoratives from "./pages/WallDecoratives";
import WallDecorativesList from "./pages/WallDecorativesList";
import CarDecoratives from "./pages/CarDecoratives";
import CarDecorativesList from "./pages/CarDecorativesList";
import BusinessNeeds from "./pages/BusinessNeeds";
import BusinessNeedsList from "./pages/BusinessNeedsList";
import GoogleReviewAdd from "./pages/GoogleReviewAdd";
import GoogleReviewList from "./pages/GoogleReviewList";

import "./admin_app.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/orders") {
      setNewOrdersCount(0);
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  if (!token) {
    return (
      <>
        <ToastContainer />
        <Login setToken={setToken} />
      </>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <Navbar setToken={setToken} newOrdersCount={newOrdersCount} />
      <hr />

      <div className="flex w-full admin_app">
        <Sidebar />
        <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
          <Routes>
            {/* ✅ DEFAULT ROUTE */}
            <Route path="/" element={<Navigate to="/list" />} />

            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders setNewOrdersCount={setNewOrdersCount} />} />

            <Route path="/SlidesList" element={<SlidesList />} />
            <Route path="/SlidesAdding" element={<SlidesAdding />} />

            <Route path="/catagereList" element={<CatagereList />} />
            <Route path="/catagereAdd" element={<Catagere />} />
            <Route path="/manageCategory" element={<ManageCategory />} />

            <Route path="/enquiries" element={<EnquiryList />} />
            <Route path="/admin/keywords" element={<KeywordManager />} />

            <Route path="/PopularProducts" element={<PopularProducts />} />
            <Route path="/PopularProductsList" element={<PopularProductsList />} />

            <Route path="/OfferProducts" element={<OfferProducts />} />
            <Route path="/OfferProductsList" element={<OfferProductsList />} />

            <Route path="/DeskDecoratives" element={<DeskDecoratives />} />
            <Route path="/DeskDecorativesList" element={<DeskDecorativesList />} />

            <Route path="/WallDecoratives" element={<WallDecoratives />} />
            <Route path="/WallDecorativesList" element={<WallDecorativesList />} />

            <Route path="/CarDecoratives" element={<CarDecoratives />} />
            <Route path="/CarDecorativesList" element={<CarDecorativesList />} />

            <Route path="/BusinessNeeds" element={<BusinessNeeds />} />
            <Route path="/BusinessNeedsList" element={<BusinessNeedsList />} />

            <Route path="/GoogleReviewAdd" element={<GoogleReviewAdd />} />
            <Route path="/GoogleReviewList" element={<GoogleReviewList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
