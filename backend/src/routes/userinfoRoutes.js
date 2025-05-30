import express from 'express';
import userinfo from '../controllers/fetch/userinfo.js';

const userinfoRoutes = express.Router();

userinfoRoutes.get('/info/:token', userinfo);
export default userinfoRoutes;