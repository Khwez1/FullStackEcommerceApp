import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
    res.send('Here are the products!');
}
export function getProduct(req: Request, res: Response) {
    res.send("Here's a product!");
}
export function createProduct(req: Request, res: Response) {
    res.send("product created!");
}
export function updateProduct(req: Request, res: Response) {
    res.send("product updated!");
}
export function deleteProduct(req: Request, res: Response) {
    res.send("product updated!");
}