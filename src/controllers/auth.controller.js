import { registerService } from '../services/auth.service.js';

export async function registerController(req, res) {
  try {
    const result = await registerService(req.body);

    return res.status(result.status).json({
      message: result.message,
      user: result.user,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}