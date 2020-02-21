import chai from 'chai'
import spies from 'chai-spies'
import routes from '../routes/routes'
import chaiHttp from 'chai-http'
import ActionControllers from '../controllers/actions'
import Helper from '../helpers/auth'

const expect = chai.expect()

chai.use(chaiHttp)
chai.use(spies)

describe('Test routes', () => {
    it('gives welcome message', () => {
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200)
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
    it('signup should be a function', () => {
        expect(ActionControllers.signUp).to.throw(Error)
        done()
    })
    it('signin should be a function', () => {
        expect(ActionControllers.signIn).to.throw(Error);
        done()
    })
    it('createBankAccount should be a function', () => {
        expect(ActionControllers.createBankAccount).to.equal(Error)
        done()
    })
    it('SetNewStatus should throw error', () => {
        expect(ActionControllers.setNewStatus(req, res)).to.equal(Error)
        done()
    })
    it('SetPriviledge should throw error', () => {
        () => {
            expect(ActionControllers.setPriviledge(req, res)).to.equal(Error)
            done()
        }
    })

    it('should return a string token', () => {
        () => {
            let token = Helper.generateToken(hello);
            console.log(token);
            expect(token).to.be.string;
            done()
        }
    })

    it('Should return a value', () => {
        expect(Helper.hasNumber('Hello')).to.be.true
        done()
    })
    it('should not be valid', () => {
        expect(Helper.isValidEmail('asifiwe@gmail.com')).to.be.true
    })
})

//"test": "nyc --reporter=text mocha --require babel-register --require babel-polyfill ./server/tests/*.js --timeout 80000 --exit",






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
