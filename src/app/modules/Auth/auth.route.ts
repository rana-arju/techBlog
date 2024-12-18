import express from 'express';
import { userController } from './auth.controller';
import validationRequest from '../../middleware/validationRequest';
import { authValidation } from './auth.validation';
const router = express.Router();

// will call controller function

router.post(
  '/register',
  validationRequest(authValidation.registrationValidation),
  userController.registrationUser,
);
router.post(
  '/login',
  validationRequest(authValidation.loginValidation),
  userController.loginUser,
);

export const userRoutes = router;
