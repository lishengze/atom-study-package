path = require 'path'

fs = require 'fs-plus'
fuzzaldrin = require 'fuzzaldrin'
_ = require 'underscore-plus'
{CompositeDisposable} = require 'atom'
{$$, TextEditorView} = require 'atom-space-pen-views'

CollapsibleSectionPanel = require './collapsible-section-panel'
PackageCard = require './package-card'
ErrorView = require './error-view'
PackageManager = require './package-manager'

List = require './list'
ListView = require './list-view'
{ownerFromRepository, packageComparatorAscending} = require './utils'

module.exports =
class ThemesPanel extends CollapsibleSectionPanel
  @loadPackagesDelay: 300

  @content: ->
    @div class: 'panels-item', =>
      @div class: 'section packages themes-panel', =>
        @div class: 'section-container', =>
          @div class: 'section-heading icon icon-device-desktop', '选择主题'
          @div class: 'themes-picker', =>
            @div class: 'themes-picker-item control-group', =>
              @div class: 'controls', =>
                @label class: 'control-label', =>
                  @div class: 'setting-title themes-label text', 'UI主题'
                @div class: 'select-container', =>
                  @select outlet: 'uiMenu', class: 'form-control'

  initialize: (@packageManager) ->
    super
    @disposables = new CompositeDisposable()

    @disposables.add atom.themes.onDidChangeActiveThemes => @updateActiveThemes()
    @updateActiveThemes()

    @uiMenu.change =>
      @activeUiTheme = @uiMenu.val()
      @scheduleUpdateThemeConfig()

  dispose: ->
    @disposables.dispose()

  # Update the active UI and syntax themes and populate the menu
  updateActiveThemes: ->
    @activeUiTheme = @getActiveUiTheme()
    @activeSyntaxTheme = @getActiveSyntaxTheme()
    @populateThemeMenus()

  # Populate the theme menus from the theme manager's active themes
  populateThemeMenus: ->
    @uiMenu.empty()
    # @syntaxMenu.empty()
    availableThemes = _.sortBy(atom.themes.getLoadedThemes(), 'name')
    for {name, metadata} in availableThemes
      switch metadata.theme
        when 'ui'
          themeItem = @createThemeMenuItem(name)
          themeItem.attr('selected', true) if name is @activeUiTheme
          @uiMenu.append(themeItem)

  # Get the name of the active ui theme.
  getActiveUiTheme: ->
    for {name, metadata} in atom.themes.getActiveThemes()
      return name if metadata.theme is 'ui'
    null

  # Get the name of the active syntax theme.
  getActiveSyntaxTheme: ->
    for {name, metadata} in atom.themes.getActiveThemes()
      return name if metadata.theme is 'syntax'
    null

  # Update the config with the selected themes
  updateThemeConfig: ->
    themes = []
    themes.push(@activeUiTheme) if @activeUiTheme
    themes.push(@activeSyntaxTheme) if @activeSyntaxTheme
    atom.config.set("core.themes", themes) if themes.length > 0

  scheduleUpdateThemeConfig: ->
    setTimeout((=> @updateThemeConfig()), 100)

  # Create a menu item for the given theme name.
  createThemeMenuItem: (themeName) ->
    title = @getThemeTitle(themeName)
    $$ -> @option value: themeName, title

  # Get a human readable title for the given theme name.
  getThemeTitle: (themeName='') ->
    title = themeName.replace(/-(ui|syntax)/g, '').replace(/-theme$/g, '')
    _.undasherize(_.uncamelcase(title))
