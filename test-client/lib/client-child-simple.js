// .log ('client-child-simple.js!\n\n')
var fs = require('fs');
var path = require('path');
var fileName = path.join (__dirname, './client-child-simple.txt');
var fileData = "Hello Pid: " + process.pid + '\n';

fileData += 'Env Arg: \n';
process.argv.forEach(function(val, index, array) {
  fileData += index + ': ' + val + '\n';
});

fileData += '\n';

var TestProcessFunc = function() {
  fileData += "\nDo TestProcessFunc\n";

  fs.writeFile(fileName, fileData, function (err) {
    if (err) throw err;
  });

}

var funcCol = [];
funcCol['TestProcess'] = TestProcessFunc;

process.on ('message', function(data) {

	fileData += "client-child-simple: data from client-view \n";

	var func = funcCol[data.event];
	func();

	var rspData = {};
	rspData.event = 'TestProcessCallbackData';
	rspData.callbackData = data.reqField;

	process.send(rspData);

})

fs.writeFile(fileName, fileData, function (err) {
  if (err) throw err;
});
