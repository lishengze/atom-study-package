_ = require 'underscore-plus'
{Disposable} = require 'atom'
{ScrollView} = require 'atom-space-pen-views'
$=require('atom-space-pen-views').$

# DemoView 设置显示的内容。
# attacked
# detached
# initialize
# serialize

module.exports =
class DemoView extends ScrollView
  @content: ->
    @div class: 'timecop pane-item native-key-bindings', tabindex: -1, =>
       @div class: 'timecop-panel', =>
         @span 'realtimeChart1:'
         @div id: 'realtimeChart1'
         @span 'realtimeChart2:'
         @div id: 'realtimeChart2'
         @span 'realtimeChart3:'
         @div id: 'realtimeChart3'
         @span 'realtimeChart4:'
         @div id: 'realtimeChart4'
         @span 'realtimeChart5:'
         @div id: 'realtimeChart5'
         @span 'realtimeChart6:'
         @div id: 'realtimeChart6'
         @span 'realtimeChart7:'
         @div id: 'realtimeChart7'
         @span 'realtimeChart8:'
         @div id: 'realtimeChart8'
         @span 'realtimeChart9:'
         @div id: 'realtimeChart9'
         @span 'realtimeChart10:'
         @div id: 'realtimeChart10'
         @span 'realtimeChart11:'
         @div id: 'realtimeChart11'
         @span 'realtimeChart12:'
         @div id: 'realtimeChart12'
         @span 'realtimeChart13:'
         @div id: 'realtimeChart13'
         @span 'realtimeChart14:'
         @div id: 'realtimeChart14'
         @span 'realtimeChart15:'
         @div id: 'realtimeChart15'
         @span 'realtimeChart16:'
         @div id: 'realtimeChart16'
         @span 'realtimeChart17:'
         @div id: 'realtimeChart17'
         @span 'realtimeChart18:'
         @div id: 'realtimeChart18'
         @span 'realtimeChart19:'
         @div id: 'realtimeChart19'
         @span 'realtimeChart20:'
         @div id: 'realtimeChart20'

  attached: ->
    {setupDemo} = require './setupRealtimeChartDemo.js'
    setupDemo()

    {beginReceiveData} = require './setupRealtimeChartDemo.js'
    #beginReceiveData()

  detached: ->
    {stopReceiveData}=require './setupRealtimeChartDemo.js'
    #stopReceiveData()


  initialize: ({@uri}) ->
    # alert 'haha'
    # alert('summary is:'+@summary);
    # alert('summary class is:'+@summary.attr('class'));
    # alert('$ is:'+$('#d3Div').attr('class'));

  serialize: ->
    deserializer: @constructor.name
    uri: @getURI()

  getURI: -> @uri

  getTitle: -> 'RealtimeChart Demo'

  getIconName: -> 'dashboard'
