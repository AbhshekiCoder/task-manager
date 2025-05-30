import express from 'express';
import updateTask from '../controllers/updateTask.js';



const updateTaskRoute = express.Router();

updateTaskRoute.put('/:id', updateTask);

export default updateTaskRoute;