const User=require("../models/userModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

exports.signup=async(req,res)=>{
    try{
        const {email,password}=req.body
        console.log(email,password)
        if(!(email && password)){
            return res.status(400).json({message:"All inputs must be given"})
        }
        //check is user already exists
        const olduser=await User.findOne({email})

        if(olduser){
            return res.status(409).json({message:"User with this email alreay exists!!!"})
        }

        //encrypt password
        encryptedPassword=await bcrypt.hash(password,10)
        console.log("Encrypted Password: ",encryptedPassword)

        //create user in database
        const user=await User.create({
            email:email.toLowerCase(),
            password:encryptedPassword,
        })

        //create token
        const token=jwt.sign(
            {user_id:user._id,email},
            process.env.TOKEN_KEY,
            {
                expiresIn:"2h"
            }
        )

        //saving token
        user.token=token
        console.log(user)

        return res.status(200).json({userId:user._id,token:user.token})

    }
    catch(err){
        console.log(err)
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body

        if(!(email && password)){
            return res.status(400).json({message:"All input fields are required"})
        }

        //to verify if user exists or not
        const user=await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"this user doesnt exists in the database"})
        }

        const isPasswordCorrect= await bcrypt.compare(password,user.password)
        console.log(isPasswordCorrect)
        if(isPasswordCorrect){
            const token=jwt.sign(
                {userId:user._id,email},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"2h"
                }
            )

            user.token=token
            console.log("in password correct")
        }
        else{
            return res.status(400).json({message:"password is incorrect"})
        }

        return res.status(200).json({userId:user._id,token:user.token})

    }
    catch(err){
        return res.status(400).json({message:err})
    }
}