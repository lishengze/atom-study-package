A4View = require './a4-view'
{CompositeDisposable} = require 'atom'

module.exports = A4 =
  a4View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a4View = new A4View(state.a4ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a4View.getElement(), visible: false)
    console.log 'a4 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a4:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a4View.destroy()

  serialize: ->
    a4ViewState: @a4View.serialize()

  toggle: ->
    console.log 'A4 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
