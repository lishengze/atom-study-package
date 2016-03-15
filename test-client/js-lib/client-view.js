// Generated by CoffeeScript 1.10.0
(function() {
  var ClientView, Disposable, ScrollView, fork, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Disposable = require('atom').Disposable;

  ScrollView = require('atom-space-pen-views').ScrollView;

  path = require('path');

  fork = require('child_process').fork;

  module.exports = ClientView = (function(superClass) {
    var clientMain;

    extend(ClientView, superClass);

    function ClientView() {
      return ClientView.__super__.constructor.apply(this, arguments);
    }

    ClientView.content = function() {
      return this.div((function(_this) {
        return function() {
          _this.h1("Client View is alive!");
          _this.button({
            click: 'TestAddNewUser'
          }, "TestAddNewUser");
          return _this.button({
            click: 'TestAddNewUserID_1'
          }, "TestAddNewUserID_1");
        };
      })(this));
    };

    clientMain = require('./client-main-b.js');

    console.log('client-view!');

    ClientView.prototype.TestAddNewUser = function() {
      console.log('TestAddNewUser!');
      return clientMain.childProcess.send({
        event: "TestAddNewUser",
        reqField: {}
      });
    };

    ClientView.prototype.TestAddNewUserID_1 = function() {
      console.log('TestAddNewUserID_1!');
      return clientMain.childProcess.send({
        event: "TestAddNewUserID_1",
        reqField: {}
      });
    };

    ClientView.attached = function() {};

    ClientView.detached = function() {};

    return ClientView;

  })(ScrollView);

}).call(this);
