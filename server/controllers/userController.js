
// GET/api/user/

import User from "../models/user.js";

export const getUserData = (req, res) => {
    try {

        const role = req.user.role;
        const recetSearchedCities = req.user.recetSearchedCities;
        res.json({success: true, role, recetSearchedCities});
    } catch (error) {

        res.json({success: false, message: error.message});
    }
}

// Store  User recently searched cities
export const storeRecntSearchedCities = async (req, res) => {
    try {
        const{recetSearchedCity} = req.body;
        const user = await req.user;
        if(User.recetSearchedCities.length < 3){
            user.recetSearchedCities.push(recetSearchedCity);

        }else{
            user.recetSearchedCities.shift();
            user.recetSearchedCities.push(recetSearchedCity);
        }
        await user.save();
        res.json({success: true, message: "City added"});

    }catch (error) {
         res.json({success: false, message: error.message});

    }
}