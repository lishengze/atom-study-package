A5View = require './a5-view'
{CompositeDisposable} = require 'atom'

module.exports = A5 =
  a5View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a5View = new A5View(state.a5ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a5View.getElement(), visible: false)
    console.log 'a5 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a5:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a5View.destroy()

  serialize: ->
    a5ViewState: @a5View.serialize()

  toggle: ->
    console.log 'A5 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
