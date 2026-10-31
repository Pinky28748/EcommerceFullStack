import Product from "./product.model.js";

const getProducts = async (req,res) => {
    try
    {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }
}

const createProducts = async (req,res) => {
    try
    {
        const {name , price, category } = req.body;
        if(!name || !price || !category)
        {
            return res.status(400).json({message : "Name,category and price are required "});
        }
        if(isNaN(price))
        {
            return res.status(400).json({message : "Price must be a number"});

        }
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }
}

const getProductById = async (req,res) => {
    const {id} = req.params;
    try 
    {
        const product = await Product.findById(id);
        if(!product)
        {
            return res.status(400).json({message : "Product not found"});
        }
     res.status(200).json(product);
    }
    catch(e)
    {
        res.status(500).json({message: e.message});
    }

}

const updateProduct = async (req,res) => {
    const {id} = req.params;
    try 
    {
        const {name,price,category} = req.body;
    if(!name || !price || !category)
    {
        return res.status(400).json({message : "Name,category,price are required"});

    }
    if(isNaN(price))
    {
        return res.status(400).json({message : "Price must be a number"});
    }
    const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{new : true});
    if(!updateProduct)
    {
        return res.status(400).json({message : "Product not found"});
    }
    res.status(200).json(updateProduct);

    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }
    


}

const deleteProduct = async (req,res) => {
    const {id} = req.params;
    try 
    {
        const product = await Product.findByIdAndDelete(id);
        if(!product)
        {
            return res.status(404).json({message : "Product not found"});
        }
        res.status(200).json(product);
    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }

}

export {getProducts , createProducts,getProductById,updateProduct,deleteProduct};