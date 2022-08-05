import bcrypt from 'bcrypt';

import { usersModel } from '../models/index.js';

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
