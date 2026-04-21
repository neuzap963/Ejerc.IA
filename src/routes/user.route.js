import express from 'express';
import { registerController, loginController, getUserInfoController } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', authMiddleware, getUserInfoController);

export default router;