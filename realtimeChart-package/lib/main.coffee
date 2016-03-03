#ViewUri 是什么？
ViewUri = 'atom://realtimeChart'

createView = (state) ->
  DemoView = require './realtimeChart-view'
  new DemoView(state) #返回了一个新建的DemoView 对象， 作用？

atom.deserializers.add
  name: 'RealtimeChartView'
  deserialize: (state) -> createView(state)

module.exports =
  activate: ->
    atom.workspace.addOpener (filePath) ->
      createView(uri: ViewUri) if filePath is ViewUri

    atom.commands.add 'atom-workspace', 'realtimeChart-package:view', ->
      atom.workspace.open(ViewUri)
