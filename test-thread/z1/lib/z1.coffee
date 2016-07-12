Z1View = require './z1-view'
{CompositeDisposable} = require 'atom'

module.exports = Z1 =
  z1View: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @z1View = new Z1View(state.z1ViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @z1View.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'z1:toggle': => @toggle()

    console.log 'z1 window.id: ' + window.id
    
  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @z1View.destroy()

  serialize: ->
    z1ViewState: @z1View.serialize()

  toggle: ->
    console.log 'Z1 was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
