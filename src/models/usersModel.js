import joi from 'joi';

import { connection } from './index.js';

export const signupSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
  confirmPassword: joi.string().trim().equal(joi.ref('password')),
});

export const signinSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
});

export const createUser = async (user) => {
  const { name, email, password } = user;
  await connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [name, email, password]
  );
};
