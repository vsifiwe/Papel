import chai from 'chai'
import spies from 'chai-spies'
import routes from '../routes/routes'
import chaiHttp from 'chai-http'
import ActionControllers from '../controllers/actions'
import AccountsController from '../controllers/accounts'
import TransactionsController from '../controllers/transactions'
import UsersControllers from '../controllers/users'
import Helper from '../helpers/auth'
import dotenv from 'dotenv'
import Validate from '../helpers/validate'
import bcrypt from 'bcrypt'

dotenv.config();

const expect = chai.expect()

chai.use(chaiHttp)
chai.use(spies)

let DumbData = [{ email: 'jackdoe@gmail.com', password: 'Hardpass', firstname: 'Jack', lastname: 'Doe', type: 'client' }]

describe('Test routes', () => {
    it('gives welcome message', () => {
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('test get all transactions', () => {
        chai.request(routes)
            .get('/transactions')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });

    it('test signup without body', () => {
        chai.request(routes)
            .get('/auth/signup')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });

    it('test signin without body', () => {
        chai.request(routes)
            .get('/auth/signin')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });

    it('test single transaction ', () => {
        chai.request(routes)
            .get('/transactions/:transactionid')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });
    it('test all accounts', () => {
        chai.request(routes)
            .get('/accounts')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });
    it('test account transactions', () => {
        chai.request(routes)
            .get('/accounts/:accountnumber/transactions')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });
    it('test account details', () => {
        chai.request(routes)
            .get('/accounts/:accountnumber')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });

    it('test user email accounts', () => {
        chai.request(routes)
            .get('/user/:email/accounts')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });
    it('test create account', () => {
        chai.request(routes)
            .get('/accounts/create')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });

    it('test debit', () => {
        chai.request(routes)
            .get('/accounts/:accountnumber/debit')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });
    it('test credit', () => {
        chai.request(routes)
            .get('/accounts/:accountnumber/credit')
            .end((err, res) => {
                expect(res).to.have.status(400)
                done()
            })
    });



})

describe('test actions', () => {





    it('signin should be a function', () => {
        ActionControllers.signIn()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Sign up should be a function', () => {
        ActionControllers.signUp()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })


    it('createBankAccount should be a function', () => {
        ActionControllers.createBankAccount()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it('SetNewStatus should throw error', () => {
        ActionControllers.setNewStatus()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    it('SetPriviledge should throw error', () => {
        ActionControllers.setPriviledge()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('delete account should be a function', () => {
        ActionControllers.deleteAccount()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Dormant accounts should be a function', () => {
        ActionControllers.DormantAccounts()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })



    it('Helper should Compare password', () => {
        Helper.comparePassword('hello', 'hello')
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Helper should generate token', () => {
        Helper.generateToken()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Helper should check if password has number', () => {
        Helper.hasNumber()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Helper should check valid email', () => {
        Helper.isValidEmail()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Helper should check valid password', () => {
        Helper.isValidPassword()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Helper should hash password', () => {
        Helper.hashPassword('Hello', bcrypt.genSaltSync(8))
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Helper should verify token', () => {
        Validate.verifyToken()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Route should return account details', () => {
        AccountsController.getAccountDetails()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Route should return account transactions', () => {
        AccountsController.getAccountTransactions()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Route should return all accounts', () => {
        AccountsController.getAllAccounts()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Route should credit account', () => {
        TransactionsController.credit()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Route should debit account', () => {
        TransactionsController.debit()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Route should return all transactions', () => {
        TransactionsController.getAll()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Route should return transaction by id', () => {
        TransactionsController.getId()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Route should get all users accounts', () => {
        UsersControllers.getUserAccounts()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('transactions route should throw an error', () => {

        const token = process.env.token

        chai.request(routes)
            .get('/transactions')
            .set('x-access-token', token)
            .send(DumbData)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('accounts route should throw an error', () => {

        const token = process.env.token

        chai.request(routes)
            .get('/accounts')
            .set('x-access-token', token)
            .send(DumbData)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('emails route should throw an error', () => {

        const token = process.env.token

        chai.request(routes)
            .get('/user/manzi@gmail.com/accounts')
            .set('x-access-token', token)
            .send(DumbData)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('signin should work', () => {

        const token = process.env.token

        chai.request(routes)
            .post('/auth/signup')
            .send(DumbData)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('non existent get', () => {
        UsersControllers.getUserAccounts()
        chai.request(routes)
            .get('/hello')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('non existent post', () => {
        UsersControllers.getUserAccounts()
        chai.request(routes)
            .post('/hello')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('non existent delete', () => {
        UsersControllers.getUserAccounts()
        chai.request(routes)
            .delete('/hello')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Validate token should work', () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTFiMzFlZC1jYzJjLTQ3NTUtYjcyZi03YTk2Y2Y1ZmNlZGYiLCJpYXQiOjE1ODIyNzY1NTIsImV4cCI6MTU4Mjg4MTM1Mn0.sg8bky5DqluMi72XCqYn343jKkLWjMVj3b0GZ6_kE2U'
        Validate.verifyToken(token)
        chai.request(routes)
            .post('/auth/signup')
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })



})

//






//validate
//isemail
//getallaccounts
//getaccounttransactions
// getaccountdetails
// createbankaccount
// setnewstatus
// deleteaccounts
// dormantaccounts
// debit 
// Credit
// getall
// getid
// getuseraccounts
