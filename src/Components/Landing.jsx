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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/getstart" element={<ProfileStart />} />
        <Route path="/term&condition" element={<TermsCondition />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Cards />} />
          <Route path="viewdetail" element={<Viewcards />} />
          <Route path="/favorate" element={<Favorites />}>
            <Route path="viewdetail" element={<Viewcards />} />
          </Route>

          <Route path="profile" element={<UserProfile />} />

          <Route path="myprofile" element={<MyProfile />} />
        </Route>
      </Routes>

      <BottomNav />
    </BrowserRouter>
  );
};
