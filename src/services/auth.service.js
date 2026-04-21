import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { createToken } from './token.service.js';
import userModel1 from '../models/user.model.js';

const saltRounds = 10;

export async function registerService(userData) {
  try {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
      return {
        status: 400,
        message: 'Todos os campos são obrigatórios',
      };
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return {
        status: 409,
        message: 'Este email já está registado',
      };
    }

    const hashedPass = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
    });

    await newUser.save();

    return {
      status: 201,
      message: 'Utilizador guardado com sucesso',
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
}

export async function loginService(userData) {
  try {
    const { email, password } = userData;

    const user = await userModel.findOne({ email });

    if (!user) {
      return {
        status: 404,
        message: 'Usuário ou password incorretos',
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        status: 401,
        message: 'Usuário ou password incorretos',
      };
    }

    const token = createToken(user);

    return {
      status: 200,
      message: 'Login realizado com sucesso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
}

export async function userInfoService(userId) {
  try {
    const user = await userModel.findById(userId).select('-password');

    if (!user) {
      return {
        status: 404,
        message: 'Utilizador não encontrado'
      };
    }

    return {
      status: 200,
      message: 'Informação do utilizador obtida com sucesso',
      user
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message
    };
  }
}