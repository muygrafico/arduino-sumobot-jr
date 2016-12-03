var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var led = new five.Led(13)
  console.log(led)
  led.blink(500)
})
