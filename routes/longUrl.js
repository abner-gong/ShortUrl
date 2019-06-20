//将普通网址转换为短网址，并返回

var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var urlDB = require('../database/urlDB');
var long2short = urlDB['long2short'];
var Url = require('../models/url');
var count = urlDB['count'];
var transform = require('../utils/transform');
var id2short = transform['id2short'];
var id = 0;

//获取MongoDB当前的文档数量，从而初始化id
async function initId(){
	id = await count();
	console.log(id);
}
initId();

router.post('', async function(req, res, next) {
		var longUrl = req.body.longUrl;
		shortUrl = id2short(id);
		var queryRes = await long2short(longUrl, shortUrl);
		console.log(longUrl, shortUrl);
		console.log("query result", queryRes);
		if(queryRes)
			if(queryRes.longUrl == longUrl){
				if(queryRes.shortUrl == shortUrl)
					id++;
				fullShortUrl = req.host + ":/" + queryRes.shortUrl;
				res.render('shortUrl', { shortUrl: fullShortUrl });
			}
			else{
				console.log("该id的短网址已经被占用");
			}
});


module.exports = router;