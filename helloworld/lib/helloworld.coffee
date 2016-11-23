HelloworldFunc = require './helloworld-view'
addon = require './addon.node'

# {exec} = require 'child_process'

# child_process = require 'child_process'
# exec = child_process.exec

# # cmdStr = 'node child-addon.js'
# cmdStr = 'node --version'

# exec cmdStr, (err,stdout,stderr) -> 
#      if err
#          console.log 'get weather api error:' + stderr 
#      else 
#          console.log stdout

HelloPackage = ->
  console.log ("Hello Package!");

HelloPackage();

module.exports = HelloPackage