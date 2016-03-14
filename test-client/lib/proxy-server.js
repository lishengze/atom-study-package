var fs               = require('fs');
var spi              = require("./communication.js");

// var addon            = require("./addon");

var events           = require("./events.js");
var EVENTS           = new events.EVENTS();

var toolFunc         = require("./tool-function.js");
var OutputMessage    = toolFunc.OutputMessage;
var getSubString     = toolFunc.getSubString;

var userConnection   = [];
var userSocket       = [];
var userCount        = 0;
var isHttps          = false;

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

var showCurProcessThreads = function () {
    var path = require('path');
    var spawn = require('child_process').spawn;
    var dir = path.join('/proc', process.pid.toString(), 'task');
    var ls = spawn('ls', [dir]);
    ls.stdout.on('data', function(data){
        console.log('Time:'+Date.now()+'\nThreads: '+ data);
    });
}

io.on('connection', function(rootSocket) {
    var spawna = require('child_process').spawn('mkdir', ['usr']);
    OutputMessage("Proxy-Server: root connect complete!");

    showCurProcessThreads();

    rootSocket.on('disconnect', function(data) {
			console.log('rootSocket disconnect!');
		});

		rootSocket.on(EVENTS.NewUserCome, function(userInfo) {
        if (undefined !== userConnection[userInfo.UserID]) {
            OutputMessage("Proxy-Server: " + userInfo.UserID + " has already logged!");
            rootSocket.emit("user reconnected", userInfo.UserID);
            return;
        }
				OutputMessage("Proxy-Server: new user " + userInfo.UserID + " come!");

				userConnection[userInfo.UserID] = {};
        userConnection[userInfo.UserID].userInfo = userInfo;
        userConnection[userInfo.UserID].socket = io.of('/' + userInfo.UserID);

        var userWorkDirName = 'usr/' + userInfo.UserID;
        var spawnb = require('child_process').spawn('mkdir', [userWorkDirName]);

        userConnection[userInfo.UserID].socket.on ('connection', function (curSocket) {
            // 登陆相关删除; 资源析构;
            curSocket.on('disconnect', function(data) {
              // var currUserID = getSubString(curSocket.id, '/','#');
							// var currUserID = curSocket.nsp.name.slice(1);
              userConnection[currUserID] = undefined;
              userSocket[curSocket.id] = {};
		      		OutputMessage(curSocket.id + ' disconnect!');
	        });

						var currUserID = curSocket.nsp.name.slice(1);
						// OutputMessage('curSocket: \n');
						// OutputMessage(curSocket);
						// OutputMessage('curSocket.nap.name' + curSocket.nsp.name);
						// OutputMessage('currUserID: ' + currUserID);
            OutputMessage("Proxy-Server: new user " + currUserID + " connect completed!");

            curSocket.emit(EVENTS.NewUserConnectComplete, currUserID);

            curSocket.on(EVENTS.RegisterFront, function() {
							OutputMessage('\n------  Proxy-Server: Connect Front!-------\n');
            	curSocket.emit("Test Front", 'succeed!');
						});

	    }); // rootSocket.on('new user', function(userInfo) end!

        rootSocket.emit(EVENTS.NewUserReady, userInfo);

    }); //rootSocket.on(EVENTS.NewUserCome);
}); // io.on('connection', function(rootSocket)) end!
