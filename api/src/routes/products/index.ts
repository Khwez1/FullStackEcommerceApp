import { Router } from "express";
import { createProduct, getProduct, listProducts, updateProduct, deleteProduct } from "./productsController";
import { validateData } from "../../middleware/validation";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { productsTable } from "../../db/productsSchema";

const createProductSchema = createInsertSchema(productsTable);
const updateProductSchema = createInsertSchema(productsTable).partial();

const router = Router();

router
    .route('/')
        .get(listProducts)
        .post(validateData(createProductSchema), createProduct)
router
    .route('/:id')
        .get(getProduct)
        .patch(validateData(updateProductSchema), updateProduct)
        .delete(deleteProduct)

export default router