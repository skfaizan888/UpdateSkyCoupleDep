import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomCarousel from "./CustomCarousel ";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {
  FaMapMarkedAlt,
  FaBirthdayCake,
  FaUserTie,
  FaBuilding,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

export const Viewcards = () => {
  const navigate = useNavigate();
  const { state: item } = useLocation();

  const handleInterested = () => {
    if (window.confirm("Are you sure you're interested?")) {
      alert("Interest confirmed!");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-gray-100 to-blue-50 py-4 px-3 sm:px-6 font-poppins">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="relative w-full h-[470px] sm:h-[500px] lg:h-full rounded-2xl overflow-hidden shadow-lg">
          <CustomCarousel
            images={[{ img: item.img, gender: item.gender || "male" }]}
            interval={7000}
          />

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent z-10" />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
            <button
              onClick={handleInterested}
              className="flex items-center gap-2 bg-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <IoChatbubbleEllipsesOutline className="h-5 w-5" />
              Chat
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-24">
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-pink-700">
              {item.fullname}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-gray-800 text-sm sm:text-base mb-5">
            <div className="space-y-2">
              <p>
                <FaUserTie className="inline mr-2 text-pink-700" />
                <strong>Surname:</strong> {item.surname}
              </p>
              <p>
                <FaBirthdayCake className="inline mr-2 text-pink-700" />
                <strong>DOB:</strong> {item.dob}
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <FaBuilding className="inline mr-2 text-pink-700" />
                <strong>Occupation:</strong> {item.occupation}
              </p>
              <p>
                <FaBuilding className="inline mr-2 text-pink-700" />
                <strong>Company:</strong> {item.occupationcomname}
              </p>
              <p>
                <FaMoneyBillWave className="inline mr-2 text-pink-700" />
                <strong>Salary:</strong> ₹{item.salary} / month
              </p>
            </div>
          </div>

          <div className="bg-pink-50 border border-pink-200 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2">
              <FaUsers className="text-pink-700" /> Family Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-800">
              <div>
                <p>
                  <strong>Father's Name:</strong> {item.fathername}
                </p>
                <p>
                  <strong>Occupation:</strong> {item.occupationfather}
                </p>
              </div>
              <div>
                <p>
                  <strong>Mother's Name:</strong> {item.mothername}
                </p>
                <p>
                  <strong>Occupation:</strong> {item.occupationmother}
                </p>
              </div>
              <div className="sm:col-span-2 space-y-2">
                <div className="flex flex-col sm:flex-row sm:gap-10">
                  <p>
                    <strong>Brothers:</strong> {item.brother}
                  </p>
                  <p>
                    <strong>Sisters:</strong> {item.sister}
                  </p>
                </div>
                <p>
                  <FaMapMarkedAlt className="inline mr-2 text-pink-700" />
                  <strong>Location:</strong>{" "}
                  {`${item.address}, ${item.city} - ${item.pincode}, ${item.state}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
