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

export const checkOwner = async (req, res, next) => {
  const { ownerId } = res.locals;
  const { urlId } = req.params;
  try {
    const link = await urlsModel.getLinkById(urlId);
    if (!link) {
      return res.status(404).send('Esse link não existe.');
    }

    if (ownerId !== link.ownerId) {
      return res
        .status(401)
        .send('Você não pode apagar um link que não é seu.');
    }

    res.locals.link = link;
    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar pelo seu link.');
  }
};
