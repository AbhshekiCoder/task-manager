import { Router } from "express";
import deleteTask from "../controllers/deleteTask.js";
import verifyToken from "../middleware/verifyToken.js"

const deleteRoutes = Router();

deleteRoutes.delete("/:id", verifyToken, deleteTask)
export default deleteRoutes;