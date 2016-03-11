console.log 'client-child-simple.coffee'

fs = require 'fs'
fileName = 'client-child-simple.txt';
fileData = "Hello " + process.pid + '\n';

fs.writeFile fileName, fileData,  (err)->
  if (err) throw err;
  console.log fileName + 's saved!'
