// =======================
// Sumobot Jr demo program
// =======================

'use strict'

var five = require('johnny-five')
var keypress = require('keypress')
var events = require('events')
var eventEmitter = new events.EventEmitter()
var currentKey
// var ringBell = function ringBell () {
//   console.log('ring ring ring')
// }
// eventEmitter.on('doorOpen', ringBell)
// eventEmitter.emit('doorOpen')

eventEmitter.on('Forward', function () {
  currentKey = 'Forward'
})

eventEmitter.on('Backward', function () {
  currentKey = 'Backward'
})

eventEmitter.on('Left', function () {
  currentKey = 'Left'
})

eventEmitter.on('Right', function () {
  currentKey = 'Right'
})

var board = new five.Board()

board.on('ready', function () {
  console.log('Welcome to Sumobot Jr!')
  console.log('Control the bot with the arrow keys, and SPACE to stop.')

  var leftWheel = new five.Servo({ pin: 11, type: 'continuous' }).stop()
  var rightWheel = new five.Servo({ pin: 10, type: 'continuous' }).stop()

  setInterval(function () {
    setTimeout(function () { currentKey = null }, 100)
    switch (currentKey) {
      case 'Forward':
        // leftWheel.ccw()
        // rightWheel.cw()
        leftWheel.cw()
        rightWheel.ccw()
        break
      case 'Backward':
        leftWheel.ccw()
        rightWheel.cw()
        break
      case 'Left':
        leftWheel.ccw()
        rightWheel.ccw()
        break
      case 'Right':
        leftWheel.cw()
        rightWheel.cw()
        break
      case null:
        leftWheel.stop()
        rightWheel.stop()
        break
      // default:
    }
    console.log(currentKey)
  }, 90)

  keypress(process.stdin)
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.setRawMode(true)
  process.stdin.on('keypress', function (ch, key) {
    if (!key) { return }

    if (key.name === 'q') {
      console.log('Quitting')
      // process.exit()
    } else if (key.name === 'up') {
      // console.log('Forward')
      eventEmitter.emit('Forward')
      // leftWheel.ccw()
      // rightWheel.cw()
    } else if (key.name === 'down') {
      // console.log('Backward')
      eventEmitter.emit('Backward')
      // leftWheel.cw()
      // rightWheel.ccw()
    } else if (key.name === 'left') {
      // console.log('Left')
      eventEmitter.emit('Left')
      // leftWheel.ccw()
      // rightWheel.ccw()
    } else if (key.name === 'right') {
      // console.log('Right')
      eventEmitter.emit('Right')
      // leftWheel.cw()
      // rightWheel.cw()
    } else if (key.name === 'space') {
      console.log('Stopping')
      leftWheel.stop()
      rightWheel.stop()
    }
  })
})
