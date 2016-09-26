SidebarIconView = require './sidebarIcon-view'
{CompositeDisposable} = require 'atom'
PanelView = require './panel-view.coffee'
{RefreshChart} = require './refreshChart.js'
window.displayItem = []
window.Item = [];
page = null;

creatGridDemo = (state)->
  Demo = require './gridDemoView.coffee'
  # console.log state
  # @p = new Demo(state)
  window.Item[state.pageID] = new Demo(state)
 

window.getObjectID = (originalString) ->
  stringArray = originalString.split(".")
  transString = ""
  for value in stringArray
    transString += value
  return transString

module.exports =
  consumeSidebar: (@sidebar) ->
    @panelView = new PanelView() #左侧 package内容栏
    @panel = atom.workspace.addLeftPanel(item: @panelView, visible: false)
    @sidebarIconView = new SidebarIconView(@panel)
    @sidebarTile = @sidebar.addTile(item: @sidebarIconView, priority: 1)


  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable
    RefreshChart();
    window.index = 0
    window.registerRtnObjectAttrTopic   = false;
    window.IsRspQryOidRelationTopicDone = false;

    atom.workspace.onDidChangeActivePaneItem (item)->
      ## 当关掉最后一个页面时，item值为 undefined 因此要加个判断
      # console.log item
      if item == undefined
        return
      window.displayItem = [];
      window.displayItem[item.pageID] = true;

    atom.workspace.onDidDestroyPaneItem (event)->
      # console.log window.Item[event.item.pageID]
      console.log 'DestroyPaneItem!'
      console.log event
      # console.log window.Item[event.item.pageID].gridID
      window.Item[event.item.pageID].isClosed = true;

    atom.workspace.onDidDestroyPane (event)->
      console.log 'DestroyPane!'
      console.log event

    atom.workspace.addOpener (filePath) ->
      originalPageId = filePath.substring(("atom://gridViewDemo").length)
      transPageId = getObjectID(originalPageId)
      # console.log originalPageId
      creatGridDemo({uri: filePath, gridID : transPageId, pageID: originalPageId})

  deactivate: ->
    @subscriptions?.dispose()
    @panel?.destroy()
    @sidebarIconView?.destroy()
    @sidebarTile?.destroy()

  serialize: ->
    # console.log 'serialize'
    monitorTreeviewViewState: @sidebarIconView.serialize()
