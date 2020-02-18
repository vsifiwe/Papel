'use strict';

var _chai = require('chai');

var chai = _interopRequireWildcard(_chai);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var chaiHttp = require('chai-Http');
var expect = chai.expect;

chai.use(chaiHttp);

describe("Server!", function () {
    it("should return something", function (done) {
        chai.request(_index2.default).get("/transactions").end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.data).to.be.an('array');
            done();
        });
    });
});