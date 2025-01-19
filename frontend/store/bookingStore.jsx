import { create } from "zustand";

const API_URL = "http://localhost:3500/api/bookings";

export const useBookingStore = create((set) => ({
  bookings: [], // Array to store all bookings
  selectedBooking: null, // Currently selected booking
  loading: false, // Loading state
  error: null, // Error state
  totalBookings: 0, // Add total bookings
  totalPendingBookings: 0, // Add total pending bookings

  // Fetch booking statistics
  fetchBookingStatistics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/statistics/totals`); // Replace with your API endpoint
      const data = await response.json();
      set({
        totalBookings: data.totalBookings,
        totalPendingBookings: data.totalPendingBookings,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch all bookings
  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}`); // Replace with your API endpoint
      const data = await response.json();
      set({ bookings: data.bookings, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch a single booking by ID
  fetchBookingById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${id}`); // Replace with your API endpoint
      const data = await response.json();
      set({ selectedBooking: data.booking, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      set((state) => ({
        bookings: [...state.bookings, data.booking],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update a booking
  updateBooking: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === id ? data.booking : booking
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a booking
  deleteBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
