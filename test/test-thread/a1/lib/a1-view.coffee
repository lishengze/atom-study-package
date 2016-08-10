{View} = require 'space-pen'
module.exports =
class A1View extends View
  @content: ->
    @div class:'header', =>
      @h1 'a1, left panel'
      @h2 outlet:'output', 'request value: '

  initialize: ->
