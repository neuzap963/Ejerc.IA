import { jest } from '@jest/globals';
import request from 'supertest';

await jest.unstable_mockModule('../src/middleware/auth.middleware.js', () => ({
  authMiddleware: (req, res, next) => next()
}));

await jest.unstable_mockModule('../src/controllers/auth.controller.js', () => ({
  registerController: jest.fn(),
  loginController: jest.fn(),
  userInfoController: (req, res) => {
    res.status(200).json({
      nombre: 'neuza',
      apellido: 'pereira',
      correo: 'neuzap9632@gmail.com'
    });
  }
}));

const { default: app } = await import('../index.js');

describe('Integración API /api/users/info', () => {
  test('POST /api/users/info con token y body correcto devuelve 200 y datos de usuario', async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTc5ZjYyOTM3ZWIwMThiZWIxYTdhZCIsImVtYWlsIjoibmV1emFwOTYzMkBnbWFpbC5jb20iLCJpYXQiOjE3NzY3ODg1NjcsImV4cCI6MTc3Njg3NDk2N30.oE6lmWyuKXDdDLSGZC1_swFd-4tvcnRSOAvJsNOEzE0';

    const response = await request(app)
      .post('/api/users/info')
      .set('Authorization', token)
      .send({ email: 'neuzap@gmail.com' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      nombre: 'neuza',
      apellido: 'pereira',
      correo: 'neuzap9632@gmail.com'
    });
  });
});
