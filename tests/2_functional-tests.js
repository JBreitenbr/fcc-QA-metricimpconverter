const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
suite("Routing Tests", function () {
    suite("GET /api/convert => conversion object", function () {
      test("Convert 5km (valid input)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "5km" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 5);
            assert.equal(res.body.initUnit, "km");
            assert.approximately(res.body.returnNum, 3.106856, 0.1);
            assert.equal(res.body.returnUnit, "mi");
            done();
          });
      });

      test("Convert 50g (invalid input unit)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "50g" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initUnit, undefined);
            done();
          });
      });

      test("Convert 2/3/4L (invalid number)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "2/3/4L" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, undefined);
            done();
          });
      });

      test("Convert 2/3/4g (invalid number and unit)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "2/3/4g" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, undefined);
            assert.equal(res.body.initUnit, undefined);
            done();
          });
      });

      test("Convert mi (no number)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "mi" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, "mi");
            assert.approximately(res.body.returnNum, 1.60934, 0.1);
            assert.equal(res.body.returnUnit, "km");
            done();
          });
      });
    });
  });
});
