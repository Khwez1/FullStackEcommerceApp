import { Router } from "express";
import { createProduct, getProduct, listProducts, updateProduct, deleteProduct } from "./productsController";

const router = Router();

router
    .route('/')
        .get(listProducts)
        .get(createProduct)
router
    .route('/:id')
        .get( getProduct)
        .patch( updateProduct)
        .delete( deleteProduct)

export default router