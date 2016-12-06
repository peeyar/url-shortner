'use strict';

const supertest = require("supertest");
const should = require("should");
const expect = require('chai').expect;

const server = supertest.agent("http://localhost:5000");

describe("Home page  test",function(){
	it("should return home page",function(done){
    // calling home page ...
    server
    .get("/")
    .expect("Content-type","text/html; charset=UTF-8")
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      should.not.exist(err);
      done();
    });
  });

});

describe("Getting the url back",function(){
	it("should redirecting to new page",function(done){
    // calling home page ...
    server
    .get("/29")
    .expect("Content-type","text/plain; charset=utf-8")
    .expect(302)     //Redirecting.
    .end(function(err,res){
      res.status.should.equal(302);
      should.not.exist(err);
      done();
    });
  });

});

describe("Post  test",function(){
	  it("should return a short url property",function(done){
	    server
	    .post('/api/shorten')
	    .send({url:'https://mail.google.com'})
	    .expect("Content-type","application/json; charset=utf-8")
	    .expect(200)
	    .end(function(err,res){
	      res.status.should.equal(200);
	      res.body.should.have.property('shortUrl').which.is.a.String;
	      done();
	    });
	  });
});


describe('/POST url', () => {
    it('it should not POST a wrong formatted url', (done) => {
          server	
          .post('/api/shorten')
          .send({url:'httpsmailgooglcom'})
          .end((err, res) => {
              res.status.should.equal(200);
              res.body.should.have.property('shortUrl').which.is.a.String;
              
            done();
          });
    });
   
});

