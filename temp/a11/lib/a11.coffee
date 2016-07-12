A11View = require './a11-view'
{CompositeDisposable} = require 'atom'

module.exports = A11 =
  a11View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a11View = new A11View(state.a11ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a11View.getElement(), visible: false)
    console.log 'a11 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a11:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a11View.destroy()

  serialize: ->
    a11ViewState: @a11View.serialize()

  toggle: ->
    console.log 'A11 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
