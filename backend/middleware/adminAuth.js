import jwt from "jsonwebtoken"


const adminAuth = async(req,res)=>{
    try{
     const {token} = req.headers
     if(!token){
        return res.json({success:false,message:"Not authorised"})
     }
     const token_decode = jwt.verify(token,process.env.JWT_SECRET)
     if(token_decode !== process.enc.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        return res.json({success:false,message:"Not authorized"})
     }
    } catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}