// SearchContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favUserIds, setFavUserIds] = useState([]);
  const [currentSignid, setCurrentSignid] = useState(null);
  const [signid, setSignid] = useState(localStorage.getItem("signid"));
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedSignid = localStorage.getItem("signid");
      if (storedSignid !== signid) {
        setSignid(storedSignid);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [signid]);

  const fetchCurrentSignId = async () => {
    setIsLoadingUser(true);
    try {
      const res = await axios.post("https://skycouple-api.vercel.app/findsign", { signid });
      if (Array.isArray(res.data) && res.data.length > 0) {
        setCurrentSignid(res.data[0]);
      } else {
        setCurrentSignid(null);
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
      setCurrentSignid(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.post("https://skycouple-api.vercel.app/getfavorites", { signid });
      if (Array.isArray(res.data)) {
        setFavorites(res.data);
        setFavUserIds(res.data.map((f) => String(f.userid)));
      } else {
        setFavorites([]);
        setFavUserIds([]);
      }
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setFavorites([]);
      setFavUserIds([]);
    }
  };

  const refreshUserData = async () => {
    if (signid) {
      await fetchCurrentSignId();
      await fetchFavorites();
    }
  };

  useEffect(() => {
    if (signid) {
      fetchCurrentSignId();
      fetchFavorites();
    } else {
      setCurrentSignid(null);
      setFavorites([]);
      setFavUserIds([]);
      setIsLoadingUser(false);
    }
  }, [signid]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedState,
        setSelectedState,
        selectedCity,
        setSelectedCity,
        favorites,
        favUserIds,
        currentSignid,
        isLoadingUser,
        fetchFavorites,
        setSignid,
        refreshUserData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
