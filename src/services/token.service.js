import jwt from 'jsonwebtoken';

export function createToken(user) {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.tokenKey,
    {
      expiresIn: '1d',
    }
  );

  return token;
}