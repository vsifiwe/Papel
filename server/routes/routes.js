import { Router } from 'express';
const app = Router();
import Validate from '../helpers/validate'
import swaggerUI from 'swagger-ui-express'
let swaggerDocument = require('../../swagger.json')

import TransactionsController from '../controllers/transactions';
import AccountsController from '../controllers/accounts';
import UsersControllers from '../controllers/users';
import ActionControllers from '../controllers/actions'


app.use('/api-docs', swaggerUI.serve);
app.get('/api-docs', swaggerUI.setup(swaggerDocument));
app.get("/", (req, res) => { res.send("Welcome to papel") });
app.get('/transactions', Validate.verifyToken, TransactionsController.getAll);
app.get('/transactions/:transactionid', Validate.verifyToken, TransactionsController.getId)
app.get('/accounts', Validate.verifyToken, AccountsController.getAllAccounts)
app.get('/accounts/:accountnumber/transactions', Validate.verifyToken, AccountsController.getAccountTransactions)
app.get('/accounts/:accountnumber', Validate.verifyToken, AccountsController.getAccountDetails)
app.get('/user/:email/accounts', Validate.verifyToken, UsersControllers.getUserAccounts)
app.post('/auth/signup', ActionControllers.signUp)
app.post('/accounts/create', Validate.verifyToken, ActionControllers.createBankAccount)
app.post('/auth/signin', ActionControllers.signIn)
app.patch('/accounts/:accountnumber', Validate.verifyToken, ActionControllers.setNewStatus)
app.patch('/users/:type', Validate.verifyToken, ActionControllers.setPriviledge)
app.delete('/accounts/:accountnumber', Validate.verifyToken, ActionControllers.deleteAccount)
app.post('/transactions/:accountnumber/debit', Validate.verifyToken, TransactionsController.debit)
app.post('/transactions/:accountnumber/credit', Validate.verifyToken, TransactionsController.credit)
app.get('*', (req, res) => { res.send('The Page you are trying to access does not exist') })
app.post('*', (req, res) => { res.send('The Page you are trying to access does not exist') })
app.delete('*', (req, res) => { res.send('The Page you are trying to access does not exist') })

export default app;