import express from 'express';

import { authMiddlewares, urlsMiddlewares } from '../middlewares/index.js';
import { urlsController, usersController } from '../controllers/index.js';

const router = express.Router();

// Authentication routes
router.post(
  '/signup',
  authMiddlewares.checkSignup,
  usersController.registerUser
);
router.post('/signin', authMiddlewares.checkSignin, usersController.loginUser);

// urls routes
router.post(
  '/urls/shorten',
  authMiddlewares.checkAuthHeader,
  urlsMiddlewares.checkUrl,
  urlsController.shorten
);
router.get('/urls/:urlId', urlsController.retrieveLink);
router.get('/urls/open/:shortUrl', urlsController.redirect);
router.delete(
  '/urls/:urlId',
  authMiddlewares.checkAuthHeader,
  urlsMiddlewares.checkOwner,
  urlsController.deleteLink
);

// users routes
router.get(
  '/users/me',
  authMiddlewares.checkAuthHeader,
  usersController.retrieveUserMetrics
);
router.get('/ranking', usersController.retrieveAllUsersMetrics);

export default router;
