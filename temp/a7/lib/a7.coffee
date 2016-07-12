A7View = require './a7-view'
{CompositeDisposable} = require 'atom'

module.exports = A7 =
  a7View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a7View = new A7View(state.a7ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a7View.getElement(), visible: false)
    console.log 'a7 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a7:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a7View.destroy()

  serialize: ->
    a7ViewState: @a7View.serialize()

  toggle: ->
    console.log 'A7 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
