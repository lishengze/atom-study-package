A6View = require './a6-view'
{CompositeDisposable} = require 'atom'

module.exports = A6 =
  a6View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @a6View = new A6View(state.a6ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @a6View.getElement(), visible: false)
    console.log 'a7 requestid: ' + ++window.requestid + ' pid: ' + process.pid
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'a6:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @a6View.destroy()

  serialize: ->
    a6ViewState: @a6View.serialize()

  toggle: ->
    console.log 'A6 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
