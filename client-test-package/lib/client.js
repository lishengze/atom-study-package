// Created by li.shengze on 2016/2/24.

var EVENTS           = new events();
var isHttps          = true;

if (true === isHttps) {
	var localUrl   = 'https://localhost'
	var serverUrl  = 'https://172.1.128.169'
	var port       = 8000;
	var curUrl     = serverUrl + ':' + port.toString();
	var rootSocket = io.connect(curUrl,{secure:true});
} else {
	var localUrl         = 'http://localhost';
    var serverUrl        = 'http://172.1.128.169';
    var ubuntuUrl        = 'http://192.168.136.131';
    var curUrl           = ubuntuUrl;
	var rootSocket       = io.connect(curUrl);
}

var userSocket;
var userServer;
var userInfo;



rootSocket.on('connect_error', function(errorObj){

});

rootSocket.on('disconnect', function(){

});

var addNewUser = function (userinfo) {
    userInfo = userinfo;
    rootSocket.emit(EVENTS.NewUserCome, userinfo);
}

var TestAddNewUserAdmin = function () {
    var userinfo = {};
    userinfo           = new CShfeFtdcReqQrySysUserLoginField();
    userinfo.UserID    = "admin";
    userinfo.Password  = "admin";
    userinfo.VersionID = "2.0.0.0";

    addNewUser(userinfo);
}

var TestAddNewUserID_1 = function () {
    var userinfo = {};
    userinfo           = new CShfeFtdcReqQrySysUserLoginField();
    userinfo.UserID    = "NewUserID_1";
    userinfo.Password  = "1234567";
    userinfo.VersionID = "2.0.0.0";

    addNewUser(userinfo);
}

rootSocket.on("user reconnected", function(UserID) {
   OutputMessage("Client: " + UserID + " has already logged!");
});


