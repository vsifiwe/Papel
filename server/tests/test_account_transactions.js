import * as chai from 'chai';
import app from '../index';
let chaiHttp = require('chai-Http');
let expect = chai.expect;

chai.use(chaiHttp)

describe("Server!", () => {
    it("should return something", done => {
        chai.request(app)
            .get("/transactions")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('array');
                done();
            });
    });
}
)
