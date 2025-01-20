"use client";

import ProfileUser from "../../../../components/Profile";
import Footer from "../../../../components/Footer";
import WhyChooseUs from "./components/WhyChooseUs";
import FeatureNewsCard from "./components/card/FeatureNewsCard";
import Services from "@/components/home/Card/Service";

export default function ServicesPage() {
  return (
    <div>
      <ProfileUser />
      <Services />
      <FeatureNewsCard />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
