// Generated by CoffeeScript 1.10.0
(function() {
  var TestClientView;

  module.exports = TestClientView = (function() {
    function TestClientView(serializedState) {
      var message;
      this.element = document.createElement('div');
      this.element.classList.add('test-client');
      message = document.createElement('div');
      message.textContent = "Come Man!";
      message.classList.add('message');
      this.element.appendChild(message);
    }

    TestClientView.prototype.serialize = function() {};

    TestClientView.prototype.destroy = function() {
      return this.element.remove();
    };

    TestClientView.prototype.getElement = function() {
      return this.element;
    };

    return TestClientView;

  })();

}).call(this);