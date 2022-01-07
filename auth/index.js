const jwt=require("jsonwebtoken")
require("dotenv").config()
 GenerateToken=(data)=>{
    return jwt.sign({data},process.env.secret_key,{ expiresIn: '2h' })
}

AuthenticateToken=(req,res,next)=>{
    if(req.headers.cookie){
        const token=req.headers.cookie.split("=")[1]
        const decode=jwt.verify(token,process.env.secret_key)
        req.token=decode
        next()
    }else{
        req.token="token not found"
        next()
    }
}
module.exports={GenerateToken,AuthenticateToken}