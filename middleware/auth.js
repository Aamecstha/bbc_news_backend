const jwt=require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
    const token=req.body.token || req.query.token || req.headers["x-access-token"]
    console.log("Token: ",token)
    if(!token){
        return res.status(400).json({message:"Token is required to authenticate"})
    }
    
    try{
        const decoded=jwt.verify(token,process.env.TOKEN_KEY)
        req.user=decoded
        console.log("user: ",decoded)
    }
    catch(err){
        return res.status(400).json({message:err})
    }
    return next()
}

module.exports=verifyToken