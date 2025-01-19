import React from 'react';

const TeamSection = () => {
  return (
    <section className="py-10 px-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">We Are the People Who Made This Website</h2>
        <p className="text-gray-600 mb-10">A Tour Guide is a professional who provides information and insights to travelers, helping them explore and understand various destinations.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img src="/image/vibol.png" alt="Sen Vibon" className="w-[250px] h-[250px] rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-semibold">Sen Vibol</h3>
            <p className="text-gray-500">Database and UI design</p>
            <p className="text-gray-400">Founding designer team at Figma. Former Pleo, Stripe, and more.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img src="/image/khouch.jpg" alt="Khan Saokouch" className="w-[250px] h-[250px] rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-semibold">Khorn Saokhouch</h3>
            <p className="text-gray-500">Database and UI design</p>
            <p className="text-gray-400">Founding designer team at Figma. Former Pleo, Stripe, and more.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img src="/image/nisa.png" alt="Sam Nisa" className="w-[250px] h-[250px] rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-semibold">Sam Nisa</h3>
            <p className="text-gray-500">Front-end and UI design</p>
            <p className="text-gray-400">Founding designer team at Figma. Former Pleo, Stripe, and more.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img src="/image/senghorng.png" alt="Kheang Seangphong" className="w-[250px] h-[250px] rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-semibold">Kheang Seanghrong</h3>
            <p className="text-gray-500">Backend and UI design</p>
            <p className="text-gray-400">Founding designer team at Figma. Former Pleo, Stripe, and more.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;