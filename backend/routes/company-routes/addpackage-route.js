import express from "express";
import {
  createTour,
  getToursBySubadminId,
  getTourById,
  updateTour,
  deleteTour,
  getUpcomingTours,
  getToursByDateRange,
} from "../../controllers/company-controllers/addpaackage-controllers.js";

const router = express.Router();

// Routes for subadmins
router.post("/:id/add", createTour);
// router.get("/my-tours", getToursBySubadmin);
router.put("/:subadminId/:id", updateTour);
// Delete a tour by ID
router.delete("/:subadminId/:id", deleteTour);
// // Get upcoming tours
router.get("/upcoming", getUpcomingTours);

// // Get tours within a date range
router.get("/date-range", getToursByDateRange);

// Routes for admins
router.get("/by-subadmin/:subadminId", getToursBySubadminId);

// Routes for all users
router.get("/:id", getTourById);

export default router;
