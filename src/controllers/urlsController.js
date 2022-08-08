import { nanoid } from 'nanoid';

import { urlsModel } from '../models/index.js';

export const shorten = async (req, res) => {
  const { url, ownerId } = res.locals;
  const shortUrl = nanoid(8);
  try {
    await urlsModel.createLink({ url, ownerId, shortUrl });
    return res.status(201).json({ shortUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao criar o link.');
  }
};

export const retrieveLink = async (req, res) => {
  const { urlId } = req.params;
  try {
    const link = await urlsModel.getLinkById(urlId);
    if (!link) {
      return res.status(404).send('Não foi encontrado um url com esse id.');
    }

    return res.json(link);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar pela URL.');
  }
};
