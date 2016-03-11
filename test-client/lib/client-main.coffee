# Created by li.shengze on 2016/3/8.
# 客户端通信主程序, 用于创建子进程， 通过子进程与后台通信，并接受子进程传递的回调数据，再emit 出去。
{EventEmitter} = require 'events'
{fork}         = require 'child_process'
path           = require 'path'

console.log 'client-main.coffee!'

class ClientMain
 # constructor: ->
 #
 #init: ->
   @emitter = new EventEmitter
   childFilePath = path.join  __dirname, 'client-child-simple.js'
   console.log "childFilePath: " + childFilePath
   @childProcess = fork childFilePath

module.exports = new ClientMain
