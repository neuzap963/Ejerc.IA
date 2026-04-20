import { registerService } from '../services/auth.service.js';

export async function registerController(req, res) {
  try {
    const result = await registerService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}