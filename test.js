'use strict';

var base58 = require('./base58.js');

//jshint expr:true

var chai = require('chai'),
    expect = chai.expect;

chai.should();

describe('encode',function(){
	it('should return string', function(){
		encode(2).should.equal('2');
	});
})


