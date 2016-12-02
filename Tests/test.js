'use strict';

const should=require('should') ,
      sinon = require('sinon'),
      	chai = require('chai');

const expect = chai.expect;
const base58 = require('../Routes/base58.js');


chai.should();

describe('encode',function(){
	it('should return string', function(){
		encode(2).should.equal('2');
	});
})


