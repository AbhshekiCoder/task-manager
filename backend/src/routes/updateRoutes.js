import express from 'express';
import updateTask from '../controllers/updateTask.js';
import verifyToken from "../middleware/verifyToken.js"
const updateRoutes = express.Router();

updateRoutes.put('/:id', verifyToken, updateTask  )
export default updateRoutes;