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
