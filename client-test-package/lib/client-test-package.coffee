ClientTestPackageView = require './client-test-package-view'
{CompositeDisposable} = require 'atom'

module.exports = ClientTestPackage =
  clientTestPackageView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @clientTestPackageView = new ClientTestPackageView(state.clientTestPackageViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @clientTestPackageView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'client-test-package:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @clientTestPackageView.destroy()

  serialize: ->
    clientTestPackageViewState: @clientTestPackageView.serialize()

  toggle: ->
    console.log 'ClientTestPackage was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
