import joi from 'joi';
import { connection } from './index.js';

export const urlSchema = joi.object({
  url: joi.string().trim().uri().required(),
});

export const createLink = async (linkObject) => {
  const { shortUrl, url, ownerId } = linkObject;
  await connection.query(
    'INSERT INTO links ("shortUrl", "url", "ownerId") VALUES ($1, $2, $3)',
    [shortUrl, url, ownerId]
  );
};

export const getLinkById = async (linkId) => {
  const { rows: link } = await connection.query(
    'SELECT "id", "shortUrl", "url" FROM links WHERE "id" = $1',
    [linkId]
  );
  return link[0];
};

export const incrementVisitCount = async (shortUrl) => {
  const { rows: link } = await connection.query(
    'UPDATE links SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1 RETURNING *',
    [shortUrl]
  );
  return link[0];
};

export const deleteLinkById = async (urlId) => {
  await connection.query('DELETE FROM links WHERE "id" = $1', [urlId]);
};
