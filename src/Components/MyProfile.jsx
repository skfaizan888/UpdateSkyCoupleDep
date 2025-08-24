import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiIdentification,
} from "react-icons/hi";
import { MdAssignmentInd } from "react-icons/md";

export const MyProfile = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();

  const initials = data?.fullname
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mx-4 my-6 sm:mx-auto sm:max-w-2xl">
      <div className="flex flex-row items-center gap-4 mb-6">
        <Avatar
          rounded
          className="w-24 h-24 text-3xl font-bold bg-gray-200"
          placeholderInitials={initials || "NA"}
        />
        <div>
          <h2 className="text-xl font-semibold">{data?.fullname || "N/A"}</h2>
          <p className="text-sm text-gray-500">{data?.email || "N/A"}</p>
        </div>
      </div>

      <div className="text-gray-700 divide-y">
        <ProfileItem
          icon={<MdAssignmentInd />}
          label="Full Name"
          value={data?.fullname}
        />
        <ProfileItem
          icon={<HiOutlineMail />}
          label="Email"
          value={data?.email}
        />
        <ProfileItem
          icon={<HiOutlinePhone />}
          label="Mobile"
          value={data?.mobile || "Add number"}
        />
        <ProfileItem
          icon={<HiOutlineLocationMarker />}
          label="Location"
          value={data?.location}
        />
        <ProfileItem
          icon={<HiIdentification />}
          label="Aadhaar"
          value={data?.aadhaar}
        />
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex justify-between items-center py-4">
    <span className="flex items-center gap-2 text-base font-medium">
      {icon} {label}
    </span>
    <span className="text-base text-gray-800">{value || "N/A"}</span>
  </div>
);
