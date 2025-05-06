import { Router } from "express";
import { createProduct, getProduct, listProducts, updateProduct, deleteProduct } from "./productsController";

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router