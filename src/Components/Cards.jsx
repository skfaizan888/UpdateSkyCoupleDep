import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { SearchContext } from "./SearchContext";
import { CardItem } from "./CardItem";

export const Cards = () => {
  const { searchTerm, selectedCity, favUserIds, currentSignid, isLoadingUser } =
    useContext(SearchContext);
  const effectRan = useRef(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const cardsPerPage = 8;

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    const fetchUsers = async () => {
      if (!currentSignid) return;
      setLoading(true);
      try {
        const res = await axios.post(
          "https://skycouple-api.vercel.app/findoppositeusers",
          { currentGender: currentSignid.gender }
        );
        setAllUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentSignid]);

  useEffect(() => {
    const filtered = allUsers.filter((user) => {
      const matchesSearch =
        !searchTerm ||
        user.fullname?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity = !selectedCity || user.city === selectedCity;

      return matchesSearch && matchesCity;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCity, allUsers]);

  const totalPages = Math.ceil(filteredUsers.length / cardsPerPage);
  const currentCards = filteredUsers.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  if (isLoadingUser || !currentSignid) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-screen ">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
          </div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">
          No users found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center pb-8">
            {currentCards.map((user) => (
              <CardItem key={user.userid} item={user} favUserIds={favUserIds} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 my-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
