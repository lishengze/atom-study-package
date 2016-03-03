var fs               = require('fs');
var spi              = require("./communication.js");
// var addon            = require("./build/Release/addon");
var addon            = require("./addon");

var events           = require("./events.js");
var EVENTS           = new events.EVENTS();

var toolFunc         = require("./tool-function.js");
var OutputMessage    = toolFunc.OutputMessage;
var getSubString     = toolFunc.getSubString;

var userConnection   = [];
var userSocket       = [];
var userCount        = 0;
var isHttps          = true;

if (true === isHttps) {
	var options = {
		key:  fs.readFileSync("sfit.key"),
		cert: fs.readFileSync("sfit.cert"),
	};
	var app  = require('https').createServer(options,onRequest); 
	var io   = require('socket.io')(app)
	var port = 8000;
	app.listen(port);	
} else {
	var app  = require('http').createServer(onRequest); 
	var io   = require('socket.io')(app);
	var port = 80;
	app.listen(port);
}

function onRequest(request, response){
	try {
			response.writeHead(200, {'Content-Type':'text/plain'});
			response.write('Hello Socket.io');
			response.end();
	}catch (err) {
			console.error(err);
	}
}

var realTimeSystemPath  = "tcp://172.1.128.165:18841";
var innerTestSystemPath = "tcp://172.1.128.111:18842";

io.on('connection', function(rootSocket) {	
    var spawn = require('child_process').spawn('mkdir', ['usr']); 
    OutputMessage("Proxy-Server: root connect complete!");
    
    rootSocket.on('disconnect', function(data) {
		console.log('rootSocket disconnect!');
	});
    
	rootSocket.on(EVENTS.NewUserCome, function(userInfo) {				
        if (undefined !== userConnection[userInfo.UserID]) {
            OutputMessage("Proxy-Server: " + userInfo.UserID + " has already logged!");
            rootSocket.emit("user reconnected", userInfo.UserID);
            return;
        } 
        
		userConnection[userInfo.UserID] = {};         
        userConnection[userInfo.UserID].userInfo = userInfo;
        
        // OutputMessage("userConnection:\n");
        // OutputMessage(userConnection);
        
        userConnection[userInfo.UserID].socket = io.of('/' + userInfo.UserID);
        
        var userWorkDirName = 'usr/' + userInfo.UserID;
        var spawn = require('child_process').spawn('mkdir', [userWorkDirName]);  
               
        userConnection[userInfo.UserID].socket.on ('connection', function (curSocket) {
              
            // OutputMessage("curSocket.Namespace.name:\n");   
            // OutputMessage(curSocket);  
            curSocket.on('disconnect', function(data) {
              var currUserID = getSubString(curSocket.id, '/','#');
              userConnection[currUserID] = undefined;
              userSocket[curSocket.id] = {}; 
		      console.log(curSocket.id + ' disconnect!');
	        });
            
            var currUserID = getSubString(curSocket.id, '/','#');
            var userWorkDirName = 'usr/' + currUserID + '/';
            OutputMessage("Proxy-Server: new user " + currUserID + "connect completed!");
            
            userSocket[curSocket.id]           = {};        
            userSocket[curSocket.id].socket    = curSocket;                
            userSocket[curSocket.id].userApi   = new addon.FtdcSysUserApi_Wrapper(userWorkDirName);          
            userSocket[curSocket.id].Spi       = new spi.Spi();
            userSocket[curSocket.id].RequestID = 1;
            userSocket[curSocket.id].Spi.user  = userSocket[curSocket.id];
                       
            curSocket.emit(EVENTS.NewUserConnectComplete, {});
            
            curSocket.on(EVENTS.RegisterFront, function() {
				OutputMessage('\n------  Proxy-Server: Connect Front!-------\n');
                userSocket[curSocket.id].userApi.RegisterFront(realTimeSystemPath);   
                userSocket[curSocket.id].userApi.RegisterSpi(userSocket[curSocket.id].Spi);
                userSocket[curSocket.id].userApi.Init();   
                
                curSocket.emit("Test Front", 1);					
			});
        
            curSocket.on(EVENTS.ReqQryTopMemInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTopMemInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTopMemInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryTopProcessInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTopProcessInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTopProcessInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryFileSystemInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryFileSystemInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryFileSystemInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetworkInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetworkInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetworkInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryMonitorObjectTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryMonitorObjectTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryMonitorObjectTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryObjectRationalTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryObjectRationalTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryObjectRationalTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySyslogInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySyslogInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySyslogInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySubscriberTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySubscriberTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySubscriberTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryOidRelationTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryOidRelationTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryOidRelationTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryUserInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryUserInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryUserInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryOnlineUserInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryOnlineUserInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryOnlineUserInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryWarningEventTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryWarningEventTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryWarningEventTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryObjectAttrTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryObjectAttrTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryObjectAttrTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryInvalidateOrderTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryInvalidateOrderTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryInvalidateOrderTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryOrderStatusTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryOrderStatusTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryOrderStatusTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryBargainOrderTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryBargainOrderTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryBargainOrderTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryInstPropertyTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryInstPropertyTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryInstPropertyTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryMarginRateTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryMarginRateTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryMarginRateTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryPriceLimitTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryPriceLimitTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryPriceLimitTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryPartPosiLimitTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryPartPosiLimitTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryPartPosiLimitTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryClientPosiLimitTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryClientPosiLimitTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryClientPosiLimitTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySpecialPosiLimitTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySpecialPosiLimitTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySpecialPosiLimitTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryTransactionChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTransactionChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTransactionChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryClientChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryClientChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryClientChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryPartClientChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryPartClientChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryPartClientChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryPosiLimitChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryPosiLimitChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryPosiLimitChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryHedgeDetailChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryHedgeDetailChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryHedgeDetailChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryParticipantChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryParticipantChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryParticipantChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryMarginRateChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryMarginRateChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryMarginRateChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryUserIpChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryUserIpChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryUserIpChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryClientPosiLimitChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryClientPosiLimitChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryClientPosiLimitChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySpecPosiLimitChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySpecPosiLimitChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySpecPosiLimitChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryHistoryObjectAttrTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryHistoryObjectAttrTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryHistoryObjectAttrTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryFrontInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryFrontInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryFrontInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySysUserLoginTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySysUserLoginTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySysUserLoginTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySysUserLogoutTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySysUserLogoutTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySysUserLogoutTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySysUserPasswordUpdateTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySysUserPasswordUpdateTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySysUserPasswordUpdateTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySysUserRegisterTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySysUserRegisterTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySysUserRegisterTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySysUserDeleteTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySysUserDeleteTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySysUserDeleteTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryTradeLogTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTradeLogTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTradeLogTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryWarningEventUpdateTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryWarningEventUpdateTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryWarningEventUpdateTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryTradeUserLoginInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTradeUserLoginInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTradeUserLoginInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryPartTradeTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryPartTradeTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryPartTradeTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryTradepeakTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTradepeakTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTradepeakTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryParticipantInitTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryParticipantInitTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryParticipantInitTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryUserInitTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryUserInitTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryUserInitTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryHistoryCpuInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryHistoryCpuInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryHistoryCpuInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryHistoryMemInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryHistoryMemInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryHistoryMemInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryHistoryNetworkInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryHistoryNetworkInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryHistoryNetworkInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryHistoryTradePeakTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryHistoryTradePeakTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryHistoryTradePeakTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySyslogEventTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySyslogEventTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySyslogEventTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySyslogEventSubcriberTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySyslogEventSubcriberTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySyslogEventSubcriberTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryTomcatInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTomcatInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTomcatInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryDBQueryTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryDBQueryTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryDBQueryTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryGetFileTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryGetFileTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryGetFileTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQrySyslogEventUpdateTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQrySyslogEventUpdateTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQrySyslogEventUpdateTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryWarningQueryTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryWarningQueryTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryWarningQueryTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryWebVisitTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryWebVisitTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryWebVisitTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryGeneralOperateTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryGeneralOperateTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryGeneralOperateTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetDeviceLinkedTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetDeviceLinkedTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetDeviceLinkedTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryTradeUserLoginStatTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTradeUserLoginStatTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTradeUserLoginStatTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryTradeFrontOrderRttStatTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTradeFrontOrderRttStatTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTradeFrontOrderRttStatTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryParticTradeOrderStatesTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryParticTradeOrderStatesTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryParticTradeOrderStatesTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryRouterInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryRouterInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryRouterInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryDiskIOTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryDiskIOTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryDiskIOTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryStatInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryStatInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryStatInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryTradeOrderRttCutLineTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryTradeOrderRttCutLineTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryTradeOrderRttCutLineTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryClientInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryClientInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryClientInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryEventDescriptionTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryEventDescriptionTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryEventDescriptionTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryFrontUniqueIDTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryFrontUniqueIDTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryFrontUniqueIDTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetPartyLinkAddrChangeTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetPartyLinkAddrChangeTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetPartyLinkAddrChangeTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetDelPartyLinkInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetDelPartyLinkInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetDelPartyLinkInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryPerformanceTopTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryPerformanceTopTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryPerformanceTopTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryInstrumentStatusTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryInstrumentStatusTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryInstrumentStatusTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryCurrTradingSegmentAttrTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryCurrTradingSegmentAttrTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryCurrTradingSegmentAttrTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryRealTimeNetObjectAttrTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryRealTimeNetObjectAttrTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryRealTimeNetObjectAttrTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetAreaTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetAreaTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetAreaTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetSubAreaTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetSubAreaTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetSubAreaTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetSubAreaIPTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetSubAreaIPTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetSubAreaIPTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetDeviceDetectTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetDeviceDetectTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetDeviceDetectTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetDeviceRequestTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetDeviceRequestTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetDeviceRequestTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetBuildingTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetBuildingTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetBuildingTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetRoomTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetRoomTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetRoomTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetCabinetsTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetCabinetsTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetCabinetsTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetOIDTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetOIDTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetOIDTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetTimePolicyTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetTimePolicyTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetTimePolicyTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetGatherTaskTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetGatherTaskTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetGatherTaskTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetDeviceChgTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetDeviceChgTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetDeviceChgTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetDeviceTypeTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetDeviceTypeTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetDeviceTypeTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetDeviceCategoryTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetDeviceCategoryTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetDeviceCategoryTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetManufactoryTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetManufactoryTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetManufactoryTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetCommunityTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetCommunityTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetCommunityTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetPortTypeTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetPortTypeTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetPortTypeTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetPartAccessSpotTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetPartAccessSpotTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetPartAccessSpotTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetInterfaceTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetInterfaceTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetInterfaceTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetGeneralOIDTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetGeneralOIDTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetGeneralOIDTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorTypeTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorTypeTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorTypeTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorAttrScopeTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorAttrScopeTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorAttrScopeTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorAttrTypeTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorAttrTypeTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorAttrTypeTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorObjectAttrTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorObjectAttrTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorObjectAttrTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorDeviceGroupTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorDeviceGroupTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorDeviceGroupTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorTaskInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorTaskInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorTaskInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorTaskResultTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorTaskResultTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorTaskResultTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorTaskObjectSetTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorTaskObjectSetTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorTaskObjectSetTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetPartyLinkInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetPartyLinkInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetPartyLinkInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorActionAttrTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorActionAttrTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorActionAttrTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetModuleTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetModuleTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetModuleTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorTaskStatusResultTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorTaskStatusResultTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorTaskStatusResultTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetCfgFileTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetCfgFileTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetCfgFileTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetMonitorDeviceTaskTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetMonitorDeviceTaskTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetMonitorDeviceTaskTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryFileGeneralOperTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryFileGeneralOperTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryFileGeneralOperTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetBaseLineTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetBaseLineTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetBaseLineTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetBaseLineResultTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetBaseLineResultTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetBaseLineResultTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetPartyLinkStatusInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetPartyLinkStatusInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetPartyLinkStatusInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetLocalPingResultInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetLocalPingResultInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetLocalPingResultInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetRomotePingResultInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetRomotePingResultInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetRomotePingResultInfoTopicFailed, flag);
                }
            });

            curSocket.on(EVENTS.ReqQryNetNonPartyLinkInfoTopic, function(reqField) {
                var flag = userSocket[curSocket.id].userApi.ReqQryNetNonPartyLinkInfoTopic(reqField, userSocket[curSocket.id].RequestID++);
                if ( -1 === flag) {
                    curSocket.emit(EVENTS.ReqQryNetNonPartyLinkInfoTopicFailed, flag);
                }
            });

              									
	    }); // rootSocket.on('new user', function(userInfo) end!
        
        rootSocket.emit(EVENTS.NewUserReady, userInfo);
        	
    }); //rootSocket.on(EVENTS.NewUserCome);     	
}); // io.on('connection', function(rootSocket)) end!

