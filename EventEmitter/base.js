const Event = require('events');
const ev = new Event();
//订阅者
function price1() {
    console.log('大米涨价了');
}
ev.on('price',price1)
ev.on('price', function(thing) {
console.log(`${thing}涨价了`)
})
//发布者
ev.emit('price','大蒜');   //发布者可以携带信息 大蒜 ，在ev.on() 里接收到
ev.removeListener('price',price1);  //可以取消订阅
ev.emit('price','大蒜') ;
// once   只订阅一次  
ev.once('eat', () => {
    console.log('eat1');
})
ev.once('eat2', () => {
    console.log('eat2');
})
ev.emit('eat')
ev.emit('eat2')