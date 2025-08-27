import { useContext } from "react";
import { CardItem } from "./CardItem";
import { SearchContext } from "./SearchContext";

export const Favorites = () => {
  const { favorites, favUserIds } = useContext(SearchContext);

  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center sm:justify-items-start">
        {favorites.map((item) => (
          <div key={item.userid} className="w-full sm:w-auto max-w-[300px]">
            <CardItem item={item} favUserIds={favUserIds} />
          </div>
        ))}
      </div>
    </div>
  );
};
