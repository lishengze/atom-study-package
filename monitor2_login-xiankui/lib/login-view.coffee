{View}           = require 'space-pen'
{TextEditorView} = require 'atom-space-pen-views'
SysUserApiStruct = require './SysUserApiStruct.js'
events           = require './events.js'
EVENTS           = new events.EVENTS()
reconnectLimits  = 1;
isFirstConnect   = true;
window.userApiStruct = SysUserApiStruct;
window.EVENTS    = EVENTS;

module.exports =
class LoginView extends View
  @content: ->
    @div class: 'loginView', =>
      @div class: 'modal fade', outlet: "login", =>
        @div class: 'modal-dialog modal-lg', =>
          @div class: 'modal-content', =>
            @div class: 'modal-header', =>
              @button type: 'button', tabindex: '-1', class: 'icon icon-remove-close close ', 'data-dismiss': 'modal', 'aria-label': 'Close'
              @h4 class:'modal-title pull-left', '用户登录'
            @div class: 'modal-body', =>
              @form class: 'form-horizontal', role : 'form', =>
                @div class: 'form-group', =>
                  @span class: 'fa fa-user fa-3x col-lg-2'
                  @div class: 'col-lg-10', =>
                    @input class: 'form-control native-key-bindings', tabindex: '3', type: 'text', placeholder: '用户名', outlet:'inputText'
                @div class: 'form-group', =>
                  @span class: 'fa fa-key fa-3x col-lg-2'
                  @div class: 'col-lg-10', =>
                    @input class: 'form-control native-key-bindings', tabindex: '4', type: 'password', placeholder: '密码', outlet:'inputPassword'
                @div class: 'form-group', =>
                  @span class: 'fa fa-server fa-3x col-lg-2'
                  @div class: 'col-lg-10', =>
                    @select class: 'form-control', =>
                      @option '165'
                      @option '166'
                @div class: 'form-group', =>
                  @div class: 'pull-right col-lg-4', =>
                    @div class: 'checkbox', =>
                      @label '记住我', =>
                        @input type: 'checkbox', tabindex: '6'
                @div class: 'form-group', =>
                  @span class: 'col-lg-2', outlet:'connectinfo', '正在连接服务器......'
            @div class: 'modal-footer',=>
                  @button outlet:'loginSubmit',type: 'button', click:'loginFunc', tabindex: '7', class: 'btn btn-primary btn-lg', '登录'
                  @button type: 'button', tabindex: '8', 'data-dismiss':'modal', class: 'btn btn-primary btn-lg', '退出'

  initialize: ->
    $('body').append(@login.parent())
    $(@login[0]).modal('backdrop': 'static', keyboard: true, show: true) #打开客户端即显示登录界面
    #@loginSubmit.click(@loginFunc)
    # @loginSubmit.click(=>
    #     console.log '@loginSubmit!'
    #     userID   = @inputText.val()
    #     password = @inputPassword.val()
    #     userinfo           = new userApiStruct.CShfeFtdcReqQrySysUserLoginField()
    #     userinfo.UserID    = userID
    #     userinfo.Password  = password
    #     userinfo.VersionID = "2.0.0.0"
    #
    #     if $('.checkbox')
    #       console.log 'checkbox is true!'
    #       window.userInfo = userinfo
    #
    #     console.log 'login-view: data from dialog'
    #     console.log userinfo
    #
    #     # userApi.childProcess.send {event: EVENTS.StartConnectServer, reqField: {} }
    #     #
    #     # userApi.emitter.on EVENTS.ConnectServerComplete, (data)->
    #     #       console.log "ConnectServerComplete"
    #     #       userApi.childProcess.send {event: EVENTS.NewUserCome, reqField: userinfo }
    #     userApi.childProcess.send {event: EVENTS.NewUserCome, reqField: userinfo }
    # )

  loginFunc: ->
        console.log '@loginSubmit!'
        userID   = @inputText.val()
        password = @inputPassword.val()
        userinfo           = new userApiStruct.CShfeFtdcReqQrySysUserLoginField()
        userinfo.UserID    = userID
        userinfo.Password  = password
        userinfo.VersionID = "2.0.0.0"

        if $('.checkbox')
          console.log 'checkbox is true!'
          window.userInfo = userinfo

        console.log 'login-view: data from dialog'
        console.log userinfo

        # userApi.childProcess.send {event: EVENTS.StartConnectServer, reqField: {} }
        #
        # userApi.emitter.on EVENTS.ConnectServerComplete, (data)->
        #       console.log "ConnectServerComplete"
        #       userApi.childProcess.send {event: EVENTS.NewUserCome, reqField: userinfo }
        userApi.childProcess.send {event: EVENTS.NewUserCome, reqField: userinfo }

  attached: ->
      clientMain       = require './client-main.js'
      window.userApi   = clientMain;

      userApi.emitter.on EVENTS.RootSocketReconnecting, (Number) =>
          console.log EVENTS.RootSocketReconnecting
          console.log Number
          if Number > reconnectLimits
            # 确定链接失败.
            if isFirstConnect
                @connectinfo.text('连接服务器失败！')
            else

      userApi.emitter.on EVENTS.RootSocketConnect, (data)->
          console.log EVENTS.RootSocketConnect
          isFirstConnect = false


      userApi.emitter.on EVENTS.RootSocketConnectError, (data) ->
          console.log EVENTS.RootSocketConnectError

      userApi.emitter.on EVENTS.RootSocketDisconnect, (data) ->
          console.log EVENTS.RootSocketDisconnect

      userApi.emitter.on EVENTS.RootSocketReconnect, (data) ->
          console.log EVENTS.RootSocketReconnect

      userApi.emitter.on EVENTS.RootSocketReconnectAttempt, (data) ->
          console.log EVENTS.RootSocketReconnectAttempt

      userApi.emitter.on EVENTS.RootSocketReconnectError, (data) ->
          console.log EVENTS.RootSocketReconnectError
          console.log data

      userApi.emitter.on EVENTS.RootSocketReconnectFailed, (data) ->
          console.log EVENTS.RootSocketReconnectFailed
          console.log data

      userApi.emitter.on EVENTS.RspQrySysUserLoginTopic, (data) ->
          $(@login[0]).modal('hide') # 登录成功隐藏对话框
          console.log "login-view: RspQrySysUserLoginTopic CallbackData"
          console.log data

  connectServer: ->

  serverMsgFunc: ->

  show: ->
    $(@login[0]).modal 'backdrop': 'static', keyboard: false, show: true
