A2View = require './a2-view'
{CompositeDisposable} = require 'atom'

module.exports = A2 =
  a2View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a2View = new A2View(state.a2ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a2View.getElement(), visible: false)
    console.log 'a2 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a2:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a2View.destroy()

  serialize: ->
    a2ViewState: @a2View.serialize()

  toggle: ->
    console.log 'A2 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
