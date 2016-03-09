path = require 'path'
_ = require 'underscore-plus'
Tile = require './tile'

class MonitorSidebarView extends HTMLElement
  createdCallback: ->
    @classList.add("monitor-sidebar-view")
    @tiles = []

  addTile: (options) ->
    newItem = options.item
    newPriority = options?.priority ? @tiles[@tiles.length - 1].priority + 1
    nextItem = null
    for {priority, item}, index in @tiles
      if priority > newPriority
        nextItem = item
        break

    newTile = new Tile(newItem, newPriority, @tiles)
    @tiles.splice(index, 0, newTile)
    newElement = atom.views.getView(newItem)
    nextElement = atom.views.getView(nextItem)
    @insertBefore(newElement, nextElement)
    newTile

  getTiles: ->
    @tiles

  togglePanel: (panel) ->
    leftPanels = atom.workspace.getLeftPanels()
    for p in leftPanels
      if p.getItem() is this
        continue
      if p is panel
        continue
      p.hide()
    if panel?.isVisible() then panel?.hide() else panel?.show()

  destroy: ->

module.exports = document.registerElement('monitor-sidebar', {prototype: MonitorSidebarView.prototype})
