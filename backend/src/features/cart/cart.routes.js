import express from "express";
import { addToCart ,getCart , updateCartQty , removeCartQty , clearCart } from "./cart.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/add',protect,addToCart);
router.get('/',protect,getCart);
router.put('/update',protect,updateCartQty);
router.delete('/remove/:productId',protect ,removeCartQty);
router.delete('/clear',protect,clearCart);

export default router;