var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var util = require('util');

const multer = require('multer');
const upload = multer();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', index);

//ai 文字识别
var AipOcr = require('./src/index').ocr;
var fs = require('fs');
var http = require('http');
//设置APPID/AK/SK（前往百度云控制台创建应用后获取相关数据）
var APP_ID = "＊＊＊＊＊＊＊";
var API_KEY = "＊＊＊＊＊＊";
var SECRET_KEY = "＊＊＊＊＊＊＊＊";
var client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);
var img = fs.readFileSync('assets/2333.png');
app.post('/imgInfo',upload.single("file"),function(req,res){
    if(!req.file) {
        next(new UnprocessableEntityError("上传内容解析失败"))
    } else {
        fs.writeFileSync('./back.png',req.file.buffer);
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        var base64Img = new Buffer(req.file.buffer).toString('base64');
        client.generalBasic(base64Img).then(function (result) {
            res.end(JSON.stringify(result));
        });
    }
});

//设置图片旋转
var fs = require('fs'), 
    gm = require('gm');
app.get('/changePic',function(req,res){
    gm('assets/2333.png')
    .rotate('red', -30)
    .write('assets/output.png', function (err) {
      if (!err) {
          console.log('done');
      }else{
          console.log(err);
      }
    });
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    res.end('ok');
});

var app = http.createServer(app);
app.listen(4000, function () {
    console.log('listening on 4000');
});