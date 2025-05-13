import express, { Router } from 'express';
import productsRoutes from './routes/products/index.js'
import authRoutes from './routes/auth/index.js'
const port = 3000

const app = express();

app.use(express.json())

app.get('/', (req, res, ) => {
    res.send('Hellow World!');
});
//products endpoints
app.use('/products', productsRoutes);
//users endpoints
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});