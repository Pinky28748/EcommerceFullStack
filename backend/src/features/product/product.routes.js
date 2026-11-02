import express from 'express';
import { getProducts,createProducts,getProductById,updateProduct,deleteProduct } from './product.controller.js';

const router = express.Router();
router.get("/",getProducts);
router.post("/",createProducts);
router.get("/:id",getProductById);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

export default router;

