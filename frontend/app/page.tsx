"use client";

import { useEffect } from "react";
import Footer from "../components/Footer";
import ProfileUser from "../components/Profile";
import Service from "../components/home/Card/Service";
import TopCard from "../components/home/Card/TopCard";
import PopularCard from "../components/home/Card/PopularCard";
import WeekendCard from "../components/home/Card/WeekendCard";
import TraditionalCard from "@/components/home/Card/TraditionalCard"; // Correct import
import TrendingCard from "@/components/home/Card/TrendingCard";
import { useAuthStore } from "../store/authStore";
import { useParams } from "next/navigation";

export default function Home() {
  const { id } = useParams();
  const { user, isLoading, error, fetchImage, fetchUserById } = useAuthStore();

  // Ensure `id` is a string
  const userId = Array.isArray(id) ? id[0] : id || "";

  useEffect(() => {
    if (userId) {
      fetchUserById(userId).catch(() =>
        console.error("Error in fetchUserById:")
      );
    }
  }, [userId, fetchUserById]);

  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch(() => console.error("Error in fetchImage:"));
    }
  }, [user, fetchImage]);

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <ProfileUser id={userId} />
      <TopCard />
      <TrendingCard />
      <PopularCard />
      <WeekendCard />
      <TraditionalCard /> {/* Fixed typo */}
      <Service />
      <Footer />
    </div>
  );
}
