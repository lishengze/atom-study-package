TestClientView = require './test-client-view'
{CompositeDisposable} = require 'atom'
ClientView     = require './client-view';
# path         = require 'path'
# {fork}       = require 'child_process'

module.exports = TestClient =
  testClientView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @testClientView = new TestClientView(state.testClientViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @testClientView.getElement(), visible: false)

    @clientView = new ClientView();
    @leftPanel = atom.workspace.addLeftPanel(item: @clientView, visible:false);

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'test-client:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @clientView.destroy()
    @subscriptions.dispose()
    @testClientView.destroy()

  serialize: ->
    testClientViewState: @testClientView.serialize()

  toggle: ->
    #console.log 'TestClient was toggled!'
    # g_childFilePath = path.join __dirname, './client-child-simple.js'
    # console.log 'test-client g_childFilePath: ' + g_childFilePath
    # g_childProcess  = fork g_childFilePath, ['Hello World!']
    # console.log 'test-client fork end!'

    # if @modalPanel.isVisible()
    #   @modalPanel.hide()
    # else
    #   @modalPanel.show()

    if @leftPanel.isVisible()
      @leftPanel.hide()
    else
      @leftPanel.show()
