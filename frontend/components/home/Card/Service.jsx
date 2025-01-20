"use client"; // Required for Next.js to use client-side features like useState and useEffect

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Services = () => {
  // State to store the service data fetched from the API
  const [serviceData, setServiceData] = useState([]);

  // Fetch data from the JSON Server API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://bookingtour-psi.vercel.app/services"); // Replace with your JSON Server endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setServiceData(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="px-10 bg-white py-5">
      <h1 className="text-4xl font-bold text-center mb-6">We Offer Best Services</h1>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
        {serviceData.map((service, index) => (
          <Link key={index} href={service.link} passHref>
            <div
              className="border rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              style={{
                width: "300px",
                height: "230px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="text-6xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="text-gray-600 text-lg">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;