import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//Register new user
router.post('/registration', newUserValidator, userController.registerUser);

//Login user
router.post('/login', userController.login);

//Forget user password by using email
router.post('/forgetPassword', userController.forgetPassword);

//Reset Password
router.put('/resetPassword', resetAuth, userController.resetPassword); 

export default router;
