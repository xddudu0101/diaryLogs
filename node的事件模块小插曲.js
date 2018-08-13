var EventEmitter = require('events').EventEmitter
var life = new EventEmitter()
life.setMaxListeners(11)   //add listener,事件监听尽量不要超过10个

life.on('求安慰',function (who) {
    console.log('给我倒水'+who)
})
life.on('求安慰',function (who) {
    console.log('你想累死我啊。。'+who)
})
life.emit('求安慰','汉子')

var hasLConfortListner = life.emit('求安慰','汉子')
console.log(hasLConfortListner); //看看是否被监听过

//移除事件
function  water(who) {
    console.log('给我吃饭'+who)
}
life.removeListener('求安慰',water());