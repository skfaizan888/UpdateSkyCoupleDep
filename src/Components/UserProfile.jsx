import React, { useContext } from "react";
import {
  HiUser,
  HiCog,
  HiBell,
  HiLogout,
  HiChevronRight,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { TbHelpCircleFilled } from "react-icons/tb";
import { CgDarkMode } from "react-icons/cg";
import { Avatar } from "flowbite-react";
import { FaFileContract } from "react-icons/fa";
import { MyProfile } from "./MyProfile";
import { SearchContext } from "./SearchContext";

export const UserProfile = () => {
  const { currentSignid } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("signid");
    navigate("/login");
  };

  
  const user = currentSignid;

  return (
    <div className="flex flex-col lg:flex-row px-4 py-8 gap-6">
      <div className="max-w-screen lg:w-[320px] flex-shrink-0 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center mb-6">
            {user && (
              <>
                <Avatar
                  rounded
                  placeholderInitials={user.fullname
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                  className="w-20 h-20 rounded-full mx-auto text-xl font-bold"
                />
                <h2 className="text-lg font-semibold mt-2">{user.fullname}</h2>
                <p className="text-sm text-gray-500">
                  {user.email || "yourname@gmail.com"}
                </p>
              </>
            )}
          </div>

          <div className="space-y-3">
            <div
              onClick={() => navigate("/myprofile", { state: user })}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <HiUser /> My Profile
              </span>
              <HiChevronRight className="text-gray-400" />
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span className="flex items-center gap-2">
                <HiCog /> Settings
              </span>
              <HiChevronRight className="text-gray-400" />
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span className="flex items-center gap-2">
                <HiBell /> Notification
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                Allow <HiChevronRight className="text-gray-400" />
              </span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span className="flex items-center gap-2">
                <CgDarkMode /> Theme
              </span>
              <HiChevronRight className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-5">
          <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
            <span className="flex items-center gap-2">
              <TbHelpCircleFilled /> Help & Support
            </span>
            <HiChevronRight className="text-gray-400" />
          </div>
          <div
            onClick={() => navigate("/term&condition")}
            className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FaFileContract /> Terms & Conditions
            </span>
            <HiChevronRight className="text-gray-400" />
          </div>
          <div
            onClick={handleSignout}
            className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <HiLogout /> Log Out
            </span>
            <HiChevronRight className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="hidden lg:block flex-grow">
        <MyProfile />
      </div>
    </div>
  );
};
