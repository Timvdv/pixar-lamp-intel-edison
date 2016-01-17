var five = require("johnny-five");
var Galileo = require("galileo-io");
var readline = require('readline');
var board = new five.Board({
  io: new Galileo()
});
var mraa = require('mraa');
var NanoTimer = require('nanotimer');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

board.on("ready", function()
{
    var servo = new five.Servo({
        pin: 3,
        range: [5, 135],
        startAt: 90
    });

    var servo1, servo2, servo3;

   setTimeout(function()
   {
        servo1 = new five.Servo({
                pin: 5,
                range: [0, 80],
                startAt: 0
        });
   }, 1000);

   setTimeout(function()
   {
        servo2 = new five.Servo({
                pin: 6,
                range: [0, 120],
                startAt: 80
        });
   }, 2000);

   setTimeout(function()
   {
        servo3 = new five.Servo({
                pin: 9,
                range: [0, 180],
                startAt: 100
        });    
   }, 3000);

   

   setTimeout(function()
   {
        servo.stop();
        servo1.stop();
        servo2.stop();
        servo3.stop();

        console.log('HOII!!!!');
   }, 4000);
});
