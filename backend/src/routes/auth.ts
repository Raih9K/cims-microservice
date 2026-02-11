import { Router } from 'express';
import { UserController } from '@/controllers/userController';
import { validateRequest, userRegistrationSchema, userLoginSchema } from '@/middleware/validation';
import { authenticateToken } from '@/middleware/auth';

const router = Router();
const userController = new UserController();

router.post('/register', validateRequest(userRegistrationSchema), userController.register);
router.post('/login', validateRequest(userLoginSchema), userController.login);
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);

export default router;