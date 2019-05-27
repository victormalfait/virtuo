const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../index");
const Station = require("../src/models/station");
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Station", () => {
  beforeEach((done) => { //Before each test we empty the database
    Station.remove().then(() => {
      done();
    });
  });
  describe("GET /station", () => {
    it("it should get all stations", (done) => {
     chai.request(app)
       .get('/station')
       .end((err, res) => {
         res.should.have.status(200);
         res.body.should.be.a('object');
         done();
        });
     });
  });
  describe('POST /station', () => {
    it('it should not POST a station with 2 characters name', (done) => {
      let station = {
        name: "Al"
      }
      chai.request(app)
        .post('/station')
        .send(station)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        });
    });
    it('it should POST a station ', (done) => {
      let station = {
        name: "Aubervilliers"
      }
      chai.request(app)
        .post('/station')
        .send(station)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.station.should.have.property('_id');
          res.body.station.should.have.property('name');
          done();
        });
    });
  });
});
