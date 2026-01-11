import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";
import { assets } from "../assets/assets";
import Login_pic from "../assets/Login_pic.png";
import { getFCMToken } from "../utils/firebase";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔔 Save FCM token after login
  const saveFCM = async (authToken) => {
    try {
      const fcmToken = await getFCMToken();
      if (!fcmToken) return;
      await axios.post(
        `${backendUrl}/api/user/save-fcm`,
        { token: fcmToken },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
    } catch (err) {
      console.log("FCM save failed", err);
    }
  };

  // 🔑 Email login/signup
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        mode === "signup"
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`;

      const payload =
        mode === "signup"
          ? { name, email, password }
          : { email, password };

      const res = await axios.post(url, payload);

      if (res.data.success) {
        setToken(res.data.token); // update ShopContext
        localStorage.setItem("token", res.data.token); // optional fallback
        await saveFCM(res.data.token);
        toast.success("Welcome to Epic Moments 🎁");
        navigate("/"); // redirect after login/signup
      } else {
        toast.error(res.data.message || "Authentication failed");
      }
    } catch (err) {
      toast.error("Authentication failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="login-overlay">
      <div className="login-container">
        {/* LEFT PROMO */}
        <div className="login-left">
          <img src={assets.logo_epicmoments} alt="Brand" className="brand-logo" />
          <h1>Welcome to <span>Epic Moments</span></h1>
          <h3>The Smartest Gift Marketplace</h3>
          <p>One-stop destination for premium customized gifts. We ensure quality, fast delivery & unforgettable moments.</p>
          <div className="social-proof">
            <div className="avatars">
              <img src={assets.its_me} alt="" />
              <img src={assets.siddu} alt="" />
              <img src={assets.rahul} alt="" />
              <img src={assets.niranjan} alt="" />
            </div>
            <span>20k+ happy customers already joined</span>
          </div>
          <img src={Login_pic} alt="shopping" className="login-illustration" />
        </div>

        {/* RIGHT FORM */}
        <div className="login-right">
          <h2>{mode === "login" ? "Log in" : "Create Account"}</h2>
          <form onSubmit={submitHandler} className="login-form">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="form-row">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <span className="link">Forgot Password?</span>
            </div>
            <button disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Log in" : "Sign up"}
            </button>
          </form>

          <p className="switch-auth">
            {mode === "login" ? (
              <>
                New to Epic Moments?
                <span onClick={() => setMode("signup")}> Sign up free</span>
              </>
            ) : (
              <>
                Already have an account?
                <span onClick={() => setMode("login")}> Log in</span>
              </>
            )}
          </p>

          <p className="help">
            Need Help? <span>Live Chat</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
