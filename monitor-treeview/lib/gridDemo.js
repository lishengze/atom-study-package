_ = require('underscore-plus');

var gridOnedata = {title : '属性列表' }
var templateModel = kendo.template("<strong style = 'color:indianred'>#: title #  </strong>\
                  <i  class = 'gridMax fa fa-clone'></i>\
                  <i  class = ' gridClose fa fa-times'></i>")

function setup(gridID, pageID) {
  window.configData = getConfigData();

  registerRspQryOidRelationTopicDone();  

  registerRtnObjectAttrTopic();

  initializeGrid(gridID, pageID);
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
      // console.log (indexDataTmp);
      if (true === window.isPageID) {
        var gridNodeId = '#gridOne' + gridRspData.gridID;
      } else {
        var gridNodeId = '#gridOne' + window.index;
      }
      // console.log('gridNodeId: ' + gridNodeId);
      // console.log (gridNodeId + '.class: ' + $(gridNodeId).attr('class'));
      // console.log ($('.gridOne AttrItem').attr('id'));
      // console.log ($("#gridOneDEF").html());
      // console.log ($('#gridData').html());

      var grid = $(gridNodeId).data("kendoGrid");
      var dataSource = new kendo.data.DataSource({data:indexDataTmp});
      grid.setDataSource(dataSource);

      // console.log($("#gridData").html());
      // console.log($(gridNodeId).html());
      // console.log($(gridNodeId).parent().html());

      console.log('$(gridNodeId).parent().parent().parent().html()');
      console.log($(gridNodeId).parent().parent().parent().html());
    });
    window.IsRspQryOidRelationTopicDone = true;
  }
}

function initializeGrid(gridID, pageID) {
  console.log("gridID: " + gridID);
  console.log("pageID: " + pageID);

  // var gridHtml = '<div id="leftContainer'+ gridID +'" class="leftContainer">\
  //                   <div id="gridOne'+ gridID +'" class="gridOne AttrItem">\
  //                    <div id="'+ pageID +'"></div>\
  //                   </div>\
  //                 </div>';

  // // if ($("#gridData").html() != null) {
  // //   $("#gridData").html("");
  // // }

  // $("#gridData").append(gridHtml);

  // console.log($("#gridData").html());

  $('#gridOne' + gridID).kendoGrid({
    scrollable: false,
    resizable: true,
    toolbar:  templateModel(gridOnedata),
    columns: [{
     field: '指标名称',
    }, {
     field: '指标ID',
    }
    ],
    change: onChange,
    selectable: "multiple cell",
    sortable: true
  });

  // console.log($("#gridData").html());
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

function onChange() {
  var selectedRows = this.select();
  var objectID = this.element[0].childNodes[1].id;
  var HoldObjectID = $(selectedRows).text();

  console.log ('ObjectID: ' + objectID);
  console.log ('HoldObjectID: ' + HoldObjectID);

  reqQrySubscriberFunc(objectID, HoldObjectID);
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
  userApi.emitter.on (eventName, function(data){
    console.log(eventName);
    console.log(data);
  });
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

  registerRtnObjectAttrObjectID(reqQrySubscriberField.rtnMessage);

  userApi.emitter.emit(EVENTS.ReqQrySubscriberTopic, reqQrySubscriberField);
}

module.exports.setup = setup
