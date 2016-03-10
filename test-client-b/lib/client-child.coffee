emitter = process.argv[process.argv.length - 1];
emitter.on 'TestEmitter', (data) ->
	process.send {event:'TestEmitter_Data', callbackData: 'Hello World'}
