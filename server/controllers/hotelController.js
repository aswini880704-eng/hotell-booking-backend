import Hotel from "../models/Hotel.js";
import User from "../models/user.js";

export const registerHotel = async (req, res) => {


    try {
        const { name, address, contact, city, ownerId } = req.body;
       
        // Check if User Already Registered
        const existingHotel = await Hotel.findOne({ owner : ownerId });
        if (existingHotel) {
    
            return res.json({success: false, message: "Hotel Already Registered"});
        } 
        await Hotel.create({ name, address, contact, owner : ownerId, city });
      await User.findByIdAndUpdate(ownerId, {role: "hotelOwner"});

        res.json({ success: true, message: "Hotel Registered Successfully" });
    } catch (error) {

        res.json({ success: false, message: error.message });
    }
}