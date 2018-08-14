var http=require('http')
var Promise = require('bluebird')
var cheerio=require('cheerio')
var baseurl =  "http://www.imooc.com/learn"
var url= "http://www.imooc.com/learn/348"

function filterChapter(html){

    var $=cheerio.load(html)
    var chapter=$('.chapter')//learnchapter

    // [{
    //     chapterTitle:'',
    //     video:[
    //         title:''
    //         id:''
    //     ]
    // }]

    var courseData=[]
    chapter.each(function(){
        var chapter=$(this)
        var chapterTitle=chapter.find('strong').text();
        var videos=chapter.find('.video').children('li')
        var chapterData={
            chapterTitle:chapterTitle,
            videos:[]
        }
        videos.each(function(item){
            var video=$(this).find('.J-media-item') //studyvideo ==> J-media-item
            var videoTitle=video.text()
            var id=video.attr('href').split('video/')[1]

            chapterData.videos.push({   //video  ==> videos
                title:videoTitle,
                id:id
            })
        })

        courseData.push(chapterData)
    })
    return courseData
}

function printCourseInfo(courseData){
    courseData.forEach(function(item){   //item ==> item
        var chapterTitle=item.chapterTitle
        console.log(chapterTitle+'\n')

        item.videos.forEach(function(item){  //videos == videos
            console.log('  【'+item.id+' 】' +item.title+'\n')
        })
    })
}
function  getPageAsync(url) {
    return new Promise(function (resolve,reject) {
        console.log('正在爬取'+url);
        http.get(url,function(res){
            var html=''
            res.on('data', function(data){
                html+=data
            })
            res.on('end',function(){
                resolve(html);
                // var courseData=filterChapter(html)
                // printCourseInfo(courseData)
            })
        }).on('error',function(e) {
            reject(e)
            console.log('获取课程数据失败')
        })
    })
}
var fetchcourseArry =[];
videoId.forEach(function (id) {
    fetchcourseArry.push(getPageAsync(baseurl+id));
})
Promise.all([fetchcourseArry]).then(function (pages) {

})
