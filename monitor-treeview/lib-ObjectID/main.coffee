SidebarIconView = require './sidebarIcon-view'
{CompositeDisposable} = require 'atom'
PanelView = require './panel-view.coffee'

creatGridDemo = (state)->
  Demo = require './gridDemoView.coffee'
  # console.log state
  @p = new Demo(state)

module.exports =
  consumeSidebar: (@sidebar) ->
    @panelView = new PanelView() #左侧 package内容栏
    @panel = atom.workspace.addLeftPanel(item: @panelView, visible: false)
    @sidebarIconView = new SidebarIconView(@panel)
    @sidebarTile = @sidebar.addTile(item: @sidebarIconView, priority: 1)


  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable
    window.index = 0
    atom.workspace.addOpener (filePath) ->
      pageId = filePath.substring(("atom://gridViewDemo").length)
      ++window.index;
      creatGridDemo(window.index)

    # console.log "TreeView pid: " + process.pid
  deactivate: ->
    @subscriptions?.dispose()
    @panel?.destroy()
    @sidebarIconView?.destroy()
    @sidebarTile?.destroy()

  serialize: ->
    # console.log 'serialize'
    monitorTreeviewViewState: @sidebarIconView.serialize()
