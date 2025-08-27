import { useContext } from "react";
import { CardItem } from "./CardItem";
import { SearchContext } from "./SearchContext";

export const Favorites = () => {
  const { favorites, favUserIds } = useContext(SearchContext);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {favorites.map((item) => (
          <CardItem key={item.userid} item={item} favUserIds={favUserIds} />
        ))}
      </div>
    </div>
  );
};
