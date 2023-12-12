const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')

User.sync()
  .then(() => {
    console.log('User model synced with the database');
  })
  .catch((error) => {
    console.error('Error syncing User model with the database:', error);
  });
  
const registerUser=asyncHandler(async(req,res)=>{
    try{
        const today = new Date()
        const {name,email,password}=req.body
    
        if(!name||!email||!password){
            res.status(400)
            throw new Error ('Please add all fields')
        }
    
        const userExist=await User.findOne({where: {email: email}})
    
        if(userExist){
            res.status(400)
            throw new Error('User already Exists')
        }
    
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
    
        const user=await User.create({
            name,email,password:hashedPassword,today,
        })
    
        if(user){
            res.status(201).json({
                id:user.id,
                name:user.name,
                email:user.email,
                createdAt:user.createdAt,
                token: generateToken(user.id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid user data')
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }

})

const loginUser=asyncHandler(async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({where: {email: email}})

        if(user&&(await bcrypt.compare(password,user.password))){
            res.json({
                id:user.id,
                name:user.name,
                email:user.email,
                token: generateToken(user.id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid Credentials')
    }
    }catch(error){
        res.status(500).json({error: error.message})
    } 
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

module.exports={registerUser,loginUser}