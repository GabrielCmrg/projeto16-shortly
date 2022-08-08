import joi from 'joi';

import { connection } from './index.js';

export const signupSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
  confirmPassword: joi.string().trim().equal(joi.ref('password')),
});

export const signinSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
});

export const authHeaderSchema = joi
  .object({
    authorization: joi
      .string()
      .trim()
      .pattern(/^Bearer .+$/)
      .required(),
  })
  .unknown(true);

export const createUser = async (user) => {
  const { name, email, password } = user;
  await connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [name, email, password]
  );
};

export const getUserByEmail = async (email) => {
  const { rows: user } = await connection.query(
    'SELECT * FROM users WHERE "email" = $1',
    [email]
  );
  return user[0];
};

export const getUserMetrics = async (userId) => {
  const { rows: user } = await connection.query(
    `
      SELECT 
        users."id",
        users."name",
        COALESCE(SUM(links."visitCount")::int, 0) AS "visitCount",
        CASE WHEN COUNT(links."visitCount") > 0
          THEN json_agg(
            json_build_object(
              'id', links."id",
              'shortUrl', links."shortUrl",
              'url', links."url",
              'visitCount', links."visitCount"
            )
          ) 
          ELSE '[]'
        END AS "shortenedUrls"
      FROM users
      LEFT JOIN links
      ON links."ownerId" = users."id"
      WHERE users."id" = 2
      GROUP BY users."id"
    `,
    [userId]
  );
  return user[0];
};

export const getAllUsersMetrics = async () => {
  const { rows: users } = await connection.query(
    `
      SELECT 
        users."id",
        users."name",
        COALESCE(COUNT(links."visitCount")::int, 0) AS "linksCount",
        COALESCE(SUM(links."visitCount")::int, 0) AS "visitCount"
      FROM users
      LEFT JOIN links
      ON links."ownerId" = users."id"
      GROUP BY users."id"
      ORDER BY "visitCount" DESC
      LIMIT 10
    `
  );
  return users;
};
