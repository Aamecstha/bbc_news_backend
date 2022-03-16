const mongoose=require("mongoose")

const newsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }
})

module.exports=new mongoose.model('News',newsSchema)
