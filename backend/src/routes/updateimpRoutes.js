import express from 'express';
import updateimpTask from '../controllers/updateimpTask.js';
import verifyToken from "../middleware/verifyToken.js"
const updateimpRoutes = express.Router();

updateimpRoutes.put('/:id', verifyToken,  updateimpTask  )
export default updateimpRoutes;