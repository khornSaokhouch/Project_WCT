// components/GuestTable.jsx

'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

const GuestTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const guests = [
    { name: 'James Benny', package: 'Trip of Cambodia', roomType: 'Classic Room', date: 'Oct 24th, 2020', time: '08:29 AM', status: 'Pending', members: 3 },
    { name: 'William Chynto', package: 'Trip of Cambodia', roomType: 'Classic Room', date: 'Oct 24th, 2020', time: '08:29 AM', status: 'Reject', members: 4 },
  ];

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (guest) => {
    console.log('Editing guest:', guest);
  };

  const handleDelete = (guest) => {
    console.log('Deleting guest:', guest);
  };

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
            <th className="py-3 px-6 text-left">Room Type</th>
            <th className="py-3 px-6 text-left">Members</th>
            <th className="py-3 px-6 text-left">Date Order</th>
            <th className="py-3 px-6 text-left">Time</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredGuests.map((guest, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 font-bold text-left">{guest.name}</td>
              <td className="py-3 px-6 text-left">{guest.package}</td>
              <td className="py-3 px-6 text-left">{guest.roomType}</td>
              <td className="py-3 px-6 text-left">{guest.members}</td>
              <td className="py-3 px-6 text-left">{guest.date}</td>
              <td className="py-3 px-6 text-left">{guest.time}</td>
              <td className="py-3 px-6 text-left">
                <span className={`px-3 py-2 rounded-sm text-xs font-semibold ${guest.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                  {guest.status}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                <button 
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(guest)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button 
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(guest)}
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