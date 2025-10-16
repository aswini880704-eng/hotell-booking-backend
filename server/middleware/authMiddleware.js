import User from '../models/user.js';
// Middleware to check if user is authenticated

export const protect = async (req, res, next) => {
    const {user} = req.auth;
    if (!user) {
        res.json({success: false, message: "Not authenticated"});
    }else{
        const user = await User.findById(user);
req.user = user;
        next();
}
}
