import React from "react";

const TourLocations = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-8 md:p-12 bg-white">
      {/* Image Section */}
      <div className="grid grid-cols-2 gap-4 w-full md:w-1/2 mb-8 md:mb-0">
        <img
          src="https://images.ctfassets.net/i3kf1olze1gn/3pFHM6fHHgCqqMBjMmDpPc/05dc4091da335778e3586f516e6c49f9/relaxing_beach_hero.jpg"
          alt="Location 1"
          className="w-full h-48 md:h-64 object-cover rounded-lg"
        />
        <img
          src="https://www.tricitymed.org/wp-content/uploads/2017/12/shutterstock_495636001.jpg"
          alt="Location 2"
          className="w-full h-48 md:h-64 object-cover rounded-lg mt-7"
        />
        <img
          src="https://img.jakpost.net/c/2017/08/31/2017_08_31_31849_1504162869._large.jpg"
          alt="Location 3"
          className="w-full h-48 md:h-64 object-cover rounded-lg"
        />
        <img
          src="https://www.learnersandmakers.com/wp-content/uploads/2023/01/Angkor-with-kids-travel-guide-hero.jpg"
          alt="Location 4"
          className="w-full h-48 md:h-64 object-cover rounded-lg mt-7"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-center md:items-start md:ml-8 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
          We offer tours in a range of locations
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-black">
          the most popular for you guys! 
        </p>
        <div className="flex mt-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7750/7750718.png"
            alt="Airplane Icon"
            className="w-16 h-16 md:w-20 md:h-20 mr-2"
          />
          <img 
            src="https://cdn-icons-png.flaticon.com/512/7893/7893979.png"
            alt="Airplane Icon"
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </div>
      </div>
    </section>
  );
};

export default TourLocations;
