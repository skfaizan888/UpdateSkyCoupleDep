import { useContext } from "react";
import { CardItem } from "./CardItem";
import { SearchContext } from "./SearchContext";

export const Favorites = () => {
  const { favorites, favUserIds } = useContext(SearchContext);

  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {favorites.map((item) => (
        <CardItem key={item.userid} item={item} favUserIds={favUserIds} />
      ))}
    </div>
  );
};
