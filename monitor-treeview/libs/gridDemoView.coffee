# 节点信息显示模块
_ = require 'underscore-plus'
{Disposable} = require 'atom'
{ScrollView} = require 'atom-space-pen-views'
$=require('atom-space-pen-views').$

module.exports =
class Demo extends ScrollView
  @content : (params) ->
    @div class: 'baobiaoContainer pane-item native-key-bindings timecop', tabindex: -1, =>
      @div class: 'block', outlet:'block', =>
        @button  class: 'SplitScreenBtn btn btn-lg', id:'ASplitScreen', '一分屏'
        @button  class: 'SplitScreenBtn btn btn-lg', id: 'BinaryScreen', '二分屏'
        @button  class: 'SplitScreenBtn btn btn-lg', id:'ThreeSplitScreen', '三分屏'
        @button  class: 'SplitScreenBtn btn btn-lg', id: 'FourSplitScreen', '四分屏'
      @div id : 'gridData', outlet:'gridData', =>
      @div id : 'chartData', outlet: 'chartData', =>

  attached: ->
    {setup}=require './gridDemo.js'

    setup(this)    

  detached: ->
    console.log @pageID + ' have been detached!'
    this.ChartItem = []

  initialize: ({@uri,@gridID,@pageID}) ->
    
  serialize: ->
    # deserializer: @constructor.name
    # uri: @getURI()

  @deserialize: (state) ->
    # new Demo(state)

  getURI: -> @uri

  getTitle: ->
    @uri.substring(19)
