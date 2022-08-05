import express from 'express';

import { authMiddlewares } from '../middlewares/index.js';
import { usersController } from '../controllers/index.js';

const router = express.Router();

// Authentication routes
router.post(
  '/signup',
  authMiddlewares.checkSignup,
  usersController.registerUser
);

export default router;
