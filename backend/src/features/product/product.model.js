import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Product name is required'],
        trim : true,
    },
    description : {
        type : String,
        required : [true , 'Description is required'],
    },
    price : {
        type : Number,
        required : [true , 'Price is required'],
        min : 0,

    },
    category : {
        type : String,
        required : [true , 'Category is required'],
        enum : ['Electronics','Fashion','Home','Beauty']

    },
    stock : {
        type : Number,
        required : true,
        default : 0,
        min : 0

    },
    brand : {
        type : String,
        required : true,
        trim : true,

    },
    images : {
        type : [String],
        required : true,

    },
    isActive : {
        type : Boolean,
        default : true,
    }
},
{
    timestamps : true,
}
);

const Product = mongoose.model('Product',productSchema);

export default Product;