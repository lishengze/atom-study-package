SidebarView = require './sidebar-view'
{CompositeDisposable} = require 'atom'

module.exports =
  activate: (state) ->
    @sidebar = new SidebarView()
    @sidebarPanel = atom.workspace.addLeftPanel(item: @sidebar, visible: true)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

  deactivate: ->
    @sidebarPanel.destroy()
    @subscriptions.dispose()
    @sidebar.destroy()

  provideSidebar: ->
    addTile: @sidebar.addTile.bind(@sidebar)
    getTiles: @sidebar.getTiles.bind(@sidebar)
    togglePanel: @sidebar.togglePanel.bind(@sidebar)
