import joi from 'joi';

export const signupSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
  confirmPassword: joi.string().trim().equal(joi.ref('password')),
});
