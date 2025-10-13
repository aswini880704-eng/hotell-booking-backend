import Booking from "../models/Booking";
import Hotel from "../models/Hotel";
import Room from "../models/Room";


// Function to Check Room Availability
const checkAvailability = async({checkInDate, checkOutDate, room})=>{
try {
    const bookings = await Booking.find({
        room,   
        checkInDate:{$lt: checkOutDate},
        checkOutDate:{$gt: checkInDate},
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
} catch (error) {

    console.error(error.message);
}

}

// API to check availability of a room
// POST /api/bookings/check-availability
export const ch = async (req, res) => {
    try {

        const {checkInDate, checkOutDate, room} = req.body;
        const isAvailable = await checkAvailability
        ({checkInDate, checkOutDate, room});
        res.json({success:true, isAvailable});
    }
    catch (error) {
        res.json({success:false, message:error.message});
    
    
    }}

    // API to create a new booking
    // POST /api/bookings/book
    export const createBooking = async (req, res) => {
        try {
            const {room, checkInDate, checkOutDate, guests } = req.body;
          const user =req.user._Id;
            // Before Bookong Check Room Availability
            const isAvailable = await checkAvailability({
                checkInDate, 
                checkOutDate, 
                room});

                if(!isAvailable){
                    return res.json({success:false, message:"Room is not available "});
                }

                // Get totalPrice from Room
                const roomData =await Room.findById(room).
                papulate("hotel");
                let totalPrice = roomData.pricePerNight ;


                // Calculate totalPrice based on nights
                const checkIn = new Date(checkInDate);
                const checkOut = new Date(checkOutDate);
                const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
                const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

                totalPrice *= nights;
                const booking = await Booking.create({
                    user, 
                    room, 
                    checkInDate, 
                    checkOutDate, 
                    guests: +guests,
                     totalPrice,
                     hotel: roomData.hotel._id,

                });
                res.json({success:true, message:"Booking  created Successful"});
        } catch (error) {
            console.log(error);
            res.json({success:false, message:"Failed to create booking" });
        }}

// API to get all bookings of a user
// GET /api/bookings/user

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Booking.find({user}).populate
        ("room hotel").sort({createdAt:-1});
        res.json({success:true, bookings});
    } catch (error) {
        res.json({success:false, message:"Failed to fetch bookings" });
    }
    }
    
    export const getAllBookings = async (req, res) => {
try {
        const hotel = await Hotel.findOne({owner:req.user._id});
        if(!hotel){
            return res.json({success:false, message:"No Hotel found"});
        
        }
        const bookings = await Booking.find({hotel:hotel._id})
        .populate("room htel user").sort({createdAt:-1});

        // Total Bookings
        const totalBookings = bookings.length;
        // Total Revenue
        const totalRevenue = bookings.reduce((acc , booking)=>acc +
        booking.totalPrice,0);
        res.json({success:true, dashboardData:{totalBookings,
             totalRevenue, bookings}});
        } catch (error) {
            res.json({success:false, message:"Failed to fetch bookings" });
            
    }
}