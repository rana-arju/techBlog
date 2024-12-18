import express from 'express';
import { userController } from './auth.controller';
const router = express.Router();

// will call controller function

router.post('/register', userController.registrationUser);


export const userRoutes = router;
