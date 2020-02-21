import chai from 'chai'
import routes from '../routes/routes'
import chaiHttp from 'chai-http'

const expect = chai.expect()

chai.use(chaiHttp)

describe('Test routes', () => {
    it('gives welcome message', () => {
        chai.request(routes)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.contain("welcome to papel")
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

})

//validate
//isemail
//getallaccounts
//getaccounttransactions
// getaccountdetails
// signup
// signin
// createbankaccount
// setnewstatus
// deleteaccounts
// dormantaccounts
// debit 
// Credit
// getall
// getid
// getuseraccounts
