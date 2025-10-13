import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getUserData, storeRecntSearchedCities } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', protect,getUserData);
userRouter.post('/store-recent-search', protect, storeRecntSearchedCities);

export default userRouter;