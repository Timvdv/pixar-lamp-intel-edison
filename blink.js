var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function()
{
  // Create a standard `led` component
  // on a valid pwm pin
  var servo = new five.Servo(
  {
    pin: 5,
    range: [45, 135],
    startAt: 120
  });

var legAnimation = new five.Animation(servo);

var stand = {
  duration: 1000,
  cuePoints: [0, 0.1, 0.3, 0.7, 1.0], oncomplete: function()
  {
    console.log('done');
  },
  keyFrames: [
    [null, { degrees: 90 }],
    [null, { degrees: 66 }],
    [null, false, false, { degrees: 120, easing: "easeIn"}, { degrees: 94, easing: "inCirc"}],
    [null, false, { degrees: 106}, false, { degrees: 93 }]
  ]
};

  setTimeout(function()
  {
    legAnimation.enqueue(stand);
  }, 1000);
      



  // var animation = new five.Animation(servo);
  // animation.enqueue({
  //   cuePoints: [0, 0.25, 0.75, 1],
  //   keyFrames: [90, { value: 180, easing: "inQuad" }, { value: 0, easing: "outQuad" }, 90],
  //   duration: 2000
  // });

  // board.repl.inject({
  //   servo: servo,
  //   animation: animation
  // });

  // var i = 0;
  // setInterval(function()
  // {
  //   i++;
  //   if(i % 2)
  //   {
  //     servo.to(180, 2000);
  //     servo.to(200, 2000);
  //   }
  //   else
  //   {
  //     servo.to(20, 2000);
  //     servo.to(0, 2000);
  //   }
  // }, 2000);
});