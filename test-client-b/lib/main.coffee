TestClientView = require './test-client-view'
#ClientView = require './client-view'
{CompositeDisposable} = require 'atom'

module.exports = TestClient =
  testClientView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @testClientView = new TestClientView(state.testClientViewState)
    @modalPanel = atom.workspace.addmodalPanel(item: @testClientView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'test-client:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @testClientView.destroy()

  serialize: ->
    testClientViewState: @testClientView.serialize()

  toggle: ->
    console.log 'TestClient was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
