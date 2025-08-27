import axios from "axios";
import {
  HiOutlineLocationMarker,
  HiOutlineHeart,
  HiHeart,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "./SearchContext";

export const CardItem = ({ item, favUserIds = [] }) => {
  const navigate = useNavigate();
  const { fetchFavorites } = useContext(SearchContext);

  const [isFavorited, setIsFavorited] = useState(false);
  const signid = localStorage.getItem("signid");

  useEffect(() => {
    setIsFavorited(favUserIds.includes(String(item.userid)));
  }, [favUserIds, item.userid]);

  const toggleFavorite = async () => {
    if (!signid) return alert("You must be signed in to manage favorites.");

    try {
      if (isFavorited) {
        const confirmed = window.confirm("Remove from favorites?");
        if (!confirmed) return;

        await axios.post("https://skycouple-api.vercel.app/removefavorite", {
          signid,
          favoriteUserId: item.userid,
        });
      } else {
        await axios.post("https://skycouple-api.vercel.app/addfavorite", {
          signid,
          favoriteUserId: item.userid,
        });
      }

      setIsFavorited(!isFavorited);
      await fetchFavorites(); // Refresh the list
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  const handleCardClick = () => {
    navigate("viewdetail", { state: item });
  };

  return (
    <div
      className="w-90 sm:w-64 md:w-72 h-[330px] sm:h-[370px] md:h-[400px] rounded-2xl overflow-hidden relative shadow-lg cursor-pointer group bg-white"
      onClick={handleCardClick}
    >
      <img
        src={item?.img}
        alt={item?.fullname}
        className="w-full h-full object-contain transition-transform group-hover:scale-105 duration-300"
      />

      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        className="absolute top-2 left-2 bg-black/40 backdrop-blur-xs p-2 rounded-full z-10"
      >
        {isFavorited ? (
          <HiHeart className="text-red-500 text-2xl" />
        ) : (
          <HiOutlineHeart className="text-white text-2xl" />
        )}
      </div>


      <div className="absolute bottom-0 left-0 w-full p-4 bg-black/50 text-white">
        <h3 className="text-lg font-semibold leading-tight truncate">
          {item?.fullname}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-200 mt-1 truncate">
          <HiOutlineLocationMarker className="text-base" />
          <span>
            {item?.city}, {item?.pincode}
          </span>
        </div>
        <p className="text-sm text-gray-100 mt-1 truncate">
          {item?.occupation}
        </p>
      </div>
    </div>
  );
};
