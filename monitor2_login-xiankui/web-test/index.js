(function(){

  var submitFunc = function() {
    console.log ('submitFunc!');
    var userID = $('input:text').val();
    var password = $('input:password').val();

    var userinfo       = new SysUserApiStruct.CShfeFtdcReqQrySysUserLoginField();
    userinfo.UserID    = userID;
    userinfo.Password  = password;
    userinfo.VersionID = "2.0.0.0";
  };

  $('input:submit').click(submitFunc);

})();