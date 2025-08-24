import { HiOutlineBell, HiOutlineFilter } from "react-icons/hi";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";

export const Home = () => {
  const { setSearchTerm, setSelectedState, setSelectedCity } =
    useContext(SearchContext);

  const [isTokenPresent, setIsTokenPresent] = useState(
    !!localStorage.getItem("token")
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [selectedState, setSelectedStateLocal] = useState("");
  const [selectedCity, setSelectedCityLocal] = useState("");

  const navigate = useNavigate();

  const filters = {
    Maharashtra: ["Nanded", "Mumbai", "Pune"],
    Telangana: ["Hyderabad", "Nizamabad", "Warangal"],
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsTokenPresent(!!token);
  }, [navigate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterSelect = (state, city) => {
    setSelectedState(state);
    setSelectedCity(city);
    setSelectedStateLocal(state);
    setSelectedCityLocal(city);
    setOpen(false);
  };

  return (
    <>
      {isTokenPresent && (
        <div className="relative w-full text-white overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/12200847/pexels-photo-12200847.jpeg')",
              filter: "brightness(0.4)",
            }}
          />

          {/* Foreground */}
          <div className="relative z-10 grid grid-cols-12 px-4 pt-6 pb-4 gap-4">
            {/* Header */}
            <div className="col-span-10 sm:col-span-9 flex items-center gap-2">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/047/937/290/small/realistic-wedding-rings-with-flowers-element-free-png.png"
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <span className="text-xl sm:text-2xl font-normal text-white">
                SkyCouple
              </span>
            </div>
            <div className="col-span-2 sm:col-span-3 flex justify-end text-2xl sm:text-3xl">
              <HiOutlineBell />
            </div>

            {/* Welcome */}
            <div className="col-span-12 sm:col-span-6 sm:items-end gap-1 sm:gap-4">
              <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-200 leading-tight tracking-wide">
                Interact With Your
              </p>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 text-2xl sm:text-2xl md:text-5xl lg:text-5xl font-[Dancing Script] drop-shadow-lg">
                Happiness!
              </span>
            </div>

            {/* Search & Filter */}
            <div className="col-span-12 sm:col-span-6 mt-4">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-10">
                  <input
                    type="text"
                    placeholder="Search for partner"
                    onChange={handleSearch}
                    className="py-3 flex-1 w-full bg-white rounded-full text-gray-700 placeholder-gray-500 text-sm sm:text-base px-4"
                  />
                </div>
                <div className="col-span-2">
                  <button
                    onClick={() => setOpen(!open)}
                    className="bg-white rounded-full p-3 shadow-lg w-full"
                  >
                    <HiOutlineFilter className="text-gray-700 text-xl mx-auto" />
                  </button>
                </div>
              </div>

              {open && (
                <div className="relative mt-4 bg-white rounded-lg shadow-lg z-50 w-full">
                  <ul className="text-sm text-gray-800 py-2">
                    {Object.entries(filters).map(([state, cities]) => (
                      <li key={state} className="relative">
                        <button
                          onClick={() =>
                            setActive(active === state ? null : state)
                          }
                          className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                        >
                          <span>{state}</span>
                          {active === state ? (
                            <ChevronDownIcon className="w-4 h-4" />
                          ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                          )}
                        </button>

                        {active === state && (
                          <ul className="ml-4 mt-1">
                            {cities.map((city) => (
                              <li
                                key={city}
                                className="px-3 py-1 rounded hover:bg-black hover:text-white cursor-pointer text-gray-700"
                                onClick={() => handleFilterSelect(state, city)}
                              >
                                {city}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Selected Filter Display */}
              {selectedState && selectedCity && (
                <p className="mt-2 text-sm text-white">
                  Selected:{" "}
                  <span className="font-semibold">
                    {selectedCity}, {selectedState}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
