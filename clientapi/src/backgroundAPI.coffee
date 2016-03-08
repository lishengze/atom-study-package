io = require 'socket.io-client'
EVENTS = require './events.json'
SERVER_URL = process.argv[process.argv.length-1]

webSocket = io.connect(SERVER_URL,{secure:true});
webSocket.on EVENTS.FrontConnected, (data) ->
  process.send {event:EVENTS.FrontConnected, data: data}

webSocket.on EVENTS.RspQrySysUserLoginTopic, (data) ->
  process.send {event:EVENTS.RspQrySysUserLoginTopic, data: data}

#处理父进程传来的消息
process.on 'message', (cmd) ->
  webSocket.emit cmd
