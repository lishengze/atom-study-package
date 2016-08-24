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
        # @div id : 'leftContainer'+ pa+rams.gridID, class: 'leftContainer', =>
        #   @div id: 'gridOne'  + params.gridID, class: 'gridOne AttrItem', =>
        #     @div id: params.pageID
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

    setup(this)    

  detached: ->

  initialize: ({@uri,@gridID,@pageID}) ->
    
  serialize: ->
    # deserializer: @constructor.name
    # uri: @getURI()

  @deserialize: (state) ->
    # new Demo(state)

  getURI: -> @uri

  getTitle: ->
    @uri.substring(19)
