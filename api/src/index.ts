import express from 'express';

const port = 3000

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hellow World!')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})