# 参考treeView. 创建 panel， 在panel添加button进行测试.
{Disposable} = require 'atom'
{ScrollView} = require 'atom-space-pen-views'
clientMain = require './client-main.coffee'
TestEmitter = -> clientMain.emitter.emit 'TestEmitter' , {}

module.exports =
class ClientView extends ScrollView
	@content: ->
		@div =>
			@ol =>
				@li click:'TestEmitter', "TestEmitter"
	@attached: ->
				clientMain.emitter.on 'TestEmitter_Data', (data) ->
					console.log('From client-view: ')
					console.log(data);
	@detached: ->
