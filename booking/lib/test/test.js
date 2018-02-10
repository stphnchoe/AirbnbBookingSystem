var mocha = require('mocha');
var expect = require('chai').expect;
var moment = require('moment');
var agent = require('supertest-koa-agent');
var server = require('../../server/index.js');
var api = agent(server.app);

describe('User', () => {
  beforeEach(function(done) {
    api.post('/booking')
      .set('Accept', 'application/json')
      .send({
        listing_id: "ac929980-ab00-4acd-98b0-a772be583be9",
        reserve_date: "2018-05-04",
        book_time:	1518217639476,
        book_user_id: "9af0e292-921e-4250-a235-1564a83f3c8a",
        host_id: "a59bc0a0-baff-4c7f-af39-052349dc8624"
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        done();
      });
  });

  it('should return a booked date for a listing id', function(done) {

    api.get('/booking/ac929980-ab00-4acd-98b0-a772be583be9')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(Array.isArray(res.body)).to.be.true;
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property('reserve_date');
        expect(res.body[0].reserve_date).to.not.equal(null);
        done();
      });
  });

  it('should return a 500 status code for a listing_id that does not exist', function(done) {
    api.get('/booking/34137afd-7cc3-4704-9cb2-d2b13e762ded')
      .set('Accept', 'application/json')
      .expect(500)
      .end(function(err, res) {
        done();
      });
  });

  it('should return a 500 status code for a POST to /booking that is a past date', function(done) {
    api.post('/booking')
      .set('Accept', 'application/json')
      .send({
        listing_id: "ac929980-ab00-4acd-98b0-a772be583be9",
        reserve_date: "2000-01-01",
        book_time:	1518217639476,
        book_user_id: "9af0e292-921e-4250-a235-1564a83f3c8a",
        host_id: "a59bc0a0-baff-4c7f-af39-052349dc8624"
      })
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        done();
      });
  });

  it('should return a 200 status code for a post to /booking that is already booked at the date', function(done) {
    api.post('/booking')
      .set('Accept', 'application/json')
      .send({
        listing_id: "ac929980-ab00-4acd-98b0-a772be583be9",
        reserve_date: "2018-05-04",
        book_time:	1518217639476,
        book_user_id: "9af0e292-921e-4250-a235-1564a83f3c8a",
        host_id: "a59bc0a0-baff-4c7f-af39-052349dc8624"
      })
      .expect('Content-Type', /text/)
      .expect(200)
      .end(function(err, res) {
        done();
      });
  });

  it('should return the same number of booked dates for a listing id', function(done) {
    api.get('/booking/ac929980-ab00-4acd-98b0-a772be583be9')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(Array.isArray(res.body)).to.be.true;
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property('reserve_date');
        expect(res.body[0].reserve_date).to.not.equal(null);
        done();
      });
  });

  it('should return a 201 status code for a post to /booking that is a new reservation', function(done) {
    api.post('/booking')
      .set('Accept', 'application/json')
      .send({
        listing_id: "ac929980-ab00-4acd-98b0-a772be583be9",
        reserve_date: "2018-05-05",
        book_time:	1518217739476,
        book_user_id: "9af0e292-921e-4250-a235-1564a83f3c8a",
        host_id: "a59bc0a0-baff-4c7f-af39-052349dc8624"
      })
      .expect('Content-Type', /text/)
      .expect(201)
      .end(function(err, res) {
        done();
      });
  });

  it('should return the same number of booked dates for a listing id', function(done) {
    api.get('/booking/ac929980-ab00-4acd-98b0-a772be583be9')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(Array.isArray(res.body)).to.be.true;
        expect(res.body).to.have.lengthOf(2);
        expect(res.body[0]).to.have.property('reserve_date');
        expect(res.body[0].reserve_date).to.not.equal(null);
        expect(res.body[1]).to.have.property('reserve_date');
        expect(res.body[1].reserve_date).to.not.equal(null);
        done();
      });
  });

});