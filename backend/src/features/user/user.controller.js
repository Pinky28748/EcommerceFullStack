import User from "./user.model.js"
import generateToken from "../../utils/generateToken.js"

const RegisterUser = async (req,res) => {
    try
    {
        const {name,email,password,phone} = req.body;
    if(!name || !email || !password)
    {
        return res.status(400).json({message : "Name , email , password required"});
    }
    const userExists = await User.findOne({email});
    if(userExists)
    {
        return res.status(400).json({message : "User already exists"});
    }
    const user = await User.create({name,email,password,phone});
    const token = generateToken(user._id);
    res.status(201).json({_id : user._id , name : user.name , email : user.email , role : user.role , token});

    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }
    
}

const LoginUser = async (req,res) => {
    try
    {
        const {email , password} = req.body;
        
        if(!email || !password)
        {
            return res.status(400).json({message : "Email and password are compulsary"});
        }
        const user = await User.findOne({email});
        console.log(user);
        if(!user)
        {
           return res.status(400).json({message : "Invalid email or password"});
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch)
        {
            return res.status(400).json({message : "Invalid email or password"});
        }
        const token = generateToken(user._id);
        res.status(200).json({_id : user._id , name : user.name , email : user.email ,role : user.role , token})
    }
    catch(e)
    {
        res.status(500).json({message : e.message});
    }

}

const LogoutUser = async (req,res) => {
    res.status(200).json({message : "Logout successfull"});
    
}

const getProfile = async (req,res) => {
    try 
    {
        const user = await User.find({});
        res.status(200).json({user})
    }
    catch(e)
    {
        res.status(400).json({message : e.message});
    }

}

export {RegisterUser , LoginUser , LogoutUser , getProfile};