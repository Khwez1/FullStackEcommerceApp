import { Router } from 'express';
import { createOrder, getOrder, listOrders, updateOrder } from './ordersContollers.js';
import { validateData } from '../../middleware/validation.js';
import { insertOrderWithItemsSchema, updateOrderSchema } from '../../db/ordersSchema.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, validateData(insertOrderWithItemsSchema), createOrder);
router.get('/', verifyToken, listOrders)
router.get('/:id', verifyToken, getOrder)
router.patch('/:id', verifyToken, validateData(updateOrderSchema), updateOrder)
export default router;