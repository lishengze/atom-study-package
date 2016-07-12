A3View = require './a3-view'
{CompositeDisposable} = require 'atom'

module.exports = A3 =
  a3View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a3View = new A3View(state.a3ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a3View.getElement(), visible: false)
    console.log 'a3 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a3:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a3View.destroy()

  serialize: ->
    a3ViewState: @a3View.serialize()

  toggle: ->
    console.log 'A3 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
