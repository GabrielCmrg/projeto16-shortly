import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { usersModel } from '../models/index.js';

dotenv.config();

export const registerUser = async (req, res) => {
  const { name, email, password: receivedPassword } = res.locals.signup;
  const password = bcrypt.hashSync(receivedPassword, 10);
  const user = { name, email, password };
  try {
    await usersModel.createUser(user);
    return res.status(201).send('Usuário criado!');
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(409).send('Esse email já está sendo usado.');
    }
    console.error(error);
    return res.status(500).send('Não foi possível registrar o usuário.');
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = res.locals.credentials;
  try {
    const user = await usersModel.getUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Email ou senha incorretos.');
    }

    const { JWT_SECRET_KEY } = process.env;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao consultar o usuário.');
  }
};

export const retrieveUserMetrics = async (req, res) => {
  const { ownerId } = res.locals;
  try {
    const userMetrics = await usersModel.getUserMetrics(ownerId);
    if (!userMetrics) {
      return res.status(404).send('Usuário não encontrado.');
    }
    return res.json(userMetrics);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send('Algo deu errado ao buscar as informações do usuário.');
  }
};
