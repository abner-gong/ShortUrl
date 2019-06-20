var transform = require('../utils/transform');
var ch2num = transform['ch2num'];
var id2short = transform['id2short'];
var short2id = transform['short2id'];
var assert = require('assert');

function utilTest(){
	assert(ch2num('9') == 9);
	assert(ch2num('A') == 10);
	assert(ch2num('a') == 36);
	assert(id2short(61) == '0000z');
	assert(short2id('zzzzz') == 916132831);
}

module.exports = utilTest;