api = require '../dist/api.js'
events = api.EVENTS
api.init()
# console.log(events.FrontConnected);
api.on events.FrontConnected, (data)  ->
  console.log 'data info!:'+data
  api.worker.send events.ReqQrySysUserLoginTopic

api.on events.RspQrySysUserLoginTopic, (data)  ->
  console.log 'userloginQry:'+data
