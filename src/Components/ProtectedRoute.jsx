// ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";

export default function ProtectedRoute({ children }) {
  const { currentSignid, isLoadingUser } = useContext(SearchContext);

  if (isLoadingUser) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!currentSignid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
