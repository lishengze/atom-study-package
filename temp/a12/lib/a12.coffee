A12View = require './a12-view'
{CompositeDisposable} = require 'atom'

module.exports = A12 =
  a12View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a12View = new A12View(state.a12ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a12View.getElement(), visible: false)
    console.log 'a12 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a12:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a12View.destroy()

  serialize: ->
    a12ViewState: @a12View.serialize()

  toggle: ->
    console.log 'A12 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
