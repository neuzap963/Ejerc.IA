import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function registerService(userData) {
  try {
    const { name, email, password } = userData;

    // validação
    if (!name || !email || !password) {
      return {
        status: 400,
        message: 'name, email e password são obrigatórios',
      };
    }

    // verificar se já existe
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return {
        status: 409,
        message: 'Este email já está registado',
      };
    }

    // hash password
    const hashedpass = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      name,
      email,
      password: hashedpass,
    });

    await newUser.save();

    return {
      status: 201,
      message: 'Usuário guardado com sucesso',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Erro interno no servidor',
    };
  }
}