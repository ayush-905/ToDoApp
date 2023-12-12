const express = require('express')
const dotenv=require('dotenv').config()
const port=process.env.PORT||5000
const { errorHandler } = require('./middleware/errorMiddleware');
const cors=require('cors')

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/tasks',require('./routes/taskRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler);

app.listen(port,()=> console.log(`Server started at port ${port}`))