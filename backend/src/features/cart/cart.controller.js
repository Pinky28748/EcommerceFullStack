import Cart from "./cart.model.js";
import Product from "../product/product.model.js";

const addToCart = async (req,res) => {
    try 
    {
        const {productId,qty} = req.body;
        const userId = req.user._id;
        const productExists = await Product.findById(productId);
        if(!productExists)
        {
            return res.status(400).json({message : "Product not found"});
        }
        const existingCartItem = await Cart.findOne({productId,userId});
        if(existingCartItem)
        {
            existingCartItem.qty += qty || 1;
            await existingCartItem.save();
            return res.status(200).json(existingCartItem);
        }
        else
        {
            const newCartItem = await Cart.create({
                userId,
                productId,
                qty : qty || 1,
            });
            res.status(200).json(newCartItem);
        }
       
    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }
}

const getCart = async (req,res) => {
    try
    {
        const userId = req.user._id;
        const cartItems = await Cart.find({userId}).populate('productId');
        res.status(200).json(cartItems);
    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }

}

const updateCartQty = async (req,res) => {
    try
    {
        const {productId,qty} = req.body;
        const userId = req.user._id;
        if(qty<1)
        {
            return res.status(400).json({message : "Qty should be greater than 1"});

        }
        const cartItem = await Cart.findOne({userId,productId});
        if(!cartItem)
        {
            return res.status(400).json({message : "Product not found in the cart"});
        }
        cartItem.qty = qty;
        await cartItem.save();

        res.status(200).json(cartItem);
    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }

}

const removeCartQty = async (req,res) => {
    try
    {
        const {productId } = req.params;
        const userId = req.user._id;
        const cartItem = await Cart.findOneAndDelete({productId,userId});
        if(!cartItem)
        {
            return res.status(400).json({message : "Product not found in cart"});
        }
        res.status(200).json({message : "Product removed from cart" , cartItem});
 
    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }

}

const clearCart = async (req,res) => {
    try
    {
        const userId = req.user._id;
        await Cart.deleteMany({userId});
        res.status(200).json({message : "Cart cleared"});
    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }
}

export {addToCart , getCart , updateCartQty , removeCartQty , clearCart};