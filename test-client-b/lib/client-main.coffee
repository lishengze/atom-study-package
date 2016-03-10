# Created by li.shengze on 2016/3/8.
# 客户端通信主程序, 用于创建子进程， 通过子进程与后台通信，并接受子进程传递的回调数据，再emit 出去。
{EventEmitter} = require 'events'
{fork}         = require 'child_process'

class ClientMain
 constructor: ->

 initialize: ->
   @emitter = new EventEmitter
   childFilePath = './client-child.js'
   @childProcess = fork childFilePath,[@emitter]
   @childProcess.on 'message', (data) =>          # 接受子进程传递的数据
     console.log 'client-main: from client-child \n' + data.callbackData
     @emitter.emit data.event, data.callbackData    # 将回调的数据通过 emit 发送出去。

module.exports = new ClientMain
