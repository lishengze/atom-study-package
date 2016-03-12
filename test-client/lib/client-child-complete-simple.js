// Created by li.shengze on 2016/3/08.
var fs               = require('fs');
var spi              = require("./communication.js");

var events           = require("./events.js");
var EVENTS           = new events.EVENTS();

var SysUserApiStruct = require("./SysUserApiStruct.js");

var toolFunc         = require("./tool-function.js");
// var OutputMessage    = toolFunc.OutputMessage;

var io               = require('socket.io-client');
var path             = require('path');

var isHttps          = false;

var fileName = path.join (__dirname, './client-child-complete-simple.txt');
var fileData = "Hello Pid: " + process.pid + '\n';
fileData += "\nEnvironment Params: \n";
process.argv.forEach(function(val, index, array) {
  fileData += index + ': ' + val + '\n';
});
fileData += '\n';

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

var TestProcessFunc = function() {
  fileData += "\nDo TestProcessFunc\n";

  fs.writeFile(fileName, fileData, function (err) {
    if (err) throw err;
  });

}

rootSocket.on(EVENTS.NewUserReady, function(data){

  fileData += "Client: new user " + userInfo.UserID + " ready!\n";

	userSocket = io.connect(curUrl + '/' + userInfo.UserID);

  userSocket.on(EVENTS.NewUserConnectComplete, function(data){
       fileData += "Client: " + userInfo.UserID + "  connect completed!\n";
       userSocket.emit(EVENTS.RegisterFront, {});
	});

  userSocket.on("Test Front", function(data){
        fileData += "\n+++++++++  Communication FrontConnected! ++++++++\n";
        
        var data = {};
        data.event = 'TestFront';
        data.callbackData = 'Data from client-child-complete-simple.js'
        process.send(data);

        fs.writeFile(fileName, fileData, function (err) {
          if (err) throw err;
        });

  });

	userSocket.on(EVENTS.FrontConnected, function(callbackData){
        var reqField = userInfo;
	    userSocket.emit(EVENTS.ReqQrySysUserLoginTopic, reqField);
	});
});

var ReqFunc = [];
ReqFunc["TestAddNewUser"] = TestAddNewUser;
ReqFunc["TestAddNewUserID_1"] = TestAddNewUserID_1;
ReqFunc['TestProcess'] = TestProcessFunc;


process.on ('message', function(data) {

	// console.log("client-child: \n");
	// console.log(data);
	// console.log('\n');

  fileData += "reqData.event: " + data.event + '\n';
	var curReqFunc = ReqFunc[data.event];
	curReqFunc(data.reqField);

});

fs.writeFile(fileName, fileData, function (err) {
  if (err) throw err;
});
