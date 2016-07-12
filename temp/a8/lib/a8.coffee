A8View = require './a8-view'
{CompositeDisposable} = require 'atom'

module.exports = A8 =
  a8View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a8View = new A8View(state.a8ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a8View.getElement(), visible: false)
    console.log 'a7 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a8:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a8View.destroy()

  serialize: ->
    a8ViewState: @a8View.serialize()

  toggle: ->
    console.log 'A8 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
