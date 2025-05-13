import { Router } from "express";
import { createProduct, getProduct, listProducts, updateProduct, deleteProduct } from "./productsController.js";
import { validateData } from "../../middleware/validation.js";

import { createInsertSchema } from "drizzle-zod";
import { productsTable } from "../../db/productsSchema.js";
import { verifyToken, verifyRole } from "../../middleware/authMiddleware.js";

const createProductSchema = createInsertSchema(productsTable);
const updateProductSchema = createInsertSchema(productsTable).partial();

const router = Router();

router
    .route('/')
        .get(listProducts)
        .post(verifyToken, verifyRole, validateData(createProductSchema), createProduct)
router
    .route('/:id')
        .get(getProduct)
        .patch(verifyToken, verifyRole, validateData(updateProductSchema), updateProduct)
        .delete(verifyToken, verifyRole, deleteProduct)

export default router