rootSocket.on(EVENTS.NewUserReady, function(curUserInfo){

    if (userInfo.UserID !== curUserInfo.UserID ) return;

    OutputMessage("Client: new user " + userInfo.UserID + " ready!");

	userSocket = io.connect(curUrl + '/' + userInfo.UserID);

    userSocket.on('connect_error', function(errorObj){

    });

    userSocket.on('disconnect', function(){

    });

    userSocket.on(EVENTS.NewUserConnectComplete, function(data){
       OutputMessage("Client: " + userInfo.UserID + "  connect completed!");
       userSocket.emit(EVENTS.RegisterFront, {});
	});

    userSocket.on("Test Front", function(data){
        var outputStr = "\n+++++++++  Communication FrontConnected! ++++++++\n";
    	OutputMessage(outputStr);
    });

	userSocket.on(EVENTS.FrontConnected, function(callbackData){
        var reqField = userInfo;
	    userSocket.emit(EVENTS.ReqQrySysUserLoginTopic, reqField);
	});

    userSocket.on(EVENTS.FrontDisConnected, function(callbackData){

	});

    userSocket.on(EVENTS.HeartBeatWarning, function(callbackData){

	});

    userSocket.on(EVENTS.RspQryTopCpuInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnTopCpuInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTopMemInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnTopMemInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTopProcessInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnTopProcessInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryFileSystemInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnFileSystemInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetworkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetworkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryClientLoginTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryMonitorObjectTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnMonitorObjectTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryObjectRationalTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnObjectRationalTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySyslogInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnSyslogInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySubscriberTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryOidRelationTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnOidRelationTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryUserInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnUserInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryOnlineUserInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnOnlineUserInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryWarningEventTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnWarningEventTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryCPUUsageTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnCPUUsageTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryMemoryUsageTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnMemoryUsageTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryDiskUsageTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnDiskUsageTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryObjectAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnObjectAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryInvalidateOrderTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnInvalidateOrderTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryOrderStatusTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnOrderStatusTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryBargainOrderTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnBargainOrderTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryInstPropertyTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnInstPropertyTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryMarginRateTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnMarginRateTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryPriceLimitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnPriceLimitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryPartPosiLimitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnPartPosiLimitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryClientPosiLimitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnClientPosiLimitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySpecialPosiLimitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnSpecialPosiLimitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTransactionChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnTransactionChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryClientChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnClientChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryPartClientChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnPartClientChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryPosiLimitChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnPosiLimitChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryHedgeDetailChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnHedgeDetailChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryParticipantChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnParticipantChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryMarginRateChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnMarginRateChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryUserIpChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnUserIpChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryClientPosiLimitChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnClientPosiLimitChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySpecPosiLimitChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnSpecPosiLimitChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryHistoryObjectAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnHistoryObjectAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryFrontInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnFrontInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySysUserLoginTopic, function(callbackData){
        var outputStr = '+++++ RspQrySysUserLoginTopic +++++!\n';
        var pRspQrySysUserLogin = callbackData.pRspQrySysUserLogin;
        outputStr += "\n++ Client OnRspQrySysUserLoginTopic: START! ++\n";
		if (pRspQrySysUserLogin instanceof Object) {
		      outputStr += "LoginTime :                 " + pRspQrySysUserLogin.LoginTime.toString() + "\n"
					           + "UserID :                    " + pRspQrySysUserLogin.UserID.toString() + "\n"
					           + "Privilege :                 " + pRspQrySysUserLogin.Privilege.toString() + "\n"
					           + "TradingDay :                " + pRspQrySysUserLogin.TradingDay.toString() + "\n"
					           + "VersionFlag :               " + pRspQrySysUserLogin.VersionFlag.toString() + "\n";

				} else {
		            outputStr += "pRspQrySysUserLogin is NULL!\n";
		}

		outputStr += "++ Client OnRspQrySysUserLoginTopic: END! ++" + "\n";
		OutputMessage(outputStr);
    });

    userSocket.on(EVENTS.RspQrySysUserLogoutTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySysUserPasswordUpdateTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySysUserRegisterTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySysUserDeleteTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryParticipantInitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnParticipantInitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryUserInitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnUserInitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryClientInitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnClientInitTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTradeLogTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnTradeLogTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTradeUserLoginInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnTradeUserLoginInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryPartTradeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTradepeakTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnUpdateSysConfigTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnSysUser, function(callbackData){

    });

    userSocket.on(EVENTS.RtnPriceLimitChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryHistoryCpuInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryHistoryMemInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryHistoryNetworkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryMonitorOnlineUser, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryFrontStat, function(callbackData){

    });

    userSocket.on(EVENTS.RtnSysTimeSyncTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnDataCenterChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryHistoryTradePeakTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnHistoryTradePeakTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySyslogEventTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnSyslogEventTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTradeDayChangeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryWebAppInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnWebAppInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryServletInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnServletInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryFileInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnFileInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySessionInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnSessionInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryJDBCInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnJDBCInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryThreadInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnThreadInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryVMInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnVMInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryPropertyInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnPropertyInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryMemPoolInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnMemPoolInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryFileContentInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnFileContentInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryConnectionInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnConnectionInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryConnectorInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnConnectorInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryDBQueryTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnDBQueryTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryGeneralFieldTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnGeneralFieldTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryGetFileTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryWarningQueryTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnWarningQueryTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnHostConfig, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryGeneralOperateTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnGeneralOperateTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetDeviceLinkedTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetDeviceLinkedTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTradeUserLoginStatTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTradeFrontOrderRttStatTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnTradeFrontOrderRttStatTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryParticTradeOrderStatesTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnParticTradeOrderStatesTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryRouterInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnRouterInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryDiskIOTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnDiskIOTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryStatInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnStatInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryTradeOrderRttCutLineTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnTradeOrderRttCutLineTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryClientInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnClientInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryEventDescriptionTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnEventDescriptionTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryFrontUniqueIDTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnFrontUniqueIDTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetPartyLinkAddrChangeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetPartyLinkAddrChangeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetDelPartyLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetDelPartyLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryPerformanceTopTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnPerformanceTopTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryInstrumentStatusTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnInstrumentStatusTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryCurrTradingSegmentAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnCurrTradingSegmentAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetAreaTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetAreaTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetSubAreaTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetSubAreaTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetSubAreaIPTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetSubAreaIPTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetDeviceTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetDeviceTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetDeviceDetectTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetBuildingTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetBuildingTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetRoomTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetRoomTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetCabinetsTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetCabinetsTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetOIDTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetOIDTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetTimePolicyTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetTimePolicyTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetGatherTaskTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetGatherTaskTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetDeviceChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetDeviceChgTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetDeviceTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetDeviceTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetDeviceCategoryTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetDeviceCategoryTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetManufactoryTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetManufactoryTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetCommunityTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetCommunityTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetPortTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetPortTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetPartAccessSpotTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetPartAccessSpotTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetInterfaceTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetInterfaceTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetGeneralOIDTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetGeneralOIDTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorAttrScopeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorAttrScopeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorAttrTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorAttrTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorObjectAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorObjectAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetFuncAreaTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetFuncAreaTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorCommandTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorCommandTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorActionGroupTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorActionGroupTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorDeviceGroupTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorDeviceGroupTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorTaskInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorTaskInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorTaskResultTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorTaskResultTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorTaskObjectSetTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorTaskObjectSetTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetPartyLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetPartyLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorActionAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorActionAttrTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetModuleTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetModuleTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetEventExprTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetEventExprTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetEventTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetEventTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetSubEventTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetSubEventTypeTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetEventLevelTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetEventLevelTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorTaskStatusResultTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorTaskStatusResultTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetCfgFileTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetCfgFileTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorDeviceTaskTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorDeviceTaskTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMonitorTaskInstAttrsTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMonitorTaskInstAttrsTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryFileGeneralOperTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnFileGeneralOperTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetBaseLineTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetBaseLineTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetBaseLineTaskTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetBaseLineTaskTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetBaseLineResultTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetBaseLineResultTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetPartyLinkStatusInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetPartyLinkStatusInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetMemberSDHLineInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetMemberSDHLineInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetDDNLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetDDNLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetPseudMemberLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetPseudMemberLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryOuterDeviceInfTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetOuterDeviceInfTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetLocalPingResultInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetLocalPingResultInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetRomotePingResultInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetRomotePingResultInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnMonitorTopProcessInfo, function(callbackData){

    });

    userSocket.on(EVENTS.RspQrySysInternalTopologyTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnSysInternalTopologyTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryMemberLinkCostTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnMemberLinkCostTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetPartylinkMonthlyRentTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetPartylinkMonthlyRentTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RspQryNetNonPartyLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.RtnNetNonPartyLinkInfoTopic, function(callbackData){

    });

    userSocket.on(EVENTS.ReqQryTopMemInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryTopProcessInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryFileSystemInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetworkInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryMonitorObjectTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryObjectRationalTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySyslogInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySubscriberTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryOidRelationTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryUserInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryOnlineUserInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryWarningEventTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryObjectAttrTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryInvalidateOrderTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryOrderStatusTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryBargainOrderTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryInstPropertyTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryMarginRateTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryPriceLimitTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryPartPosiLimitTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryClientPosiLimitTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySpecialPosiLimitTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryTransactionChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryClientChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryPartClientChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryPosiLimitChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryHedgeDetailChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryParticipantChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryMarginRateChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryUserIpChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryClientPosiLimitChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySpecPosiLimitChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryHistoryObjectAttrTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryFrontInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySysUserLoginTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySysUserLogoutTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySysUserPasswordUpdateTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySysUserRegisterTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySysUserDeleteTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryTradeLogTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryWarningEventUpdateTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryTradeUserLoginInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryPartTradeTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryTradepeakTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryParticipantInitTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryUserInitTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryHistoryCpuInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryHistoryMemInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryHistoryNetworkInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryHistoryTradePeakTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySyslogEventTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySyslogEventSubcriberTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryTomcatInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryDBQueryTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryGetFileTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQrySyslogEventUpdateTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryWarningQueryTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryWebVisitTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryGeneralOperateTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetDeviceLinkedTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryTradeUserLoginStatTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryTradeFrontOrderRttStatTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryParticTradeOrderStatesTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryRouterInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryDiskIOTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryStatInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryTradeOrderRttCutLineTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryClientInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryEventDescriptionTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryFrontUniqueIDTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetPartyLinkAddrChangeTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetDelPartyLinkInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryPerformanceTopTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryInstrumentStatusTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryCurrTradingSegmentAttrTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryRealTimeNetObjectAttrTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetAreaTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetSubAreaTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetSubAreaIPTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetDeviceDetectTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetDeviceRequestTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetBuildingTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetRoomTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetCabinetsTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetOIDTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetTimePolicyTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetGatherTaskTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetDeviceChgTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetDeviceTypeTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetDeviceCategoryTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetManufactoryTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetCommunityTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetPortTypeTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetPartAccessSpotTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetInterfaceTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetGeneralOIDTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorTypeTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorAttrScopeTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorAttrTypeTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorObjectAttrTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorDeviceGroupTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorTaskInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorTaskResultTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorTaskObjectSetTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetPartyLinkInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorActionAttrTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetModuleTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorTaskStatusResultTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetCfgFileTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetMonitorDeviceTaskTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryFileGeneralOperTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetBaseLineTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetBaseLineResultTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetPartyLinkStatusInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetLocalPingResultInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetRomotePingResultInfoTopicFailed, function(flag){

    });

    userSocket.on(EVENTS.ReqQryNetNonPartyLinkInfoTopicFailed, function(flag){

    });

});

