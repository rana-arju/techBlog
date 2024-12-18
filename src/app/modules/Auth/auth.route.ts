import express from 'express';
import { userController } from './auth.controller';
import validationRequest from '../../middleware/validationRequest';
import { authValidation } from './auth.validation';
const router = express.Router();

// will call controller function

router.post(
  '/register',
  //validationRequest(authValidation.registrationValidation),
  userController.registrationUser,
);

export const userRoutes = router;
