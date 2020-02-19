import { Router } from 'express';
const app = Router();
import authHelper from '../helpers/auth'

import TransactionsController from '../controllers/transactions';
import AccountsController from '../controllers/accounts';
import UsersControllers from '../controllers/users';
import ActionControllers from '../controllers/actions'

app.get("/", (req, res) => { res.send("Welcome to papel") });
app.get('/transactions', TransactionsController.getAll);
app.get('/transactions/:transactionid', TransactionsController.getID)
app.get('/accounts', AccountsController.getAllAccounts)
app.get('/accounts/:accountnumber/transactions', AccountsController.getAccountTransactions)
app.get('/accounts/:accountnumber', AccountsController.getAccountDetails)
app.get('/user/:email/accounts', UsersControllers.getUserAccounts)
app.post('/key', ActionControllers.keyGenerate)
app.post('/auth/signup', ActionControllers.signUp)
app.post('/accounts/create', ActionControllers.createBankAccount)
app.post('/auth/signin', authHelper.verifyToken, ActionControllers.signIn)
app.post('/accounts', AccountsController.createBankAccount)
// app.post('/accounts/:accountnumber/debit')
// app.get('/accounts/:accountnumber/transactions', all_account_transactions);
// app.get('/user/:email/accounts', all_account_email);
// app.get('/accounts', all_accounts);
// app.get('/accounts/:accountnumber', specific_account_details);

export default app;

// all_accounts from accounts.js not finished