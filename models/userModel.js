const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    dateCreated:{
        type:Date,
        default:new Date()
    }
})

module.exports=new mongoose.model("User",userSchema)