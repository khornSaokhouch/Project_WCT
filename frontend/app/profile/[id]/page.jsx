"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";
import dynamic from "next/dynamic"; // For lazy loading
import ProfileUser from "../../../components/Profile";
import Footer from "../../../components/Footer";

// Lazy-load heavy components
const TopCard = dynamic(() => import("@/components/home/Card/TopCard"), {
  loading: () => <p>Loading Top Card...</p>,
});
const TrendingCard = dynamic(() => import("@/components/home/Card/TrendingCard"), {
  loading: () => <p>Loading Trending Card...</p>,
});
const PopularCard = dynamic(() => import("@/components/home/Card/PopularCard"), {
  loading: () => <p>Loading Popular Card...</p>,
});
const WeekendCard = dynamic(() => import("@/components/home/Card/WeekendCard"), {
  loading: () => <p>Loading Weekend Card...</p>,
});
const TraditionalCard = dynamic(() => import("@/components/home/Card/TraditionalCard"), {
  loading: () => <p>Loading Traditional Card...</p>,
});

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

  // Fetch user data
  useEffect(() => {
    if (id) {
      fetchUserById(id).catch((err) => {
        console.error("Error fetching user:", err);
      });
    }
  }, [id, fetchUserById]);

  // Fetch user image
  useEffect(() => {
    if (user?._id) {
      fetchImage(user._id).catch((err) => {
        console.error("Error fetching image:", err);
      });
    }
  }, [user, fetchImage]);

  // Display loading state
  if (isLoading) {
    return <div className="text-center py-5">Loading profile...</div>;
  }

  // Display error state
  if (error) {
    return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  }

  // Display if no user data is found
  if (!user) {
    return <div className="text-center py-5">No user data found.</div>;
  }

  return (
    <div>
      {/* Profile Section */}
      <ProfileUser id={id} />

      {/* Lazy-loaded Cards */}
      <TopCard />
      <TrendingCard />
      <PopularCard />
      <WeekendCard />
      <TraditionalCard />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;