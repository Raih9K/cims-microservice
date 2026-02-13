import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { RepositoryFactory } from '../repositories/RepositoryFactory';
import { UserService } from '../services/UserService';

const router = Router();

const userRepository = RepositoryFactory.createUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Auth Routes (matching frontend authService.ts)
router.post('/auth/signup', userController.signup);
router.post('/auth/login', userController.login);
router.post('/verify-otp', userController.verifyOtp);
router.post('/resend-otp', userController.resendOtp);
router.get('/me', userController.me);
router.put('/me/profile', userController.updateProfile);

// Company & Team Routes
router.get('/company', userController.getCompany);
router.put('/company', userController.updateCompany);
router.get('/team', userController.getTeam);
router.post('/team/invite', userController.inviteMember);
router.put('/team/:id', userController.updateMember);
router.delete('/team/:id', userController.disableMember);
router.post('/team/:id/force-password', userController.forcePassword);

export default router;
