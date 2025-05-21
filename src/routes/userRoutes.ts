import { Router } from 'express';
import * as UserController from '../controllers/userController';

const router = Router();

// Define la ruta para obtener todos los usuarios
// GET /api/users
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/newUser', UserController.createUser);

export default router;