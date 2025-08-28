import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardItem } from "./CardItem";
import { SearchContext } from "./SearchContext";

export const Favorites = () => {
  const { favorites, favUserIds } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {favorites.map((item) => (
            <CardItem key={item.userid} item={item} favUserIds={favUserIds} />
          ))}
        </div>
      )}
    </div>
  );
};
