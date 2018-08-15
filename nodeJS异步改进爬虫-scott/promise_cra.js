var http=require('http')
var Promise = require('bluebird')
var cheerio=require('cheerio')
var baseurl =  "http://www.imooc.com/learn"
var url = 'http://www.imooc.com/learn/348'
var videoIds = [348,259,197,134,75]
function filterChapter(html){

    var $=cheerio.load(html)
    var chapter=$('.chapter')//learnchapter
    var header = $('.course-infos');
    var title = parseInt($('#page_header .path span').text().trim(),10);
    //这个人数值是浏览器端异步渲染的，http.get只会获取第一次服务器返回的HTML代码，所以这里获取不到number
    var number = $($('.info_num i')[0]).text();
    // courseData = {  期待的数据结构
    //     title:title,
    //     number:number,
    //     videos: [{
    //         chapterTitle:'',
    //         videos:[
    //             title: '',
    //             id: ''
    //         ]
    //     }]
    // }


    var courseData={
        title:title,
        number:number,
        videos:[],
    }
    chapter.each(function(){
        var chapter=$(this)
        var chapterTitle=chapter.find('strong').text();
        var videos=chapter.find('.video').children('li')
        var chapterData={    //创建对象准备保存数据
            chapterTitle:chapterTitle,
            videos:[]
        }
        videos.each(function(item){
            var video=$(this).find('.J-media-item') //studyvideo ==> J-media-item
            var videoTitle=video.text().replace(/(^\s+)|(\s+$)/g, ""); //获取视频标题(去除空格)
            var id=video.attr('href').split('video/')[1]

            chapterData.videos.push({   //video  ==> videos
                title:videoTitle,
                id:id
            })
        })
        courseData.videos.push(chapterData)
    })
    return courseData
}

function printCourseInfo(courseData){
    courseData.forEach(function (coursesData) {
        console.log(coursesData.number+'人学过'+coursesData.title +'\n')
    })
    courseData.forEach(function (courseData) {
        console.log('###' + courseData.title + '\n');
        courseData.forEach(function(item){   //item ==> item
            var chapterTitle=item.chapterTitle
            console.log(chapterTitle+'\n')

            item.videos.forEach(function(item){  //videos == videos
                console.log('  【'+item.id+' 】' +item.title+'\n')
            })
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
    var courseData=[];
    pages.forEach(function (html) {
        var courses = filterChapter(html);
        courseData.push(courses);
    })
    courseData.sort(function (a,b) {
        return a.number<b.number;
    })
    printCourseInfo(coursesData);
})
