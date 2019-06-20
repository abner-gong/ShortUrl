var express = require('express');
var router = express.Router();
var urlDB = require('../database/urlDB');
var short2long = urlDB['short2long'];
var createError = require('http-errors');
/* GET home page. */


router.get('', async function(req, res, next) {
  console.log(req.shorturl);
  var queryRes = await short2long(req.shorturl);
  if(queryRes)
	  res.redirect(301, 'http://'+queryRes.longUrl);
  else
	  res.render('index', { title: "您请求的短网址并不存在" });
});

module.exports = router;