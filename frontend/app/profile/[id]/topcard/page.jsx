"use client"

import React, { useEffect } from "react";
import { useTourStore } from "../../../../store/package"; // Adjust the import path accordingly

const TourList = () => {
  const { tours, loading, error, fetchAllTours } = useTourStore();

  // Fetch all tours when the component mounts
  useEffect(() => {
    fetchAllTours();
  }, [fetchAllTours]);

  // Display loading state
  if (loading) {
    return <div>Loading tours...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display tours
  return (
    <div>
      <h1>All Tours</h1>
      {tours.length > 0 ? (
        <ul>
          {tours.map((tour) => (
            <li key={tour._id}>
              <h2>{tour.name}</h2>
              <p>{tour.description}</p>
              <p>Price: ${tour.price}</p>
              <p>Duration: {tour.duration} days</p>
              <p>Location: {tour.location.name}</p> {/* Assuming location has a "name" field */}
              <p>Category: {tour.category.name}</p> {/* Assuming category has a "name" field */}
              <p>Company: {tour.company.name}</p> {/* Assuming company has a "name" field */}
              <img src={tour.mainImage} alt={tour.name} />
              <div>
                <h3>Gallery Images:</h3>
                {tour.galleryImages.map((image, index) => (
                  <img key={index} src={image} alt={`Gallery ${index + 1}`} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tours available.</p>
      )}
    </div>
  );
};

export default TourList;