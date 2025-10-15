import express from "express";

import  { checkAvailability,
    createBooking,
    getAllBookings,
    getUserBookings} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";


const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailability);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/All', protect, getAllBookings);



export default bookingRouter;