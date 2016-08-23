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

// 注册grid回调函数。数据接收完成后，进行页面的数据源设置。只注册一次。
function registerRspQryOidRelationTopicDone() {
  if (false === window.IsRspQryOidRelationTopicDone) {
    userApi.emitter.on('RspQryOidRelationTopicDone', function(gridRspData){
      // console.log (gridRspData);
      var indexDataTmp = [];
      var tmpItem = {};
      var rspData = gridRspData.rspData;
      for (var tmpindex = 0; tmpindex < rspData.length; ++tmpindex) {
        if (configData[rspData[tmpindex].HoldObjectID] !== undefined) {
          tmpItem = {
            '指标名称': configData[rspData[tmpindex].HoldObjectID].comment,
            '指标ID' : rspData[tmpindex].HoldObjectID
          }
          indexDataTmp.push(tmpItem);
        } else {
          console.log(rspData[tmpindex].HoldObjectID);
        }
      }

      console.log ("indexDataTmp: ");
      console.log (indexDataTmp);
      if (true === window.isPageID) {
        var gridNodeId = '#gridOne' + gridRspData.gridID;
      } else {
        var gridNodeId = '#gridOne' + window.index;
      }

      var grid = $(gridNodeId).data("kendoGrid");
      var dataSource = new kendo.data.DataSource({data:indexDataTmp});
      grid.setDataSource(dataSource);

      // console.log($("#gridData").html());
      // console.log($(gridNodeId).html());
      // console.log($(gridNodeId).parent().html());

      // console.log('$(gridNodeId).parent().parent().parent().html()');
      // console.log($(gridNodeId).parent().parent().parent().html());

    });
    window.IsRspQryOidRelationTopicDone = true;
  }
}

function registerGridDataReceiveFunc(Pointer) {
  return (function(gridViewPointer){
      var gridDataEventName = gridViewPointer.gridID;
      console.log("gridDataEventName: " + gridDataEventName);

      userApi.emitter.on(gridDataEventName, function(gridRspData){
          var transGridData = transformGridData(gridRspData.rspData);
          var dataSource = new kendo.data.DataSource({data:transGridData});

          if (true === window.isPageID) {
            var gridNodeId = 'gridOne' + gridRspData.gridID;
          } else {
            var gridNodeId = 'gridOne' + window.index;
          }

          // var gridSelector1 = $('#'+gridNodeId);
          // var grid1 = gridSelector1.data("kendoGrid");
          // grid1.setDataSource(dataSource);

          gridNodeId = 'gridOne'
          var gridSelector2 = $(gridViewPointer.gridData.find('#'+gridNodeId));   
          var grid2 = gridSelector2.data("kendoGrid");
          grid2.setDataSource(dataSource);

          // console.log (gridSelector1.html());
          // console.log (grid1);
          // console.log (gridSelector2.html());
          // console.log (grid2);
                     
      })
  })(Pointer);
}

function initializeGrid(gridViewPointer) {
  // var gridHtml = "<div id=\"leftContainer"+gridViewPointer.gridID+"\" outlet=\"leftContainer"+gridViewPointer.gridID+"\" class=\"leftContainer\">\
  //                <div id=\"gridOne"+gridViewPointer.gridID+"\" outlet=\"gridOne"+gridViewPointer.gridID+"\" class=\"gridOne AttrItem\">\
  //                <div id=\""+gridViewPointer.pageID+"\" outlet=\""+gridViewPointer.pageID+"\"></div></div></div>" 

  var gridHtml = "<div id=\"leftContainer\"  class=\"leftContainer \">\
                 <div id=\"gridOne\" class=\"gridOne AttrItem\">\
                 <div id=\""+gridViewPointer.pageID+"\"></div></div></div>"  

  gridViewPointer.gridData.append(gridHtml);

  var gridSelector1 = $('#gridOne' + gridViewPointer.gridID);
  var gridSelector2 = $(gridViewPointer.gridData.find('#gridOne'));
  
  var gridSelector  = gridSelector2;

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
    
}

