// Created by li.shengze on 2016/3/8.
// 客户端通信主程序, 用于创建子进程， 通过子进程与后台通信，并接受子进程传递的回调数据，再emit 出去。
var EventEmitter = require ('events').EventEmitter;
var fork         = require ('child_process').fork;
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
//   this.childFilePath = path.join( __dirname, 'client-child-simple.js');
   this.childFilePath = path.join( __dirname, 'client-child-complete.js');
//   this.childFilePath = path.join( __dirname, 'client-child-complete-simple.js');
   console.log ("childFilePath: " + this.childFilePath);
   this.childProcess = fork (this.childFilePath, ['Hello client-child!']);
   console.log ('fork end!');
}

module.exports = new ClientMain
