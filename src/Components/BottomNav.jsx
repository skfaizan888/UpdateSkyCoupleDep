import { useEffect, useState } from "react";
import { FiHome, FiHeart, FiMessageCircle, FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const [isTokenPresent, setIsTokenPresent] = useState(
    !!localStorage.getItem("token")
  );
  const { pathname } = useLocation();

  const navItems = [
    { icon: <FiHome />, path: "/" },
    { icon: <FiHeart />, path: "/favorate" },
    { icon: <FiMessageCircle /> },
    { icon: <FiUser />, path: "/profile" },
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsTokenPresent(!!token);
  }, [navigate]);

  return (
    <>
      {isTokenPresent && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md lg:max-w-lg xl:max-w-xl bg-white shadow-lg rounded-full px-6 py-3 flex justify-between items-center z-50">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <Link to={item.path} key={index}>
                <div
                  className={`p-2 rounded-full text-xl ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition duration-200`}
                >
                  {item.icon}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default BottomNav;
