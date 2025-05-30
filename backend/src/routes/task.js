import express from "express";
import task from "../controllers/task.js";
import verifyToken from "../middleware/verifyToken.js";

const createTask = express.Router();

createTask.post("/", verifyToken, task);

export default createTask;