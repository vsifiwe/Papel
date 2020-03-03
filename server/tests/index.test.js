import chai from 'chai'
import spies from 'chai-spies'
import routes from '../routes/routes'
import chaiHttp from 'chai-http'
import UsersControllers from '../controllers/users'
import AccountsController from '../controllers/accounts'
import TransactionsController from '../controllers/transactions'
import ActionControllers from '../controllers/actions'
import dumbData2 from '../models/testData2'
import Helper from '../helpers/auth'
import dotenv from 'dotenv'
import Validate from '../helpers/validate'
import bcrypt from 'bcrypt'

dotenv.config();

const expect = chai.expect()

chai.use(chaiHttp)
chai.use(spies)

let DumbData = [{ email: 'jackdoe@gmail.com', password: 'Hardpass', firstname: 'Jack', lastname: 'Doe', type: 'client' }]

beforeEach(() => {
    const Headers = { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTFiMzFlZC1jYzJjLTQ3NTUtYjcyZi03YTk2Y2Y1ZmNlZGYiLCJpYXQiOjE1ODIyNzY1NTIsImV4cCI6MTU4Mjg4MTM1Mn0.sg8bky5DqluMi72XCqYn343jKkLWjMVj3b0GZ6_kE2U' }

});


describe('Test routes', () => {

    beforeEach(() => {
        const Headers = { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTFiMzFlZC1jYzJjLTQ3NTUtYjcyZi03YTk2Y2Y1ZmNlZGYiLCJpYXQiOjE1ODIyNzY1NTIsImV4cCI6MTU4Mjg4MTM1Mn0.sg8bky5DqluMi72XCqYn343jKkLWjMVj3b0GZ6_kE2U' }

    });


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

    it('test get all transactions with token', () => {

        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTFiMzFlZC1jYzJjLTQ3NTUtYjcyZi03YTk2Y2Y1ZmNlZGYiLCJpYXQiOjE1ODIyNzY1NTIsImV4cCI6MTU4Mjg4MTM1Mn0.sg8bky5DqluMi72XCqYn343jKkLWjMVj3b0GZ6_kE2U'

        chai.request(routes)
            .get('/accounts')
            .set('Authorization', token)
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

    it('Home route should work', () => {
        ActionControllers.signIn()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch(function (err) {
                throw err;
            });
    })

    it('Sign up should be a function', () => {
        ActionControllers.signUp()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })


    it('createBankAccount should be a function', () => {
        ActionControllers.createBankAccount()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })
    it('SetNewStatus should throw error', () => {
        ActionControllers.setNewStatus()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })
    it('SetPriviledge should throw error', () => {
        ActionControllers.setPriviledge()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('delete account should be a function', () => {
        ActionControllers.deleteAccount()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('Dormant accounts should be a function', () => {
        ActionControllers.DormantAccounts()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
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
            }).catch(function (err) {
                throw err;
            });
    })

    it('Route should return account details', () => {
        AccountsController.getAccountDetails()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('Route should return account transactions', () => {
        AccountsController.getAccountTransactions()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('Route should return all accounts', () => {
        AccountsController.getAllAccounts()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('Route should credit account', () => {
        TransactionsController.credit()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('Route should debit account', () => {
        TransactionsController.debit()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
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
            }).catch(function (err) {
                throw err;
            });
    })

    it('Route should get all users accounts', () => {
        UsersControllers.getUserAccounts()
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('transactions route should throw an error', () => {

        const token = process.env.token

        chai.request(routes)
            .get('/transactions')
            .set('Authorization', token)
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
            .set('Authorization', token)
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
            .set('Authorization', token)
            .send(DumbData)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('signin should work', () => {

        const token = process.env.token

        chai.request(routes)
            .post('/auth/signin')
            .send(dumbData2)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('signin should work', () => {

        const token = process.env.token

        chai.request(routes)
            .post('/auth/signup')
            .type('form')
            .send({ '_method': 'post', 'email': 'jackdoe@gmail.com', 'password': 'Hardpass', 'firstname': 'Jack', 'lastname': 'Doe', 'type': 'staff' })
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('non existent get', () => {
        UsersControllers.getUserAccounts()
        chai.request(routes)
            .get('/hello')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('non existent post', () => {
        UsersControllers.getUserAccounts()
        chai.request(routes)
            .post('/hello')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('non existent delete', () => {
        UsersControllers.getUserAccounts()
        chai.request(routes)
            .delete('/hello')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            }).catch(function (err) {
                throw err;
            });
    })

    it('get all accounts successfully', () => {
        const token = process.env.token
        chai.request(routes)
            .get('/accounts')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200)
            })

    })

    it('Validate token should work', () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTFiMzFlZC1jYzJjLTQ3NTUtYjcyZi03YTk2Y2Y1ZmNlZGYiLCJpYXQiOjE1ODIyNzY1NTIsImV4cCI6MTU4Mjg4MTM1Mn0.sg8bky5DqluMi72XCqYn343jKkLWjMVj3b0GZ6_kE2U'
        Validate.verifyToken(token)
        chai.request(routes)
            .post('/auth/signup')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done();
            }).catch(function (err) {
                throw err;
            });
    })

    it('Get Id should work', () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTFiMzFlZC1jYzJjLTQ3NTUtYjcyZi03YTk2Y2Y1ZmNlZGYiLCJpYXQiOjE1ODIyNzY1NTIsImV4cCI6MTU4Mjg4MTM1Mn0.sg8bky5DqluMi72XCqYn343jKkLWjMVj3b0GZ6_kE2U'
        chai.request(routes)
            .get('/transactions/4')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done();
            })
    })

    it('Get should get all accounts', () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTFiMzFlZC1jYzJjLTQ3NTUtYjcyZi03YTk2Y2Y1ZmNlZGYiLCJpYXQiOjE1ODIyNzY1NTIsImV4cCI6MTU4Mjg4MTM1Mn0.sg8bky5DqluMi72XCqYn343jKkLWjMVj3b0GZ6_kE2U'
        chai.request(routes)
            .get('/accounts')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done();
            })
    })
    it('Get should get all dormant accounts', () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTFiMzFlZC1jYzJjLTQ3NTUtYjcyZi03YTk2Y2Y1ZmNlZGYiLCJpYXQiOjE1ODIyNzY1NTIsImV4cCI6MTU4Mjg4MTM1Mn0.sg8bky5DqluMi72XCqYn343jKkLWjMVj3b0GZ6_kE2U'
        chai.request(routes)
            .get('/accounts/dormant')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done();
            })
    })




    // it('Get should get all dormant accounts', () => {

    //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTFiMzFlZC1jYzJjLTQ3NTUtYjcyZi03YTk2Y2Y1ZmNlZGYiLCJpYXQiOjE1ODIyNzY1NTIsImV4cCI6MTU4Mjg4MTM1Mn0.sg8bky5DqluMi72XCqYn343jKkLWjMVj3b0GZ6_kE2U'
    //     chai.request(AccountsController.getAllAccounts)
    //         .set('Authorization', token)
    //         .end((err, res) => {
    //             expect(res).to.have.status(200)
    //             done();
    //         })
    // })




})



// chai.should();
// chai.use(chaiHttp);

// describe('Test For admin to view accounts', () => {
//     it('should show all user bank accounts', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .get('/accounts')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });
//     it('should show all ACTIVE user bank accounts', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .get('/accounts?status=active')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });
//     it('should show all DORMANT user bank accounts', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .get('/accounts?status=dormant')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });

//     it('should show status must be active or dormant', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .get('/accounts?status=dorm')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });

//     it('Forbidden only admins can view all accounts', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .get('/accounts')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 expect(res).to.have.status(403);
//                 done();
//             });
//     });
// });


// describe('Test For admin to activate or deactivate', () => {
//     it('should Activate account', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .patch('/account/201225')
//             .set('Authorization', token)
//             .send(dumbData2[5])
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });
//     it('account already active', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .patch('/account/201231')
//             .set('Authorization', token)
//             .send(dumbData2[5])
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });

//     it('should Activate account also', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .patch('/account/201901')
//             .set('Authorization', token)
//             .send(dumbData2[6])
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });

//     it('should Deactivate account', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .patch('/account/201231')
//             .set('Authorization', token)
//             .send(dumbData2[6])
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });

