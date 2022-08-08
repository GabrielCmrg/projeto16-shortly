import joi from 'joi';
import { connection } from './index.js';

export const urlSchema = joi.object({
  url: joi.string().trim().uri().required(),
});

export const createLink = async (linkObject) => {
  const { shortUrl, url, ownerId } = linkObject;
  await connection.query(
    'INSERT INTO links ("shortUrl", "url", "ownderId") VALUES ($1, $2, $3)',
    [shortUrl, url, ownerId]
  );
};
