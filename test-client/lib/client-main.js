// Created by li.shengze on 2016/3/8.
// 客户端通信主程序, 用于创建子进程， 通过子进程与后台通信，并接受子进程传递的回调数据，再emit 出去。
var EventEmitter = require ('events').EventEmitter;
var fork         = require ('child_process').fork;
<<<<<<< HEAD
var path         = require ('path');

console.log ('client-main.js!')

// var reqData = {};
// reqData.name = "tom";
// reqData.age  = 24;
//
// var testFunc = function () {
//   console.log("Hello testFunc");
// }

var ClientMain = function () {
   this.emitter = new EventEmitter
   this.childFilePath = path.join( __dirname, 'client-child-complete.js');
   console.log ("childFilePath: " + this.childFilePath);
   this.childProcess = fork (this.childFilePath, ['Hello client-child!']);
   console.log ('fork end!');

   // this.childProcess.send({event: 'function', ReqData: reqData});
=======

console.log ('client-main.js!')

var reqData = {};
reqData.name = "tom";
reqData.age  = 24;

var testFunc = function () {
  console.log("Hello testFunc");
}

var ClientMain = function () {

   this.emitter = new EventEmitter
   this.childFilePath = './client-child.js'

   this.childProcess = fork (this.childFilePath, ['Hello client-child!']);
   
   // this.childProcess.send({event: 'function', ReqData: reqData});   
>>>>>>> d84d0b4b656b57c793dd4f4af70dae694baf3d5d
   // this.childProcess.send({event: 'function', func: testFunc});
  //  this.childProcess.on ('message', function (data) {          // 接受子进程传递的数据
  //    console.log('client-main: from client-child \n');
  //    console.log(data);
  //    console.log("this: \n");
  //    console.log(this);
  //    this.emitter.emit(data.event, data.callbackData);    // 将回调的数据通过 emit 发送出去。
<<<<<<< HEAD
	// });
=======
	// });  
>>>>>>> d84d0b4b656b57c793dd4f4af70dae694baf3d5d
  // this.emitter.on('TestEmitter', function(data) {
  //   console.log('Client-main: from client-view, TestEmitter!');
  //   this.childProcess.send({event: 'TestEmitter', ReqData: data});
  // });
<<<<<<< HEAD

=======
  
>>>>>>> d84d0b4b656b57c793dd4f4af70dae694baf3d5d
}
module.exports = new ClientMain