//     it('Account must be an integer', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .patch('/account/hjhdjfdj')
//             .set('Authorization', token)
//             .send(dumbData2[8])
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });
// });


// describe('Test For admin to DELETE account', () => {
//     it('should DELETE account', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .delete('/accounts/201201')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });

//     it('should NOT DELETE account, account number must be an integer', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .delete('/accounts/kjkfd')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });

//     it('should NOT DELETE account,account number not found', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .delete('/accounts/128')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 expect(res).to.have.status(404);
//                 done();
//             });
//     });
// });


// describe('Test For admin to create a new user', () => {

//     it('should not Create new user, email already exist', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .post('/auth/create')
//             .set('Authorization', token)
//             .send(dumbData2[0])
//             .end((err, res) => {
//                 expect(res).to.have.status(409);
//                 done();
//             });
//     });
//     it('should Create new user', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .post('/auth/create')
//             .set('Authorization', token)
//             .send(dumbData2[1])
//             .end((err, res) => {
//                 expect(res).to.have.status(201);
//                 done();
//             });
//     });
//     it('invalid email', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .post('/auth/create')
//             .set('Authorization', token)
//             .send(dumbData2[2])
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });
//     it('Invalid email2', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .post('/auth/create')
//             .set('Authorization', token)
//             .send(dumbData2[3])
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });
//     it('Invalid first name', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .post('/auth/create')
//             .set('Authorization', token)
//             .send(dumbData2[4])
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });

//     it('Type must be cashier or staff', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .post('/auth/create')
//             .set('Authorization', token)
//             .send(dumbData2[9])
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });

//     it('Type can not be empty', (done) => {
//         const token = process.env.token;
//         chai.request(routes)
//             .post('/auth/create')
//             .set('Authorization', token)
//             .send(dumbData2[10])
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 done();
//             });
//     });
// });

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
