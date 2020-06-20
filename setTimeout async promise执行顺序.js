/**
 *  fileName:setTimeout async promise执行顺序
 *  time:2019-12-3
 *  todo:setTimeout async promise执行顺序
 *  在JavaScript的异步代码执行时：


 如果遇到await，就将await执行后，后面的代码放入等待队列（因为async和await的本质还是promise的运用，返回的是一个promise对象）。
 备注：async是generator的语法糖， 只是把generator的function后面的*换成了前面的async，把yield换成了await。运行原理是一样的，都是为了解决JS的异步操作问题，毕竟JS是单线程的。


 如果遇到promise的then和catch，也同样放入等待队列，二者优先级相同，在同步代码结束后按照队列的先入先出原则执行。


 如果遇到setTimeout的话，也是同样放在等待队列，但是是不同的等待队列，优先级低于await和promise。

 作者：Sleepy 😪
 链接：https://juejin.im/post/5d7e0e136fb9a06b2262e415
 来源：掘金
 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */


async function async1() {
  console.log("async1 start");
  await  async2();
  console.log("async1 end");

}
async  function async2() {
  console.log( 'async2');
}
console.log("script start");
setTimeout(function () {
  console.log("settimeout");
},0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log('script end');

/*
* script start
*
* async1 start
*  async2
*
* promise1
* script end
*
* 进入队列
* promise2
* async1 end
*
* settimeout
*
*
* 先执行同步代码，遇到异步代码就先加入队列，然后按入队的顺序执行异步代码，最后执行setTimeout队列的代码
* setTimeout的任务队列优先级低于promise队列
* */
