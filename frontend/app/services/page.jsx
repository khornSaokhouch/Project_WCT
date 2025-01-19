"use client";

import ProfileUser from "../../components/Profile";
import Footer from "../../components/Footer";
import Service from "@/components/Service";
import WhyChooseUs from "./components/WhyChooseUs";
import FeatureNewsCard from "./components/card/FeatureNewsCard";

export default function ServicesPage() {
  return (
    <div>
      <ProfileUser />
      <Service />
      <FeatureNewsCard />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
