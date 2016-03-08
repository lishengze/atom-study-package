SettingsView = null
settingsView = null

SnippetsProvider =
  getSnippets: -> atom.config.scopedSettingsStore.propertySets

configUri = 'atom://config'
uriRegex = /config\/([a-z]+)\/?([a-zA-Z0-9_-]+)?/i

createSettingsView = (params) ->
  SettingsView ?= require './settings-view'
  params.snippetsProvider ?= SnippetsProvider
  settingsView = new SettingsView(params)

openPanel = (panelName, uri) ->
  settingsView ?= createSettingsView({uri: configUri})
  options = uri: uri
  settingsView.showPanel(panelName, options)

deserializer =
  name: 'SettingsView'
  version: 2
  deserialize: (state) ->
    createSettingsView(state) if state.constructor is Object
atom.deserializers.add(deserializer)

module.exports =
  activate: ->
    atom.workspace.addOpener (uri) ->
      if uri.startsWith(configUri)
        settingsView ?= createSettingsView({uri})
        if match = uriRegex.exec(uri)
          panelName = match[1]
          panelName = panelName[0].toUpperCase() + panelName.slice(1)
          openPanel(panelName, uri)
        settingsView

    atom.commands.add 'atom-workspace',
      'settings-view:open': -> atom.workspace.open("#{configUri}/general")
      'settings-view:show-keybindings': -> atom.workspace.open("#{configUri}/keybindings")
      'settings-view:change-themes': -> atom.workspace.open("#{configUri}/themes")

  deactivate: ->
    settingsView?.dispose()
    settingsView?.remove()
    settingsView = null
