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

export default router;
