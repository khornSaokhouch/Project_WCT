import React from 'react';
import { FaRocket, FaEye } from 'react-icons/fa'; // Importing icons

const MissionVisionSection = () => {
    return (
        <section className="py-10 px-20 text-center ">
            <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
                {/* Mission Section */}
                <div className="bg-green-200 w-full md:w-1/2 h-64 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
                    <FaRocket className="h-12 w-12 text-black mb-4" />
                    <h3 className="text-3xl font-bold text-green-800">Our Mission</h3>
                    <p className="text-gray-800 text-lg text-center">
                        To provide foundations for post-conflict Somalia's future.
                    </p>
                </div>

                {/* Vision Section */}
                <div className="bg-yellow-200 w-full md:w-1/2 h-64 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
                    <FaEye className="h-12 w-12 text-black mb-4" />
                    <h3 className="text-3xl font-bold text-yellow-800">Our Vision</h3>
                    <p className="text-gray-800 text-lg text-center">
                        To be the most respected and successfully operated company in our industry - creating value for all of our stakeholders.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MissionVisionSection;