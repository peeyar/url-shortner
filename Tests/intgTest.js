'use strict';

const supertest = require("supertest");
const should = require("should");
const expect = require('chai').expect;

const server = supertest.agent("http://localhost:5000");

// Here is the integration tests...


describe("Basic test" , function(){
	it('should return an object with key values' , function(done){
		server.get('/X')
			.set("Accept" ,'application/html')
			.expect(200)
			.end(function(err,res){
			   expect(res.body).to.have.property("url");
			   expect(res.body.url).to.not.equal(null);
			   expect(res.body).to.have.property("shortUrl");
			   expect(res.body).to.not.equal(null);
			   expect(res.body).to.have.property("_id");
			   done();
			});
	});
});

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

