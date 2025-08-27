import { useState, useContext } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { SearchContext } from "./SearchContext";
import ReactDOM from "react-dom";

export const CustomSearchDropdown = ({ handleSearch }) => {
  const [mainOpen, setMainOpen] = useState(false);
  const [activeState, setActiveState] = useState("");
  const { setSelectedState, setSelectedCity } = useContext(SearchContext);

  const toggleDropdown = () => {
    setMainOpen((prev) => !prev);
    setActiveState("");
  };

  const toggleState = (state) => {
    setActiveState((prev) => (prev === state ? "" : state));
    setSelectedState(state);
  };

  const cityOptions = {
    MH: ["Nanded", "Mumbai", "Pune", "Latur"],
    TG: ["Hyderabad", "Nizamabad", "Warangal"],
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setMainOpen(false);
    setActiveState("");
  };

  return (
    <div className="col-span-12 sm:col-span-6 mt-4 pb-6">
      <div className="flex items-center gap-3 relative">
        <input
          type="text"
          placeholder="Search for partner"
          onChange={handleSearch}
          className="py-3 px-4 w-full bg-white rounded-full text-gray-700 placeholder-gray-500 text-sm sm:text-base"
        />

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="p-3 bg-white rounded-full text-gray-800"
          >
            <HiOutlineFilter className="text-xl" />
          </button>
          {mainOpen &&
            ReactDOM.createPortal(
              <div className="absolute right-4 top-[220px] sm:top-[200px] md:top-[150px] lg:top-[150px] w-44 bg-white shadow-xl rounded-xl text-black z-[9999]">
                <ul className="py-1 text-sm">
                  <li
                    onClick={() => toggleState("MH")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Maharashtra
                  </li>
                  {activeState === "MH" &&
                    cityOptions.MH.map((city) => (
                      <li
                        key={city}
                        onClick={() => handleCityClick(city)}
                        className="pl-8 pr-4 py-1 hover:bg-gray-100 cursor-pointer"
                      >
                        {city}
                      </li>
                    ))}

                  <li
                    onClick={() => toggleState("TG")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Telangana
                  </li>
                  {activeState === "TG" &&
                    cityOptions.TG.map((city) => (
                      <li
                        key={city}
                        onClick={() => handleCityClick(city)}
                        className="pl-8 pr-4 py-1 hover:bg-gray-100 cursor-pointer"
                      >
                        {city}
                      </li>
                    ))}

                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Tamilnadu
                  </li>
                </ul>
              </div>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
};
