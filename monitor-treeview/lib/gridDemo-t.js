_ = require('underscore-plus');

var gridOnedata = {title : '属性列表' }
var containerLeft = 0;
var screenLeft = 587;
var screenWidth = $('.baobiaoContainer').width() - containerLeft - 20
var borderWidth = 6
var containerHeight = window.innerHeight - 50
var toolbarHeight = 20.5
var highchartsHeight =containerHeight - toolbarHeight//

var templateModel = kendo.template("<strong style = 'color:indianred'>#: title #  </strong>\
                                    <i  class = 'gridMax fa fa-clone'></i>\
                                    <i  class = ' gridClose fa fa-times'></i>")

function setup(gridViewPointer) {

  window.configData = getConfigData();

  registerGridDataReceiveFunc(gridViewPointer);

  registerRtnObjectAttrTopic();

  initializeGrid(gridViewPointer);

}

function registerGridDataReceiveFunc(gridViewPointer) {
      var gridDataEventName = gridViewPointer.gridID;      
      userApi.emitter.on(gridDataEventName, function(gridRspData){
          // console.log("gridDataEventName: " + gridDataEventName);
          var transGridData = transformGridData(gridRspData.rspData);
          var dataSource = new kendo.data.DataSource({data:transGridData});

          // var gridSelector1 = $('#'+gridNodeId);
          // var grid1 = gridSelector1.data("kendoGrid");
          // grid1.setDataSource(dataSource);

          var gridNodeId = 'gridOne'
          var gridSelector2 = $(gridViewPointer.gridData.find('#'+gridNodeId));   
          var grid2 = gridSelector2.data("kendoGrid");
          grid2.setDataSource(dataSource);

          // console.log (gridSelector1.html());
          // console.log (grid1);
          // console.log (gridSelector2.html());
          // console.log (grid2);                     
      })
}

function initializeGrid(gridViewPointer) {
  // var gridHtml = "<div id=\"leftContainer\"  class=\"leftContainer \">\
  //                <div id=\"gridOne\" class=\"gridOne AttrItem\">\
  //                <div id=\""+gridViewPointer.pageID+"\"></div></div></div>"  

  var gridHtml = "<div id=\"leftContainer\"  class=\"leftContainer \">\
                 <div id=\"gridOne\" class=\"gridOne AttrItem\"></div></div>"                   

  gridViewPointer.gridData.append(gridHtml);

  var gridSelector = $(gridViewPointer.gridData.find('#gridOne'));

  gridSelector.kendoGrid({
    scrollable: false,
    resizable: true,
    toolbar:  templateModel(gridOnedata),
    columns: [{
     field: '指标名称',
    }, {
     field: '指标ID',
    }
    ],
    selectable: "multiple cell",
    sortable: true
  });

  registerGridItemDblClickFunc(gridViewPointer);
  // console.log(gridSelector.html());

  containerLeft = $('.gridOne').width() + 15;

  gridViewPointer.ChartItem = [];
  gridViewPointer.ChartDataCallTime = [];
    
}

function registerGridItemDblClickFunc(gridViewPointer) {

    var gridItemSelector = $(gridViewPointer.gridData.find('.gridOne, td'))
    // console.log("gridViewPointer.pageID: " + gridViewPointer.pageID);
    // console.log("gridViewPointer.gridID: " + gridViewPointer.gridID);
    gridItemSelector.dblclick(function(e) {
      var selectedRows = $(e.target);

      var objectID = gridViewPointer.pageID;
      var HoldObjectID = selectedRows[0].textContent;

      console.log ('ObjectID: ' + objectID);
      console.log ('HoldObjectID: ' + HoldObjectID);      

      if (gridViewPointer.ChartItem[HoldObjectID] !== true) {
        initializeChart(gridViewPointer, HoldObjectID);
        reqQrySubscriberFunc(objectID, HoldObjectID);
        gridViewPointer.ChartItem[HoldObjectID] = true;
        // console.log (gridViewPointer.ChartItem);
      }      
    });
}

