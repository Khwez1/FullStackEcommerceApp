import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Here are the products!');
});

router.get('/:id', (req, res) => {
    console.log(req.params);
    res.send("Here's a product!");
});

router.post('/', (req, res) => {
    res.send('New product created');
});

export default router