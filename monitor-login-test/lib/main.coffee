MonitorLoginTestView = require './monitor-login-test-view'
LoginView = require './login-view'
{CompositeDisposable} = require 'atom'

module.exports = MonitorLoginTest =
  monitorLoginTestView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @monitorLoginTestView = new MonitorLoginTestView(state.monitorLoginTestViewState)
    @loginView = new LoginView()
    
    @modalPanel = atom.workspace.addModalPanel(item: @monitorLoginTestView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'monitor-login-test:toggle': => @toggle()
    @subscriptions.add atom.commands.add 'atom-workspace', 'monitor-login:show': => @loginView.show()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @monitorLoginTestView.destroy()

  serialize: ->
    monitorLoginTestViewState: @monitorLoginTestView.serialize()

  toggle: ->
    console.log 'MonitorLoginTest was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
