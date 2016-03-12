# 参考treeView. 创建 panel， 在panel添加button进行测试.
{Disposable} = require 'atom'
{ScrollView} = require 'atom-space-pen-views'
clientMain   = require './client-main.js'

path         = require 'path'
{fork}       = require 'child_process'

console.log 'client-view!'

TestAddNewUser = ->  clientMain.childProcess.send {event: "TestAddNewUser", reqField: {}}
TestAddNewUserID_1 = ->  clientMain.childProcess.send {event: "TestAddNewUserID_1", reqField: {}}

reqData = {};
reqData.name = "tom";
reqData.age  = 24;
TestProcess = -> clientMain.childProcess.send {event: 'TestProcess', reqField: reqData}

clientMain.childProcess.on 'message', (data)->
     console.log 'client-view: from client-child'
     console.log data
     clientMain.emitter.emit data.event, data.callbackData

# TestAddNewUser();

# TestAddNewUserID_1();

# TestProcess();

module.exports =
class ClientView extends ScrollView
	@content: ->
		@div => @h1 "Test Client"
			@ol => @li click:'TestAddNewUser', "TestAddNewUser"

	@attached: ->
				# clientMain.emitter.on 'TestEmitter_Data', (data) ->
				# 	console.log('From client-view: ')
				# 	console.log(data);
	@detached: ->
