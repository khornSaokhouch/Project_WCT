// ProfilePage Component
"use client";

import { useState, useEffect } from "react";
import ProfileUser from "../../../components/Profile";
import { useParams } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";
// import Service from "../services/components/Service";
import Services from "@/app/ServiceS/components/Service";

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
    fetchCompanyById,
    fetchUserById,
  } = useAuthStore();

  useEffect(() => {
    fetchUserById(id).catch((err) =>
      console.error("Error in fetchCompanyById:", err)
    );
  }, [id, fetchUserById]);

  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch((err) =>
        console.error("Error in fetchImage:", err)
      );
    }
  }, [user, fetchImage]);

  return (
    <div>
      <ProfileUser id={id} />
      <TopCard />
      <TrendingCard />
      <PopularCard />
      <WeekendCard />
      <TraditionalCard />
      <Services />
      <Footer />
    </div>
  );
};

export default ProfilePage;
