import React, { useState, useEffect } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Navigate = () => {
  const [data, setData] = useState([]);
  const [isTokenPresent, setIsTokenPresent] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("signid");
    navigate("/getstart");
  };
  const signid = localStorage.getItem("signid");

  const gethandleCart = async () => {
    const payload = {
      signid,
    };
    const result = await axios.post("https://skycouple-api.vercel.app/findsign", payload);
    setData(result.data.map((item) => item.fullname));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsTokenPresent(!!token);
    gethandleCart();

    // if (!token) {
    //   navigate("/getstart");
    // }
  }, [navigate]);

  return (
    <div>
      {isTokenPresent && (
        <Navbar fluid rounded className="bg-gray-400">
          <NavbarBrand onClick={() => navigate("/")}>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/047/937/291/small_2x/realistic-wedding-rings-with-flowers-asset-free-png.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-amber-50">
              SkyCouple
            </span>
          </NavbarBrand>
          <div className="flex items-center gap-3 md:order-2">
            <div className="text-right">
              <span className="block text-sm text-gray-700">Welcome</span>
              <span className="block text-sm font-medium text-gray-900 truncate">
                {data}
              </span>
            </div>

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  status="online"
                  rounded
                />
              }
            >
              <DropdownHeader></DropdownHeader>
              <DropdownItem onClick={() => navigate("interestedList")}>
                Interested List
              </DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
            </Dropdown>

            <NavbarToggle />
          </div>
        </Navbar>
      )}
      <a
        href="tel:8149888224"
        className="fixed bottom-6 right-6 z-50 bg-pink-700 text-white font-semibold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-500 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
            clipRule="evenodd"
          />
        </svg>{" "}
        Help Line
      </a>
    </div>
  );
};
