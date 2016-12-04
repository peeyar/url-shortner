'use strict';

const supertest = require("supertest");
const should = require("should");
const server = supertest.agent("http://localhost:5000");
const base58 = require("../Routes/base58.js");

// UNIT test begin

describe("Home page  test",function(){
	it("should return home page",function(done){
    // calling home page api
    server
    .get("/")
    .expect("Content-type","text/html; charset=UTF-8")
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
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

describe("302 unit test",function(){
	  it("should return 302",function(done){
	    server
	    .get("/random")
	    .expect(302)
	    .end(function(err,res){
	      res.status.should.equal(302);
	      done();
	    });
	  })
	});

