import express from 'express';
import updateTaskStatus from '../controllers/updateTaskStatus.js';
import verifyToken from "../middleware/verifyToken.js"
const updateRoutes = express.Router();

updateRoutes.put('/:id', verifyToken, updateTaskStatus  )
export default updateRoutes;