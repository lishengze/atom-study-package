TestWin10PackageView = require './test-win10-package-view'
{CompositeDisposable} = require 'atom'

module.exports = TestWin10Package =
  testWin10PackageView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @testWin10PackageView = new TestWin10PackageView(state.testWin10PackageViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @testWin10PackageView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'test-win10-package:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @testWin10PackageView.destroy()

  serialize: ->
    testWin10PackageViewState: @testWin10PackageView.serialize()

  toggle: ->
    console.log 'TestWin10Package was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
