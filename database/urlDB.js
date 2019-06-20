// default connection
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const mongoDB = 'mongodb://127.0.0.1/url';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

//const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Url = require('../models/url')

/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
*/
var id = 0;
var transform = require('../utils/transform');
var id2short = transform['id2short'];
var short2id = transform['short2id'];

/*
const client = new MongoClient(url, options);

client.connect(async function(err) {
	const db = client.db(dbName);
	const col = db.collection(colname);
	await col.createIndex({'longUrl':1}, {"unique":true, "name":"longUrlIndex"}, function(err, res){});
	await col.createIndex({'shortUrl':1}, {"unique":true, "name":"shortUrlIndex"}, function(err, res){});
	client.close();
}); 
*/

async function count(){
	return await Url.find()
		.countDocuments(function(err, res){ 
			return res;
		});
};

function findOne(query){
	console.log("findOne");
	return new Promise((resolve,reject)=>{
		Url.findOne(query)
		.exec(function(err, res){ 
			err?reject(err):resolve(res);
		});
	});
};

function blankContinue(res){
	console.log("blankContinue");
	return new Promise((resolve,reject)=>{
		res?reject({code:'0', data:res}):resolve(res);
	});
}

function insertOne(data){
	console.log("insert");
    return new Promise((resolve,reject)=>{
		(new Url(data)).save(function(err, res){ err?reject(err):resolve(data); })
    });
}

var long2short = async function(longUrl, shortUrl){
		var k = await findOne({'longUrl':longUrl})
		.then(blankContinue)
		.then(res => {return findOne({'shortUrl':shortUrl});})
		.then(blankContinue)
		.then(res => {return insertOne({'longUrl':longUrl, 'shortUrl':shortUrl})})
		.catch(e => {
			if(e.code == '0') return e.data; //() => new Promise((resolve,reject)=>{resolve(e.data)})
		});
		return k;
};

var short2long = async function(shortUrl){
	var k = await findOne({'shortUrl':shortUrl});
	return k;
}

async function testLong2Short(){
	var k = await long2short("www.baidu4.com", '00004');	
	console.log(k);	
}

async function testShort2Long(){
	var k = await short2long('fiesj');	
	console.log(k);	
}

async function testCount(){
	var k = await count();	
	console.log(k);	
}



module.exports = {'long2short': long2short, 'short2long': short2long, 'count': count};
