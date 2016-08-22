SidebarIconView = require './sidebarIcon-view'
{CompositeDisposable} = require 'atom'
PanelView = require './panel-view.coffee'

creatGridDemo = (state)->
  Demo = require './gridDemoView.coffee'
  # console.log state
  @p = new Demo(state)

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
    @subscriptions = new CompositeDisposable
    window.index = 0

    atom.workspace.addOpener (filePath) ->
      pageId = filePath.substring(("atom://gridViewDemo").length)
      pageId = getObjectID(pageId)
      console.log pageId

      if true == window.isPageID
        creatGridDemo({uri: filePath, index : pageId})
      else
        creatGridDemo({uri: filePath, index : ++window.index})

  deactivate: ->
    @subscriptions?.dispose()
    @panel?.destroy()
    @sidebarIconView?.destroy()
    @sidebarTile?.destroy()

  serialize: ->
    monitorTreeviewViewState: @sidebarIconView.serialize()
