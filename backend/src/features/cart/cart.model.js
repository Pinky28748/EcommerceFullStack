import { Schema } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : [true,"Userid is reuquired"],
    },
    productId : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : [true,"Productid is required"],
    },
    qty : {
        type : Number,
        required : [true,"Quantity is required"],
        min : 1,
        default : 1,
    }
},
{timestamps : true,
}
);

const Cart = mongoose.model("Cart",cartSchema);

export default Cart;