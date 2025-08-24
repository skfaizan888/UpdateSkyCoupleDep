import { HiOutlineBell, HiOutlineFilter } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { CustomSearchDropdown } from "./CustomSearchDropdown ";

export const Home = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { setSearchTerm } = useContext(SearchContext);
  const [openState, setOpenState] = useState(null);
  const [isTokenPresent, setIsTokenPresent] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  const handleSearch = (e) => setSearchTerm(e.target.value);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsTokenPresent(!!token);
  }, [navigate]);

  return (
    <>
      {isTokenPresent && (
        <div className="relative w-full text-white overflow-visible">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('Public/Image/Couplehomebg.jpeg')",
              filter: "brightness(0.4)",
            }}
          />
          <div className="relative z-10 grid grid-cols-12 px-4 pt-6 pb-4 gap-4">
            <div className="col-span-10 sm:col-span-9 flex items-center gap-2">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/047/937/290/small/realistic-wedding-rings-with-flowers-element-free-png.png"
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <span onClick={()=>navigate("/")} className="text-xl sm:text-2xl font-normal cursor-pointer text-white">
                SkyCouple
              </span>
            </div>

            <div className="col-span-2 sm:col-span-3 flex justify-end text-2xl sm:text-3xl">
              <HiOutlineBell />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-200 leading-tight tracking-wide">
                Interact With Your
              </p>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 text-2xl md:text-5xl font-[Dancing Script] drop-shadow-lg">
                Happiness!
              </span>
            </div>

            {isHome && <CustomSearchDropdown handleSearch={handleSearch} />}
          </div>
        </div>
      )}
    </>
  );
};
