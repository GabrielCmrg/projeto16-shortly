import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { usersModel } from '../models/index.js';

dotenv.config();

export const checkSignup = (req, res, next) => {
  const validation = usersModel.signupSchema.validate(req.body);
  if (validation.error) {
    return res.status(422).json(validation.error);
  }

  res.locals.signup = validation.value;
  next();
  return true;
};

export const checkSignin = (req, res, next) => {
  const validation = usersModel.signinSchema.validate(req.body);
  if (validation.error) {
    return res.status(422).json(validation.error);
  }

  res.locals.credentials = validation.value;
  next();
  return true;
};

export const checkAuthHeader = (req, res, next) => {
  const validation = usersModel.authHeaderSchema.validate(req.headers);
  if (validation.error) {
    return res.status(401).json(validation.error);
  }

  const token = validation.value.authorization.replace('Bearer ', '');
  const { JWT_SECRET_KEY } = process.env;
  try {
    const owner = jwt.verify(token, JWT_SECRET_KEY);
    res.locals.ownerId = owner.userId;
    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(401).send('Token inválido!');
  }
};
