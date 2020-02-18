import express from 'express';
const app = express();
import routes from './routes/routes.js';
const PORT = process.env.PORT || 3000

const hostname = '127.0.0.1';

app.use(routes);


app.listen(PORT, () => {
    console.log(`Server running on http://${hostname}:${PORT}/`);
});

export default app;