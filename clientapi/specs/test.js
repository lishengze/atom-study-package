// Generated by CoffeeScript 1.9.3
(function() {
  var api, events;

  api = require('../dist/api.js');

  events = api.EVENTS;

  api.init();

  api.on(events.FrontConnected, function(data) {
    console.log('data info!:' + data);
    return api.worker.send(events.ReqQrySysUserLoginTopic);
  });

  api.on(events.RspQrySysUserLoginTopic, function(data) {
    return console.log('userloginQry:' + data);
  });

}).call(this);
