import { Router } from 'express';
const app = Router();

import { transactions_all, transactions_id } from '../controllers/transactions';
import { all_account_transactions, all_accounts, specific_account_details } from '../controllers/accounts';
import { all_account_email } from '../controllers/users';

app.get("/", (req, res) => { res.send("Welcome to papel") });
app.get('/transactions', transactions_all);
app.get('/transactions/:id', transactions_id);
app.get('/accounts/:accountnumber/transactions', all_account_transactions);
app.get('/user/:email/accounts', all_account_email);
app.get('/accounts', all_accounts);
app.get('/accounts/:accountnumber', specific_account_details);

export default app;

// all_accounts from accounts.js not finished