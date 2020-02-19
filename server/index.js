import express from 'express';
import routes from './routes/routes.js';
import bodyparser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const hostname = '127.0.0.1';

app.use(routes);


app.listen(PORT, () => {
    console.log(`Server running on http://${hostname}:${PORT}/`);
});

export default app;