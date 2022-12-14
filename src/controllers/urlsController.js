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

    const { id, shortUrl, url } = link;
    return res.json({ id, shortUrl, url });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar pela URL.');
  }
};

export const redirect = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const link = await urlsModel.incrementVisitCount(shortUrl);
    if (!link) {
      return res
        .status(404)
        .send('Não foi encontrado um link com esse encurtador.');
    }

    return res.redirect(link.url);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar pela sua url.');
  }
};

export const deleteLink = async (req, res) => {
  const { link } = res.locals;
  try {
    await urlsModel.deleteLinkById(link.id);
    return res.status(204).send('Link apagado com sucesso.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao apagar seu link.');
  }
};