function registerGridItemDblClickFunc(Pointer) {
  
  return (function(gridViewPointer){
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

  })(Pointer);
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
        categories: []
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
  chart.turboThreshold = 20000;
  chart.setSize(curChartModelSelector.width(), curChartModelSelector.height() - toolbarHeight, false);
  curChartModelSelector.hide();
  
  var updateTime = 1000;
  setChartData(gridViewPointer, curChartModelSelector, chart, chartID, updateTime);
  
}

function setChartData(gridViewPointer, curChartModelSelector, chart, chartID, updateTime) {
  var rtnDataName = gridViewPointer.pageID+'.'+chartID;
  var chartDataX = [];
  var chartDataY = [];
  var dataNumb = 0;
  var isRealTime = false;
  var realTimeLine = 10;

  var nonRealTimeChartData = [];

  userApi.emitter.on (rtnDataName, function(data){
    // console.log(data);
    // var curTime = (new Date()).toTimeString().substring(0,8);
    // console.log('data.MonTime: ' + data.MonTime);
    // console.log('curTime:      ' + curTime);
    // console.log(MinusTime(curTime, data.MonTime));

    if (true === isRealTime) {
      addDataToChart(chart , data);
    } else {      
      ++dataNumb;
      nonRealTimeChartData.push([data.MonTime, data.AttrValue]); 
      chartDataX.push(data.MonTime);
      chartDataY.push(parseFloat(data.AttrValue));

      var curTime = (new Date()).toTimeString().substring(0,8);
      if (MinusTime(curTime, data.MonTime) < realTimeLine ) {
          isRealTime = true;
          // console.log (chartDataX);
          // console.log (chartDataY);

          chart.xAxis[0].setCategories(chartDataX);
          chart.series[0].setData(chartDataY); 

          curChartModelSelector.show();
          // console.log(dataNumb);
      }
    }
  });  
}

