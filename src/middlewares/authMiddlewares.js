import { usersModel } from '../models/index.js';

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
