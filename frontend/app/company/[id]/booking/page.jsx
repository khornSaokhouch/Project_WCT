"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useBookingStore } from "../../../../store/bookingStore";

const GuestTable = () => {
  const { id } = useParams(); // Get company ID from the URL
  const { bookings, loading, error, fetchBookingsBySubadmin } =
    useBookingStore();

  const [searchTerm, setSearchTerm] = useState("");

  // Memoize the fetch function to avoid unnecessary re-renders
  useEffect(() => {
    if (id) {
      fetchBookingsBySubadmin(id);
    }
  }, [id, fetchBookingsBySubadmin]);

  if (bookings.length === 0 && !loading) {
    return <p className="p-6">No policies found for this subadmin.</p>;
  }

  // Fetch bookings when the component mounts or the ID changes

  // Filter bookings based on the search term

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

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: No user {error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Package</th>
              <th className="py-3 px-6 text-left">Members</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Time</th>
              <th className="py-3 px-6 text-left">Price Tour</th>
              <th className="py-3 px-6 text-left">StartDate</th>
              <th className="py-3 px-6 text-left">EndDate</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr
                  key={booking._id || index} // Use booking._id if available, otherwise fallback to index
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 font-bold text-left">
                    {booking.user?.name}
                  </td>
                  <td className="py-3 px-6 text-left">{booking.tour?.name}</td>
                  <td className="py-3 px-6 text-left">
                    {booking.members || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(booking.dateOrder).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {booking.time || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {booking.tour?.price}$
                  </td>
                  <td className="py-3 px-6 text-left">
                    {booking.tour?.startDate.split("T")[0]}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {booking.tour?.endDate.split("T")[0]}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`px-3 py-2 rounded-sm text-xs font-semibold ${
                        booking.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {booking.status || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GuestTable;

// components/BookingDetails.js
// components/SubadminBookings.js
// "use client";
// import React, { useEffect } from "react";
// import { useParams } from "next/navigation";
// import { useBookingStore } from "../../../../store/bookingStore";

// const SubadminBookings = () => {
//    const { id } = useParams(); // Get the subadmin ID from the URL
//   const { bookings, loading, error, fetchBookingsBySubadmin } =
//     useBookingStore();

//   // Fetch bookings by subadmin when the component mount
//   // s
//   useEffect(() => {
//     if (id) {
//       fetchBookingsBySubadmin(id);
//     }
//   }, [id, fetchBookingsBySubadmin]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Bookings Approved by Subadmin</h1>
//       {bookings.length > 0 ? (
//         bookings.map((booking) => (
//           <div
//             key={booking._id}
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               margin: "10px 0",
//             }}
//           >
//             <h2>Booking ID: {booking._id}</h2>
//             <p>Tour: {booking.tour?.name || "No tour information"}</p>
//             <p>Price: ${booking.tour?.price || "N/A"}</p>
//             <p>User: {booking.user?.name}</p>
//             <p>Email: {booking.user?.email}</p>
//             <p>Package Name: {booking.packageName}</p>
//             <p>Members: {booking.members}</p>
//             <p>
//               Date Ordered: {new Date(booking.dateOrder).toLocaleDateString()}
//             </p>
//             <p>Time: {booking.time}</p>
//           </div>
//         ))
//       ) : (
//         <div>No bookings found for this subadmin.</div>
//       )}
//     </div>
//   );
// };

// export default SubadminBookings;
