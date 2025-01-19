import { Booking } from "../../model/bookingTour.js";
import { Tour } from "../../model/packageTour.js";
import { User } from "../../model/user.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.params; // Extract user ID from URL
    const { tour, price, packageName, members, dateOrder, time } = req.body; // Extract fields from request body

    // Check if the tour and user exist
    const tourExists = await Tour.findById(tour);
    const userExists = await User.findById(userId);

    if (!tourExists || !userExists) {
      return res.status(404).json({ message: "Tour or User not found." });
    }

    // Create the booking
    const booking = new Booking({
      tour,
      user: userId,
      price,
      packageName,
      members,
      dateOrder,
      time,
    });

    await booking.save();

    // Include the virtual field `formattedDateOrder` in the response
    const bookingResponse = booking.toObject();
    bookingResponse.id = bookingResponse._id; // Add the `id` field
    delete bookingResponse._id; // Remove the `_id` field

    res.status(201).json({
      message: "Booking created successfully!",
      booking: bookingResponse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking.", error: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tour", "name price") // Populate tour details
      .populate("user", "name email"); // Populate user details

    res.status(200).json({ bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings.", error: error.message });
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("tour", "name price")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking.", error: error.message });
  }
};

// Update a booking (e.g., change status)
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedBy } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Update status and approvedBy fields
    if (status) booking.status = status;
    if (approvedBy) booking.approvedBy = approvedBy;

    await booking.save();

    res.status(200).json({ message: "Booking updated successfully!", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating booking.", error: error.message });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking.", error: error.message });
  }
};

// Get total bookings and total pending bookings
export const getBookingStatistics = async (req, res) => {
  try {
    // Count total bookings
    const totalBookings = await Booking.countDocuments();

    // Count pending bookings (assuming "pending" is a status)
    const totalPendingBookings = await Booking.countDocuments({ status: "pending" });

    res.status(200).json({
      totalBookings,
      totalPendingBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking statistics.",
      error: error.message,
    });
  }
};