A12 = require '../lib/a12'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "A12", ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('a12')

  describe "when the a12:toggle event is triggered", ->
    it "hides and shows the modal panel", ->
      # Before the activation event the view is not on the DOM, and no panel
      # has been created
      expect(workspaceElement.querySelector('.a12')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.commands.dispatch workspaceElement, 'a12:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(workspaceElement.querySelector('.a12')).toExist()

        a12Element = workspaceElement.querySelector('.a12')
        expect(a12Element).toExist()

        a12Panel = atom.workspace.panelForItem(a12Element)
        expect(a12Panel.isVisible()).toBe true
        atom.commands.dispatch workspaceElement, 'a12:toggle'
        expect(a12Panel.isVisible()).toBe false

    it "hides and shows the view", ->
      # This test shows you an integration test testing at the view level.

      # Attaching the workspaceElement to the DOM is required to allow the
      # `toBeVisible()` matchers to work. Anything testing visibility or focus
      # requires that the workspaceElement is on the DOM. Tests that attach the
      # workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement)

      expect(workspaceElement.querySelector('.a12')).not.toExist()

      # This is an activation event, triggering it causes the package to be
      # activated.
      atom.commands.dispatch workspaceElement, 'a12:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        # Now we can test for view visibility
        a12Element = workspaceElement.querySelector('.a12')
        expect(a12Element).toBeVisible()
        atom.commands.dispatch workspaceElement, 'a12:toggle'
        expect(a12Element).not.toBeVisible()
