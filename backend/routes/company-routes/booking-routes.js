import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingStatistics,
} from "../../controllers/company-controllers/booking-controllers.js";

const router = express.Router();

// Create a new booking
router.post("/:userId", createBooking);

// Get all bookings
router.get("/", getAllBookings);

// Get a single booking by ID
router.get("/:id", getBookingById);

// Update a booking
router.put("/:id", updateBooking);

// Delete a booking
router.delete("/:id", deleteBooking);


// New route for booking statistics
router.get("/statistics/totals", getBookingStatistics);


export default router;
