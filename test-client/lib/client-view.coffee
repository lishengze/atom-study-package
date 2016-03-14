# 参考treeView. 创建 panel， 在panel添加button进行测试.
{Disposable} = require 'atom'
{ScrollView} = require 'atom-space-pen-views'
path         = require 'path'
{fork}       = require 'child_process'

#
# clientMain   = require './client-main.js'
# console.log 'client-view!'
#
# TestAddNewUser = ->  clientMain.childProcess.send {event: "TestAddNewUser", reqField: {}}
# TestAddNewUserID_1 = ->  clientMain.childProcess.send {event: "TestAddNewUserID_1", reqField: {}}
#
# reqData = {};
# reqData.name = "tom";
# reqData.age  = 24;
# TestProcess = -> clientMain.childProcess.send {event: 'TestProcess', reqField: reqData}
#
# clientMain.childProcess.on 'message', (data)->
#      console.log 'client-view: from client-child'
#      console.log data
#      clientMain.emitter.emit data.event, data.callbackData

# TestAddNewUser();

# TestAddNewUserID_1();

# TestProcess();

TestAddNewUser = -> console.log 'Hello  TestAddNewUser!'

module.exports =
class ClientView extends ScrollView
  @content: ->
    @div =>
      @h1 "Client View is alive!"
      @button click: 'TestAddNewUser',  "TestAddNewUser"
      @button click: 'TestAddNewUserID_1', "TestAddNewUserID_1"

  clientMain = require './client-main.coffee'
  console.log 'client-view!'

  TestAddNewUser: ->
    console.log 'TestAddNewUser!'
    clientMain.childProcess.send {event: "TestAddNewUser", reqField: {}}

  TestAddNewUserID_1: ->
    console.log 'TestAddNewUserID_1!'
    clientMain.childProcess.send {event: "TestAddNewUserID_1", reqField: {}}

  # clientMain.childProcess.on 'message', (data)->
  #      console.log 'client-view: from client-child'
  #      console.log data

  @attached: ->


  @detached: ->

  # clientMain.childProcess.on 'message', (data)->
  #     console.log 'client-view: from client-child'
  #     console.log data
  #     clientMain.emitter.emit data.event, data.callbackData
  # TestAddNewUser: -> console.log 'Hello  TestAddNewUser!'
  # TestAddNewUserID_1: -> console.log 'Hello  TestAddNewUserID_1!'
    #
    # reqData = {};
    # reqData.name = "tom";
    # reqData.age  = 24;
    # TestProcess = -> clientMain.childProcess.send {event: 'TestProcess', reqField: reqData}
