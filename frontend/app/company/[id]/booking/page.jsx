"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useBookingStore } from "../../../../store/bookingStore";

const GuestTable = () => {
  const { id } = useParams(); // Company ID (if needed)
  const { bookings, loading, error, fetchBookings } = useBookingStore(); // Zustand store
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch bookings on component load
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Filter bookings by search term
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.name && booking.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (booking) => {
    console.log("Editing booking:", booking);
  };

  const handleDelete = (booking) => {
    console.log("Deleting booking:", booking);
  };

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Guests</h1>
        <div className="relative flex-grow max-w-lg">
          <input
            type="text"
            placeholder="Search by name or ID"
            className="border border-gray-300 rounded p-2 pl-10 w-full h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </span>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Guest Name</th>
            <th className="py-3 px-6 text-left">Package Name</th>
            <th className="py-3 px-6 text-left">Members</th>
            <th className="py-3 px-6 text-left">Date Order</th>
            <th className="py-3 px-6 text-left">Time</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredBookings.map((booking, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 font-bold text-left">{booking.name}</td>
              <td className="py-3 px-6 text-left">{booking.package}</td>
              <td className="py-3 px-6 text-left">{booking.members}</td>
              <td className="py-3 px-6 text-left">{booking.date}</td>
              <td className="py-3 px-6 text-left">{booking.time}</td>
              <td className="py-3 px-6 text-left">
                <span
                  className={`px-3 py-2 rounded-sm text-xs font-semibold ${
                    booking.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(booking)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(booking)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestTable;
