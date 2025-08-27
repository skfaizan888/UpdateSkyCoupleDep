// Landing.jsx
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Cards } from "./Cards";
import { Login } from "./Login";
import { Viewcards } from "./Viewcards";
import { Favorites } from "./Favorites";
import { ProfileStart } from "./ProfileStart";
import BottomNav from "./BottomNav";
import { Home } from "./Home";
import { UserProfile } from "./UserProfile";
import { MyProfile } from "./MyProfile";
import { TermsCondition } from "./TermCondition";
import ProtectedRoute from "./ProtectedRoute.jsx";

export const Landing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/getstart" element={<ProfileStart />} />
        <Route path="/term&condition" element={<TermsCondition />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cards"
          element={
            <ProtectedRoute>
              <Cards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewdetail"
          element={
            <ProtectedRoute>
              <Viewcards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorate"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* bottom nav can be made conditional if you don’t want it on login */}
      <BottomNav />
    </BrowserRouter>
  );
};
