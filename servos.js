var five = require("johnny-five");
var Galileo = require("galileo-io");
var readline = require('readline');
var board = new five.Board({
  io: new Galileo()
});

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

board.on("ready", function()
{

    //3 -> rust 90 graden normaal
    //5 -> rust 0 graden normaal - max 80 graden
    //6 -> rust 80 graden normaal - min 0 - max 120 graden
    //9 -> rust 100 - min 0 - max 180

    var servo = new five.Servo(9);
    var animation = new five.Animation(servo);

    // Create an animation segment object
    animation.enqueue({
      duration: 4000,
      cuePoints: [0, 0.5, 1.0],
      keyFrames: [ {degrees: 0}, {degrees: 180}, {degrees: 100}]
    });  
});