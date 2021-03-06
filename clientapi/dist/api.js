// Generated by CoffeeScript 1.9.3
(function() {
  var ClientAPI, EventEmitter, _, fork, io, path;

  EventEmitter = require('events').EventEmitter;

  fork = require('child_process').fork;

  io = require('socket.io-client');

  _ = require('underscore-plus');

  path = require('path');

  ClientAPI = (function() {
    _.extend(ClientAPI.prototype, EventEmitter.prototype);

    ClientAPI.prototype.SERVER_URL = 'https://172.1.128.169:8000';

    function ClientAPI() {
      this.EVENTS = require('./events.json');
    }

    ClientAPI.prototype.init = function() {
      var bgAPIPath;
      bgAPIPath = path.join(__dirname, 'backgroundAPI.js');
      
      this.worker = fork(bgAPIPath, [this.SERVER_URL]);
      
      return this.worker.on('message', (function(_this) {
        return function(data) {
          return _this.emit(data.event, data);
        };
      })(this));
      
    };

    return ClientAPI;

  })();

  module.exports = new ClientAPI;

}).call(this);
