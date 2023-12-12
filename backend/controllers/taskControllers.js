const asyncHandler = require('express-async-handler')

const Task=require('../models/taskModel')
const User=require('../models/userModel')

Task.sync()
  .then(() => {
    console.log('Task model synced with the database');
  })
  .catch((error) => {
    console.error('Error syncing Task model with the database:', error);
  });

const getTasks=asyncHandler(async (req,res)=>{
    try{
        const tasks=await Task.findAll({where: {user_id: req.user.id}})
        res.status(200).json(tasks)
    }catch(error){
        return res.status(500).json(error)
    } 
})

const setTask=asyncHandler(async (req,res)=>{
    if(!req.body.name|| !req.body.status){
        res.status(400)
        throw new Error('Please add all fields')
    }

    try{
        const task=await Task.create({name:req.body.name,status:req.body.status,user_id:req.user.id})
        res.status(200).json(task)
    }catch(error){
        return res.status(500).json(error)
    }
})

const updateTask=asyncHandler(async (req,res)=>{
    try{
        const task=await Task.findOne({where:{user_id: req.user.id, id: req.params.id}})
        if(!task){
            res.status(400)
            throw new Error('Task not found')
        }
    
        const user=await User.findOne({where:{id: req.user.id}})
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }
    
        if(task.user_id!==user.id){
            res.status(401)
            throw new Error('User not authorized')
        }

        await Task.update({ name: req.body.name, status: req.body.status },{ where: { id: req.params.id } })
        const updatedTask = await Task.findOne({where:{id: req.params.id}}) 
        res.status(200).json(updatedTask)
    }catch(error){
        res.status(500).json({error: error.message})
    } 
})

const deleteTask=asyncHandler(async (req,res)=>{
    try{
        const task= await Task.findOne({where: {user_id: req.user.id, id:req.params.id}})
        if(!task){
            res.status(400)
            throw new Error('Task not found')
        }

        const user=await User.findOne({where:{id:req.user.id}})
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        if(task.user_id!==user.id){
            res.status(401)
            throw new Error('User not authorized')
        }

        await Task.destroy({where: {id: req.params.id}})
        res.status(200).json({id: req.params.id})
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

module.exports={
    getTasks,
    setTask,
    updateTask,
    deleteTask
}