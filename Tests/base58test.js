'use strict';

const supertest = require("supertest");
const should = require("should");
const base58 = require("../Routes/base58.js");


describe("Encode 0 to string test" , function(){
	it("should return a string from number " , function(done){
		 base58.encode(0).should.be.equal('');
		 done();
	});
});
describe("Encode null to string test" , function(){
	it("should return a string from number " , function(done){
		 base58.encode().should.be.equal('');
		 done();
	});
});

describe("Encode number to string test" , function(){
	it("should return a string from number " , function(done){
		 base58.encode(100).should.be.equal('2J');
		 done();
	});
});

describe("Decode string 2j  to number 100 test" , function(){
	it("should return a string from number " , function(done){
		 base58.decode('2J').should.be.equal(100);
		 done();
	});
});

describe("Decode string 0  to number test" , function(){
	it("should return a string from number " , function(done){
		 base58.decode('0').should.be.equal(-1);
		 done();
	});
});

describe("Decode empty  to number test" , function(){
	it("should return a string from number " , function(done){
		 base58.decode('').should.be.equal(0);
		 done();
	});
});