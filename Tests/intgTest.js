'use strict';

const supertest = require("supertest");
const should = require("should");
const expect = require('chai').expect;

const server = supertest.agent("http://localhost:5000");

describe("Home page  test",function(){
	it("should return home page",function(done){
    // calling home page api...
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



describe('/POST url', () => {
    it('it should not POST a wrong formatted url', (done) => {
      let url = {
          url: "The Lord of the Rings"
      }
      chai.request(server)
          .post('/api/shorten')
          .send(url)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('pages');
              res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });
    it('it should POST a url ', (done) => {
      let url = {
          long_url: "https://hub.docker.com/r/peeyar/urlshorter/tags/"
      }
      chai.request(server)
          .post('/api/shorten')
          .send(book)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.book.should.have.property('_id');
              res.body.book.should.have.property('createdOn');
              res.body.book.should.have.property('long_url');
              
             done();
          });
    });
});

