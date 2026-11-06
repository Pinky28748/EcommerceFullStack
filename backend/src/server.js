import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB  from "./config/db.js";
import productRoutes from "./features/product/product.routes.js";
import userRoutes from "./features/user/user.routes.js"
import cartRoutes from "./features/cart/cart.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/cart',cartRoutes);
app.get("/",(req,res) => {
    res.send("API is running...");
});
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT , () => {
        console.log(`Server is running on : ${PORT}`);
    })
})