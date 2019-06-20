# ShortUrl

Transform Long Url to Short Url with Node.js and MongoDB



# Usage

All the configuration information is in the file of "config.js".



(1) start your mongodb service

(2) git clone https://github.com/abner-gong/ShortUrl.git

(3) npm install package.json

(4) npm start



# Structure

│  app.js ---main route

│  config.js ---configuration

│  package-lock.json ---dependencies

│  package.json

│  README.md

│

├─bin

│      www

│

├─database

│      urlDB.js ---interact with mongoDB with mongoose

│

├─models

│      url.js ---schema of MongoDB

│

├─public ---nothing changed

│  ├─images

│  ├─javascripts

│  └─stylesheets

│          style.css

│

├─routes

│      index.js ---front page

│      longUrl.js ---when you post a long url in front page, it will return the short url generated

│      shortUrl.js ---when you visit a short url, it will redirect for you

│

├─test

│      utilTest.js ---some tests

│

├─utils

│      transform.js ---transform integer id to short url and short url to id

│

└─views

        error.ejs

        index.ejs ---front page

        shortUrl.ejs ---page when it return a short url

