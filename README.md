# ShortUrl
Transform Long Url to Short Url with Node.js and MongoDB

# 设计思路
短地址由大小写字母、数字一共26+26+10=62个字符组成，五位短地址，共计62^5=9亿个地址。
五位短地址即为一个62进制五位数，表示为ABCDE。为了充分利用9亿个地址，我们不用hash或随机的方式，而用一个自增的整数来表示这个五位数。
随着服务器和数据库的增加，需要进行分布式的设计。
不过这里我只实现了基本的场景，对于分布式场景，需要有一台中控服务器，负责分配ID段，以及检测和迁移数据库。

## 场景一：一台服务器，一台MongoDB数据库
- 插入新的地址：
在服务器中维护一个ID，当收到新的Long URL时，ID++，这个ID转换为62进制，即为Long URL对应的短地址Short URL。将(Long URL, Short URL)和(Short URL, Long URL)均插入MongoDB。
- 查询地址：
    无论是Long URL还是short URL，直接查询key即可。
- 具体实现与API：
1. get '/': 将显示首页，里面有一个textbox和一个按钮，单击按钮，会将内容提交给下一步
2. post '/url' 将长网址提交：插入数据库并返回，如果已经存在则不插入，直接返回
3. get '/00000' 直接跳转到长网址，如果不存在则返回错误提示

## 场景二：多台服务器，一台MongoDB数据库
- 插入新的地址：
多台服务器，每台服务器维护自己的ID，假设第k个服务器的自增ID为IDk。我们单独开一台服务器，称为ID分配服务器，专门为其他服务器分配ID。
ID分配服务器内也维护了一个自增ID，但是它只包含前三位ABC。
当打开一台新的服务器时，服务器向ID分配服务器发送请求，ID分配服务器的ID自增，并将其发送给新服务器，假设为ABC，那么新服务器的ID的变化范围为ABC00 ~ ABC|61|61，当它的这个ID字段用完后，它要再次向ID分配服务器发出请求，ID分配服务器再给它新的前三位A'B'C'。
因为每个服务器的ID可用字段都是由ID分配服务器统一分配的，所以它们不会发生冲突。而且如果有一台服务器突然挂掉，那么这个字段可能会被浪费掉，此时我们最多只损失了61*61个地址。
- 查询地址：
   不变
- 具体实现思路：
主服务器代码只负责检查其他服务器的状态，并给其他服务器传递新的ID可用字段。从服务器与原来的相同

## 场景三：多台服务器，多台MongoDB数据库
- 插入新的地址：
服务器的ID分配策略同上。
至于ID被分配到了多台MongoDB数据库中，使用一致性hash。当产生新的数据库时，对数据库ID进行hash并从相邻的数据库中迁移数据。


# Usage

All the configuration information is in the file of "config.js".



(1) start your mongodb service

(2) git clone https://github.com/abner-gong/ShortUrl.git

(3) npm install

(4) npm start



# Structure and Description

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

# Schema
const urlSchema = new Schema({
    longUrl : { type: String, required: true, index: true, unique: true},
    shortUrl : { type: String, required: true, index: true, unique: true}
});

# API
前面有写，这里再重复一下
1. get '/': 将显示首页，里面有一个textbox和一个按钮，单击按钮，会将内容提交给下一步
2. post '/url' 将长网址提交：插入数据库并返回，如果已经存在则不插入，直接返回
3. get '/00000' 直接跳转到长网址，如果不存在则返回错误提示