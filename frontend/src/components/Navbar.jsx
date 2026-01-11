import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets.js';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const {
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext);

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setProfileOpen(false);
  };

  /* -------- CLOSE PROFILE ON OUTSIDE CLICK -------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/collections', label: 'COLLECTION' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
    { path: '/privacypolicy', label: 'PRIVACY POLICY' },
    { path: '/termsandconditions', label: 'TERMS & CONDITIONS' }
  ];

  return (
    <header className="nav-container">
      <div className="nav-inner">

        {/* LOGO */}
        <div className="nav-logo">
          <img src={assets.logo_epicmoments} alt="Epic Moments" />
        </div>

        {/* DESKTOP MENU */}
        <nav className="nav-links-desktop">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ICONS */}
        <div className="nav-icons">

          {/* PROFILE */}
          <div className="profile-wrapper" ref={profileRef}>
            <img
              className="icon"
              src={assets.profile_icon}
              alt="Profile"
              onClick={() => {
                if (!token) {
                  navigate('/login');
                } else {
                  setProfileOpen(prev => !prev);
                }
              }}
            />

            {token && profileOpen && (
              <div className="profile-menu">
                <p onClick={() => {
                  navigate('/profile');
                  setProfileOpen(false);
                }}>
                  My Profile
                </p>

                <p onClick={() => {
                  navigate('/orders');
                  setProfileOpen(false);
                }}>
                  Orders
                </p>

                <p onClick={logout}>
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* CART */}
          <Link to="/cart" className="cart-wrapper">
            <img src={assets.cart_icon} className="icon" alt="Cart" />
            <span className="cart-count">{getCartCount()}</span>
          </Link>

          {/* MOBILE MENU ICON */}
          <img
            onClick={() => setMenuOpen(true)}
            src={assets.menu_icon}
            className="menu-icon"
            alt="Menu"
          />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div className={`mobile-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header" onClick={() => setMenuOpen(false)}>
          <img className="back-icon" src={assets.dropdown_icon} alt="Back" />
          <span>Close</span>
        </div>

        {navItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className="sidebar-link"
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
