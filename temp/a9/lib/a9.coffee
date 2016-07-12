A9View = require './a9-view'
{CompositeDisposable} = require 'atom'

module.exports = A9 =
  a9View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a9View = new A9View(state.a9ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a9View.getElement(), visible: false)
    console.log 'a9 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a9:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a9View.destroy()

  serialize: ->
    a9ViewState: @a9View.serialize()

  toggle: ->
    console.log 'A9 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
