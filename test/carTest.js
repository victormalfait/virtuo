const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../index");
const Car = require("../src/models/car");
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Car", () => {
  beforeEach((done) => { //Before each test we empty the database
    Car.remove().then(() => {
      done();
    });
  });
  describe("GET /car", () => {
    it("it should get all cars", (done) => {
     chai.request(app)
       .get('/car')
       .end((err, res) => {
         res.should.have.status(200);
         res.body.should.be.a('object');
         done();
        });
     });
  });
  describe('POST /car', () => {
    it('it should not POST a car with 2 characters name', (done) => {
      let car = {
        name: "Ty",
        available: true
      }
      chai.request(app)
        .post('/car')
        .send(car)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          done();
        });
    });
    it('it should POST a car ', (done) => {
      let car = {
        name: "Tyrus",
        available: true
      }
      chai.request(app)
        .post('/car')
        .send(car)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.car.should.have.property('_id');
          res.body.car.should.have.property('name');
          res.body.car.should.have.property('available');
          done();
        });
    });
  });
});
