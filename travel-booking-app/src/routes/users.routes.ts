import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';

const router = Router();
const usersController = new UsersController();

router.get('/:id', usersController.getUser.bind(usersController));
router.put('/:id', usersController.updateUser.bind(usersController));
router.delete('/:id', usersController.deleteUser.bind(usersController));

export default router;