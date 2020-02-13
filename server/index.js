import express from 'express';
const app = express();
import routes from './routes/routes.js';

const hostname = '127.0.0.1';
const port = 3000;

app.use('/transactions/:id', routes)
app.use('/transactions', routes)

app.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}/`);
});
