import express from 'express';
import { registerController } from '../controllers/auth.controller.js';

const router = express.Router();

// Rota para registo
router.post('/register', registerController);

// Rota para login
router.post('/login', (req, res) => {
  res.json({ message: 'Rota de login funcionando' });
});

export default router;