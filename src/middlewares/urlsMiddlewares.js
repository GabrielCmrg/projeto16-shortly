import { urlsModel } from '../models/index.js';

export const checkUrl = (req, res, next) => {
  const validate = urlsModel.urlSchema.validate(req.body);
  if (validate.error) {
    return res.status(422).json(validate.error);
  }

  res.locals.url = validate.value.url;
  next();
  return true;
};
