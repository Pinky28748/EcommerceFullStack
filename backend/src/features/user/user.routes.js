import express from "express";
import {RegisterUser , LoginUser , LogoutUser, getProfile} from "./user.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register',RegisterUser);
router.post('/login',LoginUser);
router.post('/logout',protect,LogoutUser);
router.get('/profile',protect,getProfile);

export default router;