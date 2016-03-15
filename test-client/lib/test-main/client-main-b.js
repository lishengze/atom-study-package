// Created by li.shengze on 2016/3/8.
// 客户端通信主程序, 用于创建子进程， 通过子进程与后台通信，并接受子进程传递的回调数据，再emit 出去。
var EventEmitter = require ('events').EventEmitter;
var fork         = require ('child_process').fork;
var path         = require ('path');

console.log ('client-main.js!')


var ClientMain = function () {
   this.emitter = new EventEmitter;
//   this.childFilePath = path.join( __dirname, 'client-child-simple.js');
   this.childFilePath = path.join( __dirname, 'client-child-complete-b.js');
//   this.childFilePath = path.join( __dirname, 'client-child-complete-simple.js');
   console.log ("childFilePath: " + this.childFilePath);
   this.childProcess = fork (this.childFilePath, ['Hello client-child!']);
   console.log ('fork end!');

   this.callbackFunc = (function(_this) {
     return function(data) {
       return _this.emitter.emit(data.event, data.callbackData);
      }
   })(this);
   //
  //  this.childProcess.on ('message', this.callbackFunc);

  //  this.childProcess.on ('message', (function(_this) {
  //    return function(data) {
  //      return _this.emitter.emit(data.event, data.callbackData);
  //     }
  //  })(this));
}

// ClientMain.childProcess.on('message', function(_this) {
//    return function(data) {
//      return _this.emitter.emit(data.event, data.callbackData);
//     }
//  })(this));

module.exports = new ClientMain();
