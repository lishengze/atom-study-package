{EventEmitter} = require 'events'
{fork}         = require 'child_process'
io = require 'socket.io-client'
_ = require 'underscore-plus'
path = require 'path'

class ClientAPI
 _.extend @prototype, EventEmitter.prototype

 SERVER_URL: 'https://172.1.128.169:8000'

 constructor: ->
   @EVENTS = require './events.json'

 init: ->
   bgAPIPath = path.join __dirname, 'backgroundAPI.js'
   @worker = fork bgAPIPath, [@SERVER_URL]
   @worker.on 'message', (data) =>
     @emit data.event, data

module.exports=new ClientAPI
