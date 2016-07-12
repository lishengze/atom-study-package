A10View = require './a10-view'
{CompositeDisposable} = require 'atom'

module.exports = A10 =
  a10View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a10View = new A10View(state.a10ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a10View.getElement(), visible: false)
    console.log 'a10 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a10:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a10View.destroy()

  serialize: ->
    a10ViewState: @a10View.serialize()

  toggle: ->
    console.log 'A10 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
