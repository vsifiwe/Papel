import { Router } from 'express';
const app = Router();

import { transactions_all, transactions_id } from '../controllers/transactions';

app.get('/transactions', transactions_all);
app.get('/transactions/:id', transactions_id);

export default app;