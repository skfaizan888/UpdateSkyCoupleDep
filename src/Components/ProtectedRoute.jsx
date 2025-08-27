import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";

export default function ProtectedRoute({ children }) {
  const { currentSignid, isLoadingUser } = useContext(SearchContext);
  const token = localStorage.getItem("token");

  if (isLoadingUser) {
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

  if (!currentSignid && !token) {
    return <Navigate to="/getstart" replace />;
  }

  return children;
}
