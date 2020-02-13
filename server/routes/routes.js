import { Router } from 'express';
const app = Router();

import { transactions_all, transactions_id } from '../controllers/transactions';
import { all_account_transactions } from '../controllers/accounts';
import { all_account_email } from '../controllers/users';

app.get('/transactions', transactions_all);
app.get('/transactions/:id', transactions_id);
app.get('/accounts/transactions/:accountnumber', all_account_transactions);
app.get('/user/accounts/:email', all_account_email);

export default app;