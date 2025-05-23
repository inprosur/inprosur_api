import { Router } from 'express';
import * as DegressController from '../controllers/degreeController';

const router = Router();

router.get('/', DegressController.getAllDegress);
router.get('/:id', DegressController.getDegressById);
router.post('/', DegressController.createDegress);

export default router;