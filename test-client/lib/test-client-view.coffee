module.exports =
class TestClientView
  constructor: (serializedState) ->
    # Create root element
    @element = document.createElement('div')
    @element.classList.add('test-client')

    # Create message element
    message = document.createElement('div')
    message.textContent = "Come Man!"
    message.classList.add('message')
    
    @element.appendChild(message)

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @element.remove()

  getElement: ->
    @element
