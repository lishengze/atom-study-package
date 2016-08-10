A1View = require './a1-view'
{CompositeDisposable} = require 'atom'
window.requestid = 0

module.exports = A1 =

  activate: (state) ->
    @loginView = new A1View()
    @subscriptions = new CompositeDisposable
    # @subscriptions.add atom.commands.add('atom-workspace', {
    #   'monitor-login:show': => @loginView.show()
    # })

    console.log 'a1 requestid: ' + ++window.requestid + ' pid: ' + process.pid

  deactivate: ->
    @subscriptions.dispose()

  # activate: (state) ->
  #   @a1View = new A1View(state.a1ViewState)
  #   @modalPanel = atom.workspace.addLeftPanel(item: @a1View.content, visible: true)
  #
  #   # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
  #   @subscriptions = new CompositeDisposable
  #
  #   # Register command that toggles this view
  #   @subscriptions.add atom.commands.add 'atom-workspace', 'a1:toggle': => @toggle()
  #
  # deactivate: ->
  #   @modalPanel.destroy()
  #   @subscriptions.dispose()
  #
  # serialize: ->
  #
  # toggle: ->
  #   console.log 'A1 was toggled!'
  #
  #   if @modalPanel.isVisible()
  #     @modalPanel.hide()
  #   else
  #     @modalPanel.show()
