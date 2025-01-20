"use client";

import { useState, useEffect } from "react";
import ProfileUser from "../../../components/Profile";
import { useParams } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";

import TopCard from "@/components/home/Card/TopCard";
import TrendingCard from "@/components/home/Card/TrendingCard";
import PopularCard from "@/components/home/Card/PopularCard";
import WeekendCard from "@/components/home/Card/WeekendCard";
import TraditionalCard from "@/components/home/Card/TraditionalCard";
import Footer from "../../../components/Footer";

const ProfilePage = () => {
  const { id } = useParams();
  const {
    user,
    image,
    isLoading,
    error,
    fetchImage,
    fetchUserById,
  } = useAuthStore();

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

  if (isLoading) {
    return <div className="text-center py-5">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center py-5">No user data found.</div>;
  }

  return (
    <div>
      <ProfileUser id={id} />
      <TopCard />
      <TrendingCard />
      <PopularCard />
      <WeekendCard />
      <TraditionalCard />
      <Footer />
    </div>
  );
};

export default ProfilePage;