var addNewUser = function (userinfo) {
    userInfo = userinfo;
    rootSocket.emit(EVENTS.NewUserCome, userinfo);
}

var ReqQryTopMemInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTopMemInfoTopic, reqField);
}

var ReqQryTopProcessInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTopProcessInfoTopic, reqField);
}

var ReqQryFileSystemInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryFileSystemInfoTopic, reqField);
}

var ReqQryNetworkInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetworkInfoTopic, reqField);
}

var ReqQryMonitorObjectTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryMonitorObjectTopic, reqField);
}

var ReqQryObjectRationalTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryObjectRationalTopic, reqField);
}

var ReqQrySyslogInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySyslogInfoTopic, reqField);
}

var ReqQrySubscriberTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySubscriberTopic, reqField);
}

var ReqQryOidRelationTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryOidRelationTopic, reqField);
}

var ReqQryUserInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryUserInfoTopic, reqField);
}

var ReqQryOnlineUserInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryOnlineUserInfoTopic, reqField);
}

var ReqQryWarningEventTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryWarningEventTopic, reqField);
}

var ReqQryObjectAttrTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryObjectAttrTopic, reqField);
}

var ReqQryInvalidateOrderTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryInvalidateOrderTopic, reqField);
}

var ReqQryOrderStatusTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryOrderStatusTopic, reqField);
}

var ReqQryBargainOrderTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryBargainOrderTopic, reqField);
}

var ReqQryInstPropertyTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryInstPropertyTopic, reqField);
}

var ReqQryMarginRateTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryMarginRateTopic, reqField);
}

var ReqQryPriceLimitTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryPriceLimitTopic, reqField);
}

var ReqQryPartPosiLimitTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryPartPosiLimitTopic, reqField);
}

var ReqQryClientPosiLimitTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryClientPosiLimitTopic, reqField);
}

var ReqQrySpecialPosiLimitTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySpecialPosiLimitTopic, reqField);
}

var ReqQryTransactionChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTransactionChgTopic, reqField);
}

var ReqQryClientChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryClientChgTopic, reqField);
}

var ReqQryPartClientChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryPartClientChgTopic, reqField);
}

var ReqQryPosiLimitChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryPosiLimitChgTopic, reqField);
}

var ReqQryHedgeDetailChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryHedgeDetailChgTopic, reqField);
}

var ReqQryParticipantChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryParticipantChgTopic, reqField);
}

var ReqQryMarginRateChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryMarginRateChgTopic, reqField);
}

var ReqQryUserIpChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryUserIpChgTopic, reqField);
}

var ReqQryClientPosiLimitChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryClientPosiLimitChgTopic, reqField);
}

var ReqQrySpecPosiLimitChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySpecPosiLimitChgTopic, reqField);
}

var ReqQryHistoryObjectAttrTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryHistoryObjectAttrTopic, reqField);
}

var ReqQryFrontInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryFrontInfoTopic, reqField);
}

var ReqQrySysUserLoginTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySysUserLoginTopic, reqField);
}

var ReqQrySysUserLogoutTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySysUserLogoutTopic, reqField);
}

var ReqQrySysUserPasswordUpdateTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySysUserPasswordUpdateTopic, reqField);
}

var ReqQrySysUserRegisterTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySysUserRegisterTopic, reqField);
}

var ReqQrySysUserDeleteTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySysUserDeleteTopic, reqField);
}

var ReqQryTradeLogTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTradeLogTopic, reqField);
}

var ReqQryWarningEventUpdateTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryWarningEventUpdateTopic, reqField);
}

var ReqQryTradeUserLoginInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTradeUserLoginInfoTopic, reqField);
}

var ReqQryPartTradeTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryPartTradeTopic, reqField);
}

var ReqQryTradepeakTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTradepeakTopic, reqField);
}

var ReqQryParticipantInitTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryParticipantInitTopic, reqField);
}

var ReqQryUserInitTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryUserInitTopic, reqField);
}

var ReqQryHistoryCpuInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryHistoryCpuInfoTopic, reqField);
}

var ReqQryHistoryMemInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryHistoryMemInfoTopic, reqField);
}

var ReqQryHistoryNetworkInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryHistoryNetworkInfoTopic, reqField);
}

var ReqQryHistoryTradePeakTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryHistoryTradePeakTopic, reqField);
}

var ReqQrySyslogEventTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySyslogEventTopic, reqField);
}

var ReqQrySyslogEventSubcriberTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySyslogEventSubcriberTopic, reqField);
}

var ReqQryTomcatInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTomcatInfoTopic, reqField);
}

var ReqQryDBQueryTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryDBQueryTopic, reqField);
}

var ReqQryGetFileTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryGetFileTopic, reqField);
}

var ReqQrySyslogEventUpdateTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQrySyslogEventUpdateTopic, reqField);
}

var ReqQryWarningQueryTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryWarningQueryTopic, reqField);
}

var ReqQryWebVisitTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryWebVisitTopic, reqField);
}

var ReqQryGeneralOperateTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryGeneralOperateTopic, reqField);
}

var ReqQryNetDeviceLinkedTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetDeviceLinkedTopic, reqField);
}

var ReqQryTradeUserLoginStatTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTradeUserLoginStatTopic, reqField);
}

var ReqQryTradeFrontOrderRttStatTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTradeFrontOrderRttStatTopic, reqField);
}

var ReqQryParticTradeOrderStatesTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryParticTradeOrderStatesTopic, reqField);
}

var ReqQryRouterInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryRouterInfoTopic, reqField);
}

var ReqQryDiskIOTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryDiskIOTopic, reqField);
}

var ReqQryStatInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryStatInfoTopic, reqField);
}

var ReqQryTradeOrderRttCutLineTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryTradeOrderRttCutLineTopic, reqField);
}

var ReqQryClientInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryClientInfoTopic, reqField);
}

var ReqQryEventDescriptionTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryEventDescriptionTopic, reqField);
}

var ReqQryFrontUniqueIDTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryFrontUniqueIDTopic, reqField);
}

var ReqQryNetPartyLinkAddrChangeTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetPartyLinkAddrChangeTopic, reqField);
}

var ReqQryNetDelPartyLinkInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetDelPartyLinkInfoTopic, reqField);
}

var ReqQryPerformanceTopTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryPerformanceTopTopic, reqField);
}

var ReqQryInstrumentStatusTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryInstrumentStatusTopic, reqField);
}

var ReqQryCurrTradingSegmentAttrTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryCurrTradingSegmentAttrTopic, reqField);
}

var ReqQryRealTimeNetObjectAttrTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryRealTimeNetObjectAttrTopic, reqField);
}

var ReqQryNetAreaTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetAreaTopic, reqField);
}

var ReqQryNetSubAreaTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetSubAreaTopic, reqField);
}

var ReqQryNetSubAreaIPTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetSubAreaIPTopic, reqField);
}

var ReqQryNetDeviceDetectTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetDeviceDetectTopic, reqField);
}

var ReqQryNetDeviceRequestTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetDeviceRequestTopic, reqField);
}

var ReqQryNetBuildingTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetBuildingTopic, reqField);
}

var ReqQryNetRoomTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetRoomTopic, reqField);
}

var ReqQryNetCabinetsTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetCabinetsTopic, reqField);
}

var ReqQryNetOIDTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetOIDTopic, reqField);
}

var ReqQryNetTimePolicyTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetTimePolicyTopic, reqField);
}

var ReqQryNetGatherTaskTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetGatherTaskTopic, reqField);
}

var ReqQryNetDeviceChgTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetDeviceChgTopic, reqField);
}

var ReqQryNetDeviceTypeTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetDeviceTypeTopic, reqField);
}

var ReqQryNetDeviceCategoryTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetDeviceCategoryTopic, reqField);
}

var ReqQryNetManufactoryTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetManufactoryTopic, reqField);
}

var ReqQryNetCommunityTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetCommunityTopic, reqField);
}

var ReqQryNetPortTypeTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetPortTypeTopic, reqField);
}

var ReqQryNetPartAccessSpotTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetPartAccessSpotTopic, reqField);
}

var ReqQryNetInterfaceTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetInterfaceTopic, reqField);
}

var ReqQryNetGeneralOIDTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetGeneralOIDTopic, reqField);
}

var ReqQryNetMonitorTypeTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorTypeTopic, reqField);
}

var ReqQryNetMonitorAttrScopeTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorAttrScopeTopic, reqField);
}

var ReqQryNetMonitorAttrTypeTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorAttrTypeTopic, reqField);
}

var ReqQryNetMonitorObjectAttrTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorObjectAttrTopic, reqField);
}

var ReqQryNetMonitorDeviceGroupTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorDeviceGroupTopic, reqField);
}

var ReqQryNetMonitorTaskInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorTaskInfoTopic, reqField);
}

var ReqQryNetMonitorTaskResultTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorTaskResultTopic, reqField);
}

var ReqQryNetMonitorTaskObjectSetTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorTaskObjectSetTopic, reqField);
}

var ReqQryNetPartyLinkInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetPartyLinkInfoTopic, reqField);
}

var ReqQryNetMonitorActionAttrTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorActionAttrTopic, reqField);
}

var ReqQryNetModuleTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetModuleTopic, reqField);
}

var ReqQryNetMonitorTaskStatusResultTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorTaskStatusResultTopic, reqField);
}

var ReqQryNetCfgFileTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetCfgFileTopic, reqField);
}

var ReqQryNetMonitorDeviceTaskTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetMonitorDeviceTaskTopic, reqField);
}

var ReqQryFileGeneralOperTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryFileGeneralOperTopic, reqField);
}

var ReqQryNetBaseLineTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetBaseLineTopic, reqField);
}

var ReqQryNetBaseLineResultTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetBaseLineResultTopic, reqField);
}

var ReqQryNetPartyLinkStatusInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetPartyLinkStatusInfoTopic, reqField);
}

var ReqQryNetLocalPingResultInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetLocalPingResultInfoTopic, reqField);
}

var ReqQryNetRomotePingResultInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetRomotePingResultInfoTopic, reqField);
}

var ReqQryNetNonPartyLinkInfoTopic = function (reqField) {
    userSocket.emit(EVENTS.ReqQryNetNonPartyLinkInfoTopic, reqField);
}

module.exports.TestAddNewUserAdmin = TestAddNewUserAdmin;
module.exports.TestAddNewUserID_1  = TestAddNewUserID_1;
