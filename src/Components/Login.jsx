import React, { useState, useEffect, useContext } from "react";
import { Button, Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";
import { SearchContext } from "./SearchContext";

export const Login = () => {
  const navigate = useNavigate();
  const { refreshUserData, setCurrentSignid } = useContext(SearchContext);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState({
    mobile: false,
    password: false,
  });

  const handleSubmit = async () => {
    setError("");
    setInputError({ mobile: false, password: false });

    const mobileRegex = /^[0-9]{10}$/;
    const mobileValid = mobileRegex.test(mobile);
    const passwordValid = !!password;

    const newErrors = {
      mobile: !mobileValid,
      password: !passwordValid,
    };
    setInputError(newErrors);

    if (!mobileValid && !passwordValid) {
      setError("Please provide a valid 10-digit mobile number and password.");
      return;
    }
    if (!mobileValid) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!passwordValid) {
      setError("Please provide a password.");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://skycouple-api.vercel.app/login",
        { mobile, password }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("signid", data.signid);
      await refreshUserData();
      setCurrentSignid(data.signid);

      navigate("/");
    } catch (e) {
      setError(e?.response?.data || "Login failed. Please try again.");
      setInputError({ mobile: true, password: true });
    }
  };

  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => {
      setError("");
      setInputError({ mobile: false, password: false });
    }, 7000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative px-4 overflow-hidden"
      style={{ backgroundImage: "url('Image/handpiclogin2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-md" />

      <div
        className="
          relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row
          items-center justify-center gap-8 sm:gap-12 
          py-10 sm:py-12 px-4
        "
      >
        <div className="text-center text-white px-4 flex-1">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/047/937/290/small/realistic-wedding-rings-with-flowers-element-free-png.png"
            alt="Wedding Rings"
            className="w-24 sm:w-36 md:w-44 lg:w-48 mx-auto mb-4"
          />

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold font-[Dancing Script] mb-3 sm:mb-4 drop-shadow-xl tracking-wide uppercase text-center">
            WELCOME
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-md mx-auto tracking-wide leading-relaxed text-center">
            Enter your mobile number and <br /> password below to get access!
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-11/12 max-w-xs sm:max-w-sm bg-white/10 shadow-2xl p-6 sm:p-8 text-white rounded-xl backdrop-blur-lg"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-[Dancing Script] mb-5 sm:mb-6 tracking-wider">
            Login
          </h2>

          <label className="block mb-1 text-sm font-medium">
            Mobile Number <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 9876543210"
            maxLength={10}
            value={mobile}
            autoComplete="tel"
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            className={`w-full px-4 py-3 rounded-lg border bg-white/20 text-white placeholder-gray-300 
              focus:outline-none focus:ring-2 focus:ring-white focus:border-white
              ${inputError.mobile ? "border-red-500" : "border-gray-400/30"}
            `}
          />

          <label className="block mb-1 text-sm font-medium mt-4">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border bg-white/20 text-white placeholder-gray-300 
                focus:outline-none focus:ring-2 focus:ring-white focus:border-white
                ${inputError.password ? "border-red-500" : "border-gray-400/30"}
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-pink-700 text-white font-semibold rounded-full shadow-md hover:bg-pink-800"
          >
            Login
          </Button>

          {!error && (
            <p className="text-center text-sm text-white mt-4">
              Don’t have an account?{" "}
              <a
                href="https://wa.me/918149888224"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-medium"
              >
                Register
              </a>
            </p>
          )}

          {error && (
            <Alert color="failure" icon={HiInformationCircle} className="mt-4">
              <span className="font-medium">{error}</span>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};
