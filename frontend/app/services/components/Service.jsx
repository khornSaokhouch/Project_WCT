import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

const Services = () => {
    const serviceData = [
        {
            icon: '📚',
            title: 'Local Culture',
            description: 'Built Wicket longer admire do barton vanity itself do it.',
            link: '/services/local-culture', // Add a link for navigation
        },
        {
            icon: '✈️',
            title: 'Local Historical Sites',
            description: 'Engrossed listening, Park gate sell they west hard for the.',
            link: '/services/historical-sites', // Add a link for navigation
        },
        {
            icon: '🎤',
            title: 'Local Events',
            description: 'Barton vanity itself do it. Preferred to men it engrossed listening.',
            link: '/services/local-events', // Add a link for navigation
        },
    ];

    return (
        <div className="px-10 bg-white py-5">
            <h1 className="text-4xl font-bold text-center mb-6">We Offer Best Services</h1>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
                {serviceData.map((service, index) => (
                    <Link key={index} href={service.link} passHref>
                        <div
                            className="border rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                            style={{
                                width: '300px',
                                height: '230px',
                                textDecoration: 'none',
                                color: 'inherit',
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
