import * as chai from 'chai';
import app from '../index';
import { chaiHttp } from 'chai-http';
let expect = chai.expect;

chai.use(chaiHttp);
describe("Server!", () => {
    it("", done => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
}
)