function initializeChart(gridViewPointer, chartID) {
  var gridHtml = "<div id=\"" + chartID + "Model\" class=\"AttrItem\">\
                  <div id=\"" + chartID + "Toolbar\"></div>\
                  <div id=\"" + chartID + "\"></div></div>"  

  gridViewPointer.chartData.append(gridHtml);
  // console.log (gridViewPointer.chartData.html());

  var curChartSelector = $(gridViewPointer.chartData.find('#'+chartID));
  var curChartModelSelector = $(gridViewPointer.chartData.find('#'+chartID+'Model'));
  var curChartToolbarSelector = $(gridViewPointer.chartData.find('#'+chartID+'Toolbar'));

   // console.log ('containerLeft: ' + containerLeft);
  console.log ('char process id : ' + process.pid);
  curChartModelSelector.css({'left'   : containerLeft+40, 'top' : 0, 
                             'width'  : 500, 
                             'height' : 500});

  var highchartsToolbar = {title : chartID}
  // curChartToolbarSelector.html(templateModel(highchartsToolbar));

  curChartSelector.highcharts('StockChart', {
    chart: {
      animation: false,
      marginTop: 30
      },
      height : window.innerHeight - 50,
      reflow: true,
      xAxis: {
        // enabled: true,
        type: 'datetime'
        // categories: []
      },
      rangeSelector: {
          enabled: false
      },
      yAxis: {
        // max: 101, // 控制Y轴最大值，设成101是为了能显示100的grid
        // min: 0, // 设定y轴最小值
        // minTickInterval: 0,
        // tickAmount: 6, // 控制y轴标线的个数
        // tickPixelInterval: 10, // 控制标线之间的中间间隔。
        title: {
          text: chartID
        },
        // allowDecimals: false, // 是否显示小数。
        opposite: false
      },
      scrollbar: {
        enabled: false
      },
      exporting: {
        enabled :false
      },
      credits: {
        enabled: false // 禁用版权信息
      },
      series: [{
            name: 'AttrValue',
            data: []
             }]
      })

  var chart = curChartSelector.highcharts();
  // chart.turboThreshold = 40000;
  chart.setSize(curChartModelSelector.width(), curChartModelSelector.height() - toolbarHeight, false);
  // curChartModelSelector.hide();
  
  var updateTime = 1000;
  setChartData(gridViewPointer, curChartModelSelector, chart, chartID, updateTime);  
}

function setChartData(gridViewPointer, curChartModelSelector, chart, chartID, updateTime) {
  var rtnDataName = gridViewPointer.pageID+'.'+chartID;
  var chartDataX = [];
  var chartDataY = [];
  var dataNumb = 0;
  var isRealTime = false;
  var realTimeLine = 1;

  var nonRealTimeChartData = [];
  var isFirstTime = true;
  gridViewPointer.ChartDataCallTime[rtnDataName] = [];


  userApi.emitter.on (rtnDataName, function(data){
    // console.log(data);
    // var curTime = (new Date()).toTimeString().substring(0,8);
    // console.log('data.MonTime: ' + data.MonTime);
    // console.log('curTime:      ' + curTime);
    // console.log(MinusTime(curTime, data.MonTime));

    if (true === isFirstTime) {
      gridViewPointer.ChartDataCallTime[rtnDataName][0] = (new Date()).toTimeString().substring(0,8);
      isFirstTime = false;
    }
    
    gridViewPointer.ChartDataCallTime[rtnDataName][1] = (new Date()).toTimeString().substring(0,8);

    if (true === isRealTime) {
      addDataToChart(chart , data);
    } else {      
      ++dataNumb;
      nonRealTimeChartData.push([tranTimeToUTC(data.MonDate, data.MonTime), parseFloat(data.AttrValue)]); 

      // console.log ('0: ' + gridViewPointer.ChartDataCallTime[rtnDataName][0]);
      // console.log ('1: ' + gridViewPointer.ChartDataCallTime[rtnDataName][1]);

      if (MinusTime(gridViewPointer.ChartDataCallTime[rtnDataName][0],
                    gridViewPointer.ChartDataCallTime[rtnDataName][1]) > realTimeLine ) {

          isRealTime = true;

          chart.series[0].setData(nonRealTimeChartData);

          // curChartModelSelector.show();
          // console.log(dataNumb);
      } else {
        gridViewPointer.ChartDataCallTime[rtnDataName][0] = gridViewPointer.ChartDataCallTime[rtnDataName][1];
      }
    }

    // gridViewPointer.ChartDataCallTime[rtnDataName][0] = gridViewPointer.ChartDataCallTime[rtnDataName][1];

  });  
}

function tranTimeToUTC(dateString, timeString) {
  var dateArray = [];
  dateArray[0] = parseFloat(dateString.substring(0,4));
  dateArray[1] = parseFloat(dateString.substring(4,6));
  dateArray[2] = parseFloat(dateString.substring(6));

  var timeArray = timeString.split(':');
  for (var i = 0; i<timeArray.length; ++i) {
    timeArray[i] = parseFloat(timeArray[i]);
  }

  var utctime = Date.UTC(dateArray[0], dateArray[1], dateArray[2], 
                        timeArray[0], timeArray[1], timeArray[2]);

  return utctime;
}

function addDataToChart(chart, data) {
  var series = chart.series[0];
  // series.addPoint([data.MonTime, parseFloat(data.AttrValue)], true, true);
  series.addPoint([tranTimeToUTC(data.MonDate, data.MonTime), parseFloat(data.AttrValue)], true, true);
  // console.log (data.MonTime);
  // console.log ('add');
}

function MinusTime(time1, time2) {
  var time1Array = time1.split(':');
  var time2Array = time2.split(':');

  if (time1Array.length !== time2Array.length) {
    return NaN;
  }

  for (var i = 0; i < time1Array.length; ++i) {
    time1Array[i] = parseInt(time1Array[i]);
    time2Array[i] = parseInt(time2Array[i]);
  }

  var result = (time1Array[0]*60+ time1Array[1])*60 + time1Array[2]
             - ((time2Array[0]*60+ time2Array[1])*60 + time2Array[2]);

  return result < 0 ? -result: result;
}

function getConfigData() {
    var fs = require("fs");
    var jsContent = require("./system-config-utf8.json");

    // 访问方式originalAttrDataAttrDefine[i].$.propertyName.
    var originalAttrDataAttrDefine = jsContent.SystemConfig.AttrDefine[0].Attr;
    var transAttrData = [];

    for (var i= 0 ; i < originalAttrDataAttrDefine.length; ++i) {
        transAttrData[originalAttrDataAttrDefine[i].$.name] = {};
        transAttrData[originalAttrDataAttrDefine[i].$.name].name      = originalAttrDataAttrDefine[i].$.name;
        transAttrData[originalAttrDataAttrDefine[i].$.name].valueType = originalAttrDataAttrDefine[i].$.valueType;
        transAttrData[originalAttrDataAttrDefine[i].$.name].interval  = originalAttrDataAttrDefine[i].$.interval;
        transAttrData[originalAttrDataAttrDefine[i].$.name].comment   = originalAttrDataAttrDefine[i].$.comment;
    }

    // console.log ('AttrDefine property numb: ' + originalAttrDataAttrDefine.length);
    // console.log (originalAttrDataAttrDefine[1].$.name)
    // console.log(transAttrData[originalAttrDataAttrDefine[1].$.name])

    var originalAttrDataPerformance = jsContent.SystemConfig.PerformanceAttrs[0].Attr;
    for (i = 0 ; i < originalAttrDataPerformance.length; ++i) {
        transAttrData[originalAttrDataPerformance[i].$.name] = {};
        transAttrData[originalAttrDataPerformance[i].$.name].name      = originalAttrDataPerformance[i].$.name;
        transAttrData[originalAttrDataPerformance[i].$.name].valueType = originalAttrDataPerformance[i].$.valueType;
        transAttrData[originalAttrDataPerformance[i].$.name].interval  = originalAttrDataPerformance[i].$.interval;
        transAttrData[originalAttrDataPerformance[i].$.name].comment   = originalAttrDataPerformance[i].$.comment;
    }

    // console.log ('Performance property numb: ' + originalAttrDataPerformance.length);
    // console.log (originalAttrDataPerformance[1].$.name)
    // console.log(transAttrData[originalAttrDataPerformance[1].$.name])
    return transAttrData;
}

