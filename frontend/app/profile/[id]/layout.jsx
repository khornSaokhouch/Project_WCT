"use client";

import { useState, useEffect } from "react";
import ProfileUser from "../../../components/Profile";
import { useParams } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";


import Footer from "../../../components/Footer";

const ProfilePage = ({ children }) => {
  const { id } = useParams();
  const { user, image, isLoading, error, fetchImage, fetchUserById } =
    useAuthStore();

  useEffect(() => {
    if (id) {
      fetchUserById(id).catch((err) => {
        console.error("Error fetching user:", err);
      });
    }
  }, [id, fetchUserById]);

  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch((err) => {
        console.error("Error fetching image:", err);
      });
    }
  }, [user, fetchImage]);

  // if (isLoading) {
  //   return <div className="text-center py-5">Loading profile...</div>;
  // }

  // if (error) {
  //   return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  // }

  // if (!user) {
  //   return <div className="text-center py-5">No user data found.</div>;
  // }

  return (
    <div>
      <ProfileUser />
        <main className="flex-1 p-4 md:p-8">{children}</main>
   
      <Footer />
    </div>
  );
};

export default ProfilePage;
