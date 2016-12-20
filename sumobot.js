// =======================
// Sumobot Jr demo program
// =======================

'use strict'

var five = require('johnny-five')
var keypress = require('keypress')
var events = require('events')
var eventEmitter = new events.EventEmitter()
var currentKey
//  F = Forward B = Backward L = Left R = Right
eventEmitter.on('F', function () {
  currentKey = 'F'
  console.log('Forward')
})

eventEmitter.on('B', function () {
  currentKey = 'B'
  console.log('Backward')
})

eventEmitter.on('L', function () {
  currentKey = 'L'
  console.log('Left')
})

eventEmitter.on('R', function () {
  currentKey = 'R'
  console.log('Right')
})

// var board = new five.Board()
var board = new five.Board({
  port: '/dev/cu.RandomBot-DevB'
})

board.on('ready', function () {
  console.log('Welcome to Sumobot Jr!')
  console.log('Control the bot with the arrow keys')

  var leftWheel = new five.Servo({ pin: 11, type: 'continuous' }).stop()
  var rightWheel = new five.Servo({ pin: 10, type: 'continuous' }).stop()

  setInterval(function () {
    setTimeout(function () { currentKey = null }, 100)
    switch (currentKey) {
      case 'F':
        leftWheel.cw()
        rightWheel.ccw()
        break
      case 'B':
        leftWheel.ccw()
        rightWheel.cw()
        break
      case 'L':
        leftWheel.ccw()
        rightWheel.ccw()
        break
      case 'R':
        leftWheel.cw()
        rightWheel.cw()
        break
      case null:
        leftWheel.stop()
        rightWheel.stop()
        break
    }
    // console.log(currentKey)
  }, 90)

  keypress(process.stdin)
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.setRawMode(true)
  process.stdin.on('keypress', function (ch, key) {
    if (!key) { return }
    if (key.name === 'q') {
      console.log('Quitting')
      process.exit()
    } else if (key.name === 'up') {
      eventEmitter.emit('F')
    } else if (key.name === 'down') {
      eventEmitter.emit('B')
    } else if (key.name === 'left') {
      eventEmitter.emit('L')
    } else if (key.name === 'right') {
      eventEmitter.emit('R')
    } else if (key.name === 'space') {
      console.log('Stopping')
      leftWheel.stop()
      rightWheel.stop()
    }
  })
})
