_ = require('underscore-plus');

var gridOnedata = {title : '属性列表' }
var templateModel = kendo.template("<strong style = 'color:indianred'>#: title #  </strong>\
                  <i  class = 'gridMax fa fa-clone'></i>\
                  <i  class = ' gridClose fa fa-times'></i>")

function setup(index) {

  window.configData = getConfigData();

  var indexData =  [{'指标名称':'对象是否活跃标示','指标ID':'Active'},
          {'指标名称':'日志事件','指标ID':'SyslogEvent'},
          {'指标名称':'已处理告警事件','指标ID':'ProcessedEvent'},
          {'指标名称':'业务进程所在文件系统使用率','指标ID':'DisUsage'},
          {'指标名称':'业务进程CPU使用率','指标ID':'CPUUsage'},
          {'指标名称':'未处理告警事件','指标ID':'UnprocessdEvent'}]

  registerReceiverDataFunc();
  initializeGridPerfect(index);
}

function registerReceiverDataFunc() {
  if (true === window.IsRspQryOidRelationTopicDone) {
    userApi.emitter.on('RspQryOidRelationTopicDone', function(gridRspData){
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

function initializeGridPerfect(index) {
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

function initializeGrid(index, templateModel, gridOnedata, onChange, indexData) {
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
    sortable: true,
    dataSource: indexData
  });
}

function initializeGridSimple(indexData) {
  $('#gridOne' + window.index).kendoGrid({
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
    sortable: true,
    dataSource: indexData
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
  console.log ($(selectedRows).text());
}

module.exports.setup = setup
