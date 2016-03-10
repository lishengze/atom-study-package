# 参考treeView. 创建 panel， 在panel添加button进行测试.
{Disposable} = require 'atom'
{ScrollView} = require 'atom-space-pen-views'
clientMain   = require './client-main.js'

TestAddNewUser = ->  clientMain.childProcess.send {event: "TestAddNewUser", reqField: {}}

clientMain.childProcess.on 'message', (data)->
     console.log 'client-view: from client-child'
     console.log data
     clientMain.emitter.emit data.event, data.callbackData  
	 
TestAddNewUser();

module.exports =
class ClientView extends ScrollView
	@content: ->
		@div =>
			@ol =>
				@li click:'TestAddNewUser', "TestAddNewUser"
	@attached: ->
				clientMain.emitter.on 'TestEmitter_Data', (data) ->
					console.log('From client-view: ')
					console.log(data);
	@detached: ->

# clientMain  = require './client-main.coffee'
# reqData = {};
# reqData.name = "tom";
# reqData.age  = 24;

# clientMain.emitter.on 'TestEmitterCallbackData', (data) ->
# 	console.log('From client-view: ')
# 	console.log(data);
										
# TestEmitter = -> clientMain.emitter.emit 'TestEmitter' , reqData

# TestProcess = -> clientMain.childProcess.send {event: 'TestEmitter', reqField: reqData}

# TestEmitter();
# TestProcess();
