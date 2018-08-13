var http = require('http')
var querystring = require('querystring')
var postData = querystring.stringify({
    'content':'一起期待下一期的课程',
    'cid':348
})
var options ={
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docomment',
    method:'POST',
    headers:{
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.9',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'UM_distinctid=161e218ee0376-0505165bc0573f-e323462-100200-161e218ee0447a; imooc_uuid=43a8f157-1186-4af6-8641-7548648ff439; imooc_isnew_ct=1519916713; imooc_isnew=2; CNZZDATA1261110065=1898085265-1519914083-https%253A%252F%252Fwww.baidu.com%252F%7C1524575847; loginstate=1; apsid=hhYmVhNDM4ODlmYWUzMWVkYTYyYTcxNWIyNzRjNjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAzMjU5NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMzY1MTEzNzA2QHFxLmNvbQAAAAAAAAAAAAAAAAAAADVlNGZhYmFmMDgxY2NkZDk1MGE0N2EyMDViY2I5OTQ1Hb1vWx29b1s%3DMj; last_login_username=2365113706%40qq.com; IMCDNS=0; PHPSESSID=4id3oqksr5boq0hv0d6nj5ffq1; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1534048159,1534048577,1534076037,1534168542; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1531750410,1534048577,1534076037,1534168542; Hm_lpvt_fb538fdd5bd62072b6a984ddbc658a16=1534202207; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1534202207; cvde=5b718dda56cdd-32',
        'Host':'www.imooc.com',
        'Origin':'https://www.imooc.com',
        'Referer':'https://www.imooc.com/qa/637/t/0',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
}
var req = http.request(options,function (res) {
    console.log('status'+ res.statusCode);
    console.log('headers:'+ JSON.stringify(res.headers));
    res.on('data',function (chunk) {
        console.log(Buffer.isBuffer(chunk))
        console.log(typeof  chunk);
    })
    res.on('end',function () {
        console.log('评论完毕')
    })

})
req.on('err',function (e) {
    console.log('err'+e.message);
})
req.write(postData);
req.end();