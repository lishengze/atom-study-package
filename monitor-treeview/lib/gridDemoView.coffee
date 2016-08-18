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
      @div id : 'gridData', outlet:'gridData', =>
        # @div id : 'leftContainer'+ params.gridID, class: 'leftContainer', =>
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

    setup(@gridID, @pageID)




  detached: ->

  initialize: ({@uri,@gridID,@pageID}) ->
    console.log '@uri:    ' + @uri
    console.log '@gridID: ' + @gridID
    console.log '@pageID: ' + @pageID
    tmpGridID = @gridID;
    tmpPageID = @pageID

    # gridHtml = "<div id=\"leftContainer+"+ @gridID +"\" class=\"leftContainer\">\
    #                 <div id=\"gridOne+"+ @gridID +"\" class=\"gridOne AttrItem\">\
    #                  <div id=\"A.a\"></div>\
    #                 </div>\
    #               </div>";

    if @gridID === "Aa"
        @gridHtml = "<div id=\"leftContainerAa\" class=\"leftContainer\">\
                        <div id=\"gridOneAa\" class=\"gridOne AttrItem\">\
                          <div id=\"A.a\"></div>\
                        </div>\
                      </div>";
    else 
        @gridHtml = "<div id=\"leftContainerBb\" class=\"leftContainer\">\
                      <div id=\"gridOneBb\" class=\"gridOne AttrItem\">\
                        <div id=\"A.a\"></div>\
                      </div>\
                    </div>";

    @gridData.append(@gridHtml);

  serialize: ->
    deserializer: @constructor.name
    uri: @getURI()

  getURI: -> @uri

  getTitle: ->
    @uri.substring(19)
