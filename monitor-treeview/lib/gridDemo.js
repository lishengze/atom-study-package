_ = require('underscore-plus');

var gridOnedata = {title : '属性列表' }
var templateModel = kendo.template("<strong style = 'color:indianred'>#: title #  </strong>\
                  <i  class = 'gridMax fa fa-clone'></i>\
                  <i  class = ' gridClose fa fa-times'></i>")

function setup(index) {
  window.configData = getConfigData();
  registerRspQryOidRelationTopicDone();
  initializeGrid(index);
}

function registerRspQryOidRelationTopicDone() {
  if (true === window.IsRspQryOidRelationTopicDone) {
    userApi.emitter.on('RspQryOidRelationTopicDone', function(gridRspData){
      console.log (gridRspData);
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
      console.log (indexDataTmp);
      if (true === window.isPageID) {
        var gridNodeId = '#gridOne' + gridRspData.pageId;
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
    });
    window.IsRspQryOidRelationTopicDone = false;
  }
}

function initializeGrid(index) {
  $('#gridOne' + index).kendoGrid({
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

  reqQryObjectAttrFunc(objectID, HoldObjectID);
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

function registerRtnObjectAttrTopic(eventName) {
  userApi.emitter.on(eventName, function(data){
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
  reqQrySubscriberField.rtnMessage = EVENTS.RtnObjectAttrTopic;

  registerRtnObjectAttrTopic(reqQrySubscriberField.rtnMessage);

  userApi.emitter.emit(EVENTS.ReqQrySubscriberTopic, reqQrySubscriberField);
}

module.exports.setup = setup
