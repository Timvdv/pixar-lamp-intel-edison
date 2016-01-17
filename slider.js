var five = require("johnny-five");
var Galileo = require("galileo-io");
var readline = require('readline');
var board = new five.Board({
  io: new Galileo()
});
var mraa = require('mraa');
var NanoTimer = require('nanotimer');

var path    = require("path");
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/slider.html'));
});

var server = app.listen(3000, function ()
{
    console.log('Example app listening at http://comfort-4.local:3000');
});

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

servos = null;

var turn_lamp, lower_arm, upper_arm, head;

board.on("ready", function()
{
    /**
     * draaiplato - GEEL LOS
     */
    turn_lamp = new five.Servo(
    {
        pin: 3,
        range: [5, 135],
        startAt: 90
    });

    /**
     * Voet arm (onderste twee servo's) - GEEL
     */
    lower_arm = new five.Servo({
        pin: 5,
        range: [0, 80],
        startAt: 0
    });

    /**
     * middel arm - GROEN
     */       
    upper_arm = new five.Servo({
        pin: 6,
        range: [0, 120],
        startAt: 80
    });

    /**
     * boven arm - WIT
     * (was eerst max 180 maar vanwege veertje 130)
     */     
    head = new five.Servo({
        pin: 9,
        range: [0, 130],
        startAt: 100
    });
});

/**
 * CUSTOM PWM
 */

var pin = new mraa.Gpio(11);
pin.dir(mraa.DIR_OUT);
PWM = 1;
PWM_enabled = false;
counter = 0;
PWM_speed = 1500;

function customPWM()
{
    var timerA = new NanoTimer();
    
    timerA.setTimeout(dary, '', PWM_speed+'u');

    pin.write(1);

    function dary()
    {
        pin.write(0);
    }

    setTimeout(function()
    {
            timerA.clearInterval();

            if(PWM_enabled)
            {
                customPWM();
            }
    }, 20);
}

function customPWMStart(speed)
{
    PWM_enabled = true;
    PWM_speed = speed;
    customPWM();

    setTimeout(function()
    {
        PWM_enabled = false;
    }, 300);
}

app.post('/', function(req, res, next)
{
    var lamp = req.body.lamp,
          data = req.body.data,
          anim = null;

    switch(lamp)
    {
        case "head": 
            anim = animationSpeed(head.value, data);
            head.to(data, anim);
            break;
        case "upper_arm":   
            anim = animationSpeed(upper_arm.value, data);
            upper_arm.to(data, anim);
            break;
        case "lower_arm":   
            anim = animationSpeed(lower_arm.value, data);
            lower_arm.to(data, anim);
            break;
        case "turn_lamp":   
            anim = animationSpeed(turn_lamp.value, data);
            turn_lamp.to(data, anim);
            break;
        case "turn_head": 
            if( data == 1)
                headLeft();
            else if( data == 2)
                headCenter();
            else if( data == 3)
                headRight();            
            break;
    }

    res.end('It worked!');
});

function animationSpeed(val, new_val)
{
    var delta = Math.abs(val - new_val),
          anim = Math.round(delta * 20);

  console.log("Animatie: "+ anim);   
  
  return  anim;
}

function stepLoop(i, imax, servo, direction)
{
    if(direction)
        servo.step(1);
    else
        servo.step(-1);

    setTimeout(function()
    {
        i++;

        if(i < imax)
            stepLoop(i, imax, servo, direction);
    }, 50);
}

function headCenter()
{
       customPWMStart(1200);
}

function headLeft()
{
       customPWMStart(600);
}

function headRight()
{
       customPWMStart(2000);
}
