import express from 'express';
import dotenv from 'dotenv'
import mongodbConnect from './config/ConnectDB.js';
import authRoutes from './routes/authRoutes.js'

import cors from 'cors'
import userinfoRoutes from './routes/userinfoRoutes.js';
import createTask from './routes/task.js';

import fetchTask from './routes/fetch/task.js';
import updateRoutes from './routes/updateRoutes.js';
import updateimpRoutes from './routes/updateimpRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';
const app = express()

dotenv.config()

app.use(cors())

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use('/api/auth',  authRoutes)
app.use('/api/user', userinfoRoutes)
app.use('/api/createTask',  createTask)
app.use('/api/task',  fetchTask)
app.use('/api/updateTask', updateRoutes)
app.use('/api/importantTask', updateimpRoutes)
app.use('/api/deleteTask', deleteRoutes)


mongodbConnect()
app.listen(process.env.PORT||3000, () =>{
    console.log(`serve is running on port${process.env.PORT}`)
})