function addDataToChart(chart, data) {
  var series = chart.series[0];
  series.addPoint([data.MonTime, parseFloat(data.AttrValue)], true, true);
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

  var result = (time1Array[0]*24+ time1Array[1])*60 + time1Array[2]
             - ((time2Array[0]*24+ time2Array[1])*60 + time2Array[2]);

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

function onChange() {
  var selectedRows = this.select();
  var objectID = this.element[0].childNodes[2].id;
  var HoldObjectID = $(selectedRows).text();

  // console.log (gridViewPointer.pageID);
  // console.log (this)
  console.log ('ObjectID: ' + objectID);
  console.log ('HoldObjectID: ' + HoldObjectID);

  reqQrySubscriberFunc(objectID, HoldObjectID);

  // initializeChart()
}

function registerRspQryObjectAttrTopic(eventName) {
  userApi.emitter.on(eventName, function(data){
    console.log(data);
  });
}

function reqQryObjectAttrFunc(objectID, attrType) {
  var reqQryObjectAttrData = new userApiStruct.CShfeFtdcReqQryObjectAttrField();
  reqQryObjectAttrData.ObjectID = objectID;
  reqQryObjectAttrData.AttrType = attrType;
  var reqQryObjectAttrField = {};
  reqQryObjectAttrField.reqObject  = reqQryObjectAttrData;
  reqQryObjectAttrField.RequestId  = ++window.ReqQryObjectAttrTopicRequestID;
  reqQryObjectAttrField.rspMessage = EVENTS.RspQryObjectAttrTopic + reqQryObjectAttrField.RequestId;

  registerRspQryObjectAttrTopic(reqQryObjectAttrField.rspMessage);

  userApi.emitter.emit(EVENTS.ReqQryObjectAttrTopic, reqQryObjectAttrField);
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

// 根据不同的订阅ID,注册对应的实施监听回调函数。
function registerRtnObjectAttrObjectID(eventName) {
  var testNumber = 0;
  userApi.emitter.on (eventName, function(data){
    // console.log ('testNumber: ' + testNumber++);
    // console.log(eventName);
    console.log(data);
  });

  // setInterval(function () {
  //   //  console.log ('+++++ testNumber: ' + testNumber++);
  // }, 5);
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

module.exports.setup = setup

function testRegisterGridDataReceiveFunc(Pointer) {
  // console.log("Pointer.gridID: " + Pointer.gridID);
  // console.log("Pointer.pageID: " + Pointer.pageID);
  var gridDataEventName = Pointer.gridID;

  console.log("gridDataEventName: " + gridDataEventName);

  userApi.emitter.on(gridDataEventName, function(data){
      // console.log("gridViewPointer.gridID: " + gridViewPointer.gridID);
      // console.log("gridViewPointer.pageID: " + gridViewPointer.pageID);
      console.log(data);
  })  
  // return (function(gridViewPointer, eventName){
  //   return function() {
  //       userApi.emitter.on(eventName, function(data){
  //           console.log("gridViewPointer.gridID: " + gridViewPointer.gridID);
  //           console.log("gridViewPointer.pageID: " + gridViewPointer.pageID);
  //           console.log(data);
  //       })
  //   }
  // })(Pointer,gridDataEventName);
}

function TestRegisterGridDataReceiveFunc(Pointer) {
  return (function(gridViewPointer){
      var gridDataEventName = gridViewPointer.gridID;
      console.log("gridDataEventName: " + gridDataEventName);

      userApi.emitter.on(gridDataEventName, function(gridRspData){
          // console.log("gridViewPointer.gridID: " + gridViewPointer.gridID);
          // console.log("gridViewPointer.pageID: " + gridViewPointer.pageID);
          // console.log(gridRspData);

          var transGridData = transformGridData(gridRspData.rspData);

          // console.log("transGridData: ")
          // console.log(transGridData)

          if (true === window.isPageID) {
            var gridNodeId = 'gridOne' + gridRspData.gridID;
          } else {
            var gridNodeId = 'gridOne' + window.index;
          }

          // console.log('$(gridNodeId).parent().parent().parent().html()');
          // console.log($('#'+gridNodeId).parent().parent().parent().html());

          // console.log('gridViewPointer.gridData.html(): ' + gridViewPointer.gridData.html());
          // console.log('gridViewPointer.gridData.children().html(): ' + gridViewPointer.gridData.children().html());
          // console.log('gridViewPointer.gridData.html(): ' + gridViewPointer.gridData.find('#'+gridNodeId).html());

          // console.log('gridViewPointer.gridData.children("#"+gridNodeId): ');
          // console.log(gridViewPointer.gridData.children("#"+gridNodeId));

          // console.log ('gridViewPointer.gridNodeId.attr("id"): ' + gridViewPointer.gridNodeId.attr('id'));

          var gridSelector1 = $('#'+gridNodeId);
          var gridSelector2 = $(gridViewPointer.gridData.find('#'+gridNodeId));
          var gridSelector3 = $('#'+gridNodeId).find('#'+gridNodeId)['prevObject'];

          var grid1 = gridSelector1.data("kendoGrid");
          var grid2 = gridSelector2.data("kendoGrid");
          var grid3 = gridSelector3.data("kendoGrid");

          // console.log (gridSelector1.html());
          // console.log (grid1);
          // console.log (gridSelector2.html());
          // console.log (grid2);
          // console.log (gridSelector3.html());
          // console.log (grid3);

          var dataSource = new kendo.data.DataSource({data:transGridData});
          grid2.setDataSource(dataSource);   

          // var testSelector1 = $('#gridData');
          // var testSelector2 = gridViewPointer.gridData;

          // console.log(testSelector1);
          // console.log(testSelector1.html());     
          // console.log(testSelector2);
          // console.log(testSelector2.html());             
      })
  })(Pointer);
}