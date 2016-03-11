// Created by li.shengze on 2016/3/08.
var fs               = require('fs');
var spi              = require("./communication.js");

var events           = require("./events.js");
var EVENTS           = new events.EVENTS();

var SysUserApiStruct = require("./SysUserApiStruct.js");

var toolFunc         = require("./tool-function.js");
var OutputMessage    = toolFunc.OutputMessage;

var io               = require('socket.io-client');
var path             = require('path');

var isHttps  = true;
var fileName = path.join (__dirname, './client-child-complete-s.txt');
var fileData = "Hello Pid: " + process.pid + '\n';

process.argv.forEach(function(val, index, array) {
  fileData += index + ': ' + val + '\n';
});

if (true === isHttps) {
	var localUrl   = 'https://localhost'
	var serverUrl  = 'https://172.1.128.169'
	var port       = 8000;
	var curUrl     = serverUrl + ':' + port.toString();
	var rootSocket = io.connect(curUrl,{secure:true});
} else {
	var localUrl   = 'http://localhost';
    var serverUrl  = 'http://172.1.128.169';
    var curUrl     = localUrl;
	var rootSocket = io.connect(curUrl);
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

var TestAddNewUser = function () {
    var userinfo = {};
    userinfo           = new SysUserApiStruct.CShfeFtdcReqQrySysUserLoginField();
    userinfo.UserID    = "admin";
    userinfo.Password  = "admin";
    userinfo.VersionID = "2.0.0.0";

    addNewUser(userinfo);
}

var TestAddNewUserID_1 = function () {
    var userinfo = {};
    userinfo           = new SysUserApiStruct.CShfeFtdcReqQrySysUserLoginField();
    userinfo.UserID    = "NewUserID_1";
    userinfo.Password  = "1234567";
    userinfo.VersionID = "2.0.0.0";

    addNewUser(userinfo);
}

rootSocket.on("user reconnected", function(UserID) {
   OutputMessage("Client: " + UserID + " has already logged!");
});


rootSocket.on(EVENTS.NewUserReady, function(data){

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
});

var ReqFunc = [];
ReqFunc["TestAddNewUser"] = TestAddNewUser;
ReqFunc["TestAddNewUserID_1"] = TestAddNewUserID_1;

process.on ('message', function(data) {

	// console.log("client-child: \n");
	// console.log(data);
	// console.log('\n');

  fileData += "reqData.event: " + data.event + '\n';
	var curReqFunc = ReqFunc[data.event];
	curReqFunc(data.reqField);

  fs.writeFile(fileName, fileData, function (err) {
    if (err) throw err;
  });

});

fs.writeFile(fileName, fileData, function (err) {
  if (err) throw err;
});
