# 节点信息显示模块
_ = require 'underscore-plus'
{Disposable} = require 'atom'
{ScrollView} = require 'atom-space-pen-views'
$=require('atom-space-pen-views').$

module.exports =
class Demo extends ScrollView
  @content : (params) ->
    @div class: 'baobiaoContainer pane-item native-key-bindings timecop', tabindex: -1, =>
      @div class: 'block',=>
        @button  class: 'SplitScreenBtn btn btn-lg', id:'ASplitScreen', '一分屏'
        @button  class: 'SplitScreenBtn btn btn-lg', id: 'BinaryScreen', '二分屏'
        @button  class: 'SplitScreenBtn btn btn-lg', id:'ThreeSplitScreen', '三分屏'
        @button  class: 'SplitScreenBtn btn btn-lg', id: 'FourSplitScreen', '四分屏'
      @div id : 'gridData', =>
      # @div id : 'leftContainer'+ params.gridID, class: 'leftContainer', =>
      #   @div id: 'gridOne'  + params.gridID, class: 'gridOne AttrItem', =>
      #     @div id: params.pageId
          # @div id: 'gridOneDEF', =>
          #   @div id: 'gridOne.H.I.J'
      # @div id: 'rizhi' + params.index, class: 'rizhi AttrItem'
      # @div id: 'DisUsageModel' + params.index, class: 'UsageModel AttrItem', =>
      #   @div id: 'DisUsageToolbar' + params.index, class: 'toolbar k-grid-toolbar'
      #   @div id: 'DisUsage' + params.index, class: 'highstockChart'
      # @div id: 'CPUUsageModel' + params.index, class: 'UsageModel AttrItem', =>
      #   @div id: 'CPUUsageToolbar' + params.index, class: 'toolbar k-grid-toolbar'
      #   @div id: 'CPUUsage' + params.index, class: 'highstockChart'
      # @div id: 'TestUsageModel' + params.index, class: 'UsageModel AttrItem', =>
      #   @div id: 'TestUsageToolbar' + params.index, class: 'toolbar k-grid-toolbar'
      #   @div id: 'TestUsage' + params.index, class: 'highstockChart'
  attached: ->
    {setup}=require './gridDemo.js'

    setup(@gridID, @pageId)

  detached: ->

  initialize: ({@uri,@gridID,@pageId}) ->
    # console.log @uri
    # console.log @index
    # console.log @pageId
  serialize: ->
    deserializer: @constructor.name
    uri: @getURI()

  getURI: -> @uri

  getTitle: ->
    @uri.substring(19)
