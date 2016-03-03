TestWin10Package = require '../lib/test-win10-package'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "TestWin10Package", ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('test-win10-package')

  describe "when the test-win10-package:toggle event is triggered", ->
    it "hides and shows the modal panel", ->
      # Before the activation event the view is not on the DOM, and no panel
      # has been created
      expect(workspaceElement.querySelector('.test-win10-package')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.commands.dispatch workspaceElement, 'test-win10-package:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(workspaceElement.querySelector('.test-win10-package')).toExist()

        testWin10PackageElement = workspaceElement.querySelector('.test-win10-package')
        expect(testWin10PackageElement).toExist()

        testWin10PackagePanel = atom.workspace.panelForItem(testWin10PackageElement)
        expect(testWin10PackagePanel.isVisible()).toBe true
        atom.commands.dispatch workspaceElement, 'test-win10-package:toggle'
        expect(testWin10PackagePanel.isVisible()).toBe false

    it "hides and shows the view", ->
      # This test shows you an integration test testing at the view level.

      # Attaching the workspaceElement to the DOM is required to allow the
      # `toBeVisible()` matchers to work. Anything testing visibility or focus
      # requires that the workspaceElement is on the DOM. Tests that attach the
      # workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement)

      expect(workspaceElement.querySelector('.test-win10-package')).not.toExist()

      # This is an activation event, triggering it causes the package to be
      # activated.
      atom.commands.dispatch workspaceElement, 'test-win10-package:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        # Now we can test for view visibility
        testWin10PackageElement = workspaceElement.querySelector('.test-win10-package')
        expect(testWin10PackageElement).toBeVisible()
        atom.commands.dispatch workspaceElement, 'test-win10-package:toggle'
        expect(testWin10PackageElement).not.toBeVisible()
