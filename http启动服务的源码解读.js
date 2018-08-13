var http = require('http')
http.createServer(function (req,res) {  //createServer创建服务
    res.writeHead(200,{'Content-Type':'text/plan'});
    res.write('hello nodejs');
    res.end();
}).listen(2015)

//http.js源码118行，地址：https://github.com/nodejs/node/blob/v0.12/lib/http.js
//_http_server.js 源码505行，地址：_http_server.jshttps://github.com/nodejs/node/blob/v0.12/lib/_http_server.js