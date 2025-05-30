import  express from 'express';
import task from '../../controllers/fetch/task.js';
import verifyToken from '../../middleware/verifyToken.js';

let fetchTask = express.Router();

fetchTask.get('/', verifyToken, task)

export default fetchTask;