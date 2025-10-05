import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../validators/schemas';

const router = Router();
const authController = new AuthController();

// bind this to preserve context if using class methods (or convert to arrow functions)
router.post('/register', validateBody(registerSchema), authController.register.bind(authController));
router.post('/login', validateBody(loginSchema), authController.login.bind(authController));

export default router;