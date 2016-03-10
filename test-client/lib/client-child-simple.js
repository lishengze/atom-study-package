console.log ('client-child-simple.js!\n\n')

// console.log(process.argv);

process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
});

var TestProcessFunc = function () {
	console.log('\nclient-child-simple: TestProcessFunc!\n');
}

var funcCol = [];
funcCol['TestProcess'] = TestEmitterFunc;

process.on ('message', function(data) {

	console.log("\nclient-child-simple: data from client-view");
	console.log(data);
	console.log('\n');

	var func = funcCol[data.event];
	func();

	var rspData = {};
	rspData.event = 'TestProcessCallbackData';
	rspData.callbackData = data.reqField;

	process.send(rspData);

})