function transformGridData(originalData) {
    var transData = [];
    var tmpItem = {};
    for (var tmpindex = 0; tmpindex < originalData.length; ++tmpindex) {
      if (configData[originalData[tmpindex].HoldObjectID] !== undefined) {
        tmpItem = {
          '指标名称': configData[originalData[tmpindex].HoldObjectID].comment,
          '指标ID' : originalData[tmpindex].HoldObjectID
        }
        transData.push(tmpItem);
      } else {
        console.log(originalData[tmpindex].HoldObjectID);
      }
    }

    return transData;
}

function gridChangeFunc(Pointer) {
  return (function(gridViewPointer){
    var selectedRows = this.select();
    var objectID = gridViewPointer.pageID;
    var HoldObjectID = $(selectedRows).text();

    console.log ('ObjectID: ' + objectID);
    console.log ('HoldObjectID: ' + HoldObjectID);

    reqQrySubscriberFunc(objectID, HoldObjectID);
  })(Pointer);
}

/*
注册实时回调监听函数，只注册一次。
回调数据中的ObjectID，AttrType标记不同的请求。
在接受到数据后，以ObjectID+AttrType为名将数据发送到对应请求注册的监听接口中。
*/
function registerRtnObjectAttrTopic() {
  if (window.registerRtnObjectAttrTopic === false) {
    userApi.emitter.on(EVENTS.RtnObjectAttrTopic, function(data){
      // console.log(data);
      var curRtnMessageName = data.ObjectID + '.' + data.AttrType;
      userApi.emitter.emit(curRtnMessageName, data);
    });
    window.registerRtnObjectAttrTopic = true;
  }   
}

function reqQrySubscriberFunc(objectID, attrType){
  var reqQrySubscriberData = new userApiStruct.CShfeFtdcReqQrySubscriberField();
  reqQrySubscriberData.ObjectID  = objectID+'.'+attrType;
  reqQrySubscriberData.ObjectNum = -1;
  reqQrySubscriberData.KeepAlive = 1;
  // console.log (reqQrySubscriberData.ObjectID);
  var reqQrySubscriberField = {}
  reqQrySubscriberField.reqObject  = reqQrySubscriberData;
  reqQrySubscriberField.RequestId  = ++window.ReqQrySubscriberTopicRequestID;
  reqQrySubscriberField.rtnMessage = reqQrySubscriberData.ObjectID;

  // registerRtnObjectAttrObjectID(reqQrySubscriberField.rtnMessage);

  userApi.emitter.emit(EVENTS.ReqQrySubscriberTopic, reqQrySubscriberField);
}

function initialDataGenerator() { 
  var Mydata = []
  var time = (new Date()).getTime()
  var i
  for (i = -10; i <= 0; i += 1) {
    Mydata.push([
      time + i * 1000,
      Math.ceil(Math.random() * 100)
    ])
  }
  return Mydata
}

function testWindowResize() {
  // window.onresize = function(){
  //   console.log ('window.width:  ' + window.innerWidth);
  //   console.log ('widnow.height: ' + window.innerHeight);
  // }

  $(window).resize(function() {
    console.log ('window.width:  ' + window.innerWidth);
    console.log ('widnow.height: ' + window.innerHeight);
  })
}

module.exports.setup = setup

