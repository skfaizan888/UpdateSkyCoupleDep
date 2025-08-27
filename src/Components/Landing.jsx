// Landing.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      <Home />
      <Routes>
        {/* ✅ Home is protected and served at "/" */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Cards />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/getstart" element={<ProfileStart />} />
        <Route path="/term&condition" element={<TermsCondition />} />

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

      {/* Show BottomNav only after login */}
      <BottomNav />
    </BrowserRouter>
  );
};
