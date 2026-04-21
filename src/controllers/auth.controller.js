import { registerService, loginService } from '../services/auth.service.js';
import { userInfoService } from '../services/auth.service.js';
export async function registerController(req, res) {
  const result = await registerService(req.body);
  return res.status(result.status).json(result);
}

export async function loginController(req, res) {
  const result = await loginService(req.body);
  return res.status(result.status).json(result);
}

export async function getUserInfoController(req, res) {
  const result = await userInfoService(req.userId);

  return res.status(result.status).json(result);
}