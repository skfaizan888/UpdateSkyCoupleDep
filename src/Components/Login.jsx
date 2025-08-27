import React, { useState, useEffect, useContext } from "react";
import { Alert, TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";
import { SearchContext } from "./SearchContext";

export const Login = () => {
  const navigate = useNavigate();
  const { refreshUserData } = useContext(SearchContext);

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
        {
          mobile,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("signid", data.signid);
      await refreshUserData();
      navigate("/profile");
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
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('Image/handpiclogin2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-md" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 py-12 px-4">
        <div className="text-center text-white px-4 flex-1">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/047/937/290/small/realistic-wedding-rings-with-flowers-element-free-png.png"
            alt="Wedding Rings"
            className="w-36 sm:w-40 md:w-44 lg:w-48 mx-auto"
          />

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-extrabold font-[Dancing Script] mb-4 drop-shadow-xl tracking-wide uppercase text-center">
            WELCOME
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-md mx-auto tracking-wide leading-relaxed text-center">
            Enter your mobile number and <br /> password below to get access!
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full max-w-sm bg-white/10 shadow-2xl p-8 text-white rounded-xl"
        >
          <h2 className="text-4xl font-bold text-center font-[Dancing Script] mb-6 tracking-wider">
            Login
          </h2>

          <label className="block mb-1 text-sm font-medium">
            Mobile Number <span className="text-red-400">*</span>
          </label>
          <TextInput
            type="text"
            placeholder="e.g. 9876543210"
            maxLength={10}
            value={mobile}
            autoComplete="tel"
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            color={inputError.mobile ? "failure" : undefined}
            className="mb-4"
          />

          <label className="block mb-1 text-sm font-medium">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="relative mb-4">
            <TextInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              color={inputError.password ? "failure" : undefined}
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
            className="w-full bg-pink-700 text-white font-semibold rounded-full shadow-md"
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
