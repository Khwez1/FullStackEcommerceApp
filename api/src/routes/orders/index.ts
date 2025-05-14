import { Router } from 'express';
import { createOrder } from './ordersContollers.js';
import { validateData } from '../../middleware/validation.js';
import { insertOrderWithItemsSchema } from '../../db/ordersSchema.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, validateData(insertOrderWithItemsSchema), createOrder);

export default router;