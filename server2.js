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
    res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

servos = null;

board.on("ready", function()
{
    // Create two customized servos
    // 

    //3 -> rust 90 graden normaal
    //5 -> rust 0 graden normaal - max 80 graden
    //6 -> rust 80 graden normaal - min 0 - max 120 graden
    //9 -> rust 100 - min 0 - max 180

    servos = new five.Servos([
        /**
         * draaiplato - GEEL LOS
         */
        {
            pin: 3,
            range: [5, 135],
            startAt: 90
        },

        /**
         * Voet arm (onderste twee servo's) - GEEL
         */
        {
            pin: 5,
            range: [0, 80],
            startAt: 0
        },

        /**
         * middel arm - GROEN
         */        
        {
            pin: 6,
            range: [0, 120],
            startAt: 80
        },

        /**
         * boven arm - WIT
         * (was eerst max 180 maar vanwege veertje 130)
         */
        {
            pin: 9,
            range: [0, 130],
            startAt: 100
        },

        // /**
        //  * boven arm - GRIJS
        //  */
        // {
        //     pin: 10,
        //     range: [0, 80]
        // }        
    ]);    

    function bekijkDeVloer()
    {
        console.log('even de vloer bekijken');
        var animation = new five.Animation(servos);

        //Create an animation object
        animation.enqueue(
        {
        duration: 3000,
        cuePoints: [0, 0.3, 1.0],
        keyFrames: [
                [{degrees: 90, easing: "inOutQuad"}, {degrees: 60, easing: "inOutQuad"}, {degrees: 90, easing: "inOutQuad"}],
                [{degrees: 0, easing: "inOutQuad"}, {degrees: 40, easing: "inOutQuad"}, {degrees: 0, easing: "inOutQuad"}],
                [{degrees: 80, easing: "inOutQuad"}, {degrees: 65, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}],
                [{degrees: 100, easing: "inOutQuad"}, {degrees: 105, easing: "inOutQuad"}, {degrees: 100, easing: "inOutQuad"}]
            ]
        });
    }

    function bekijkPlafond()
    {
        console.log('soms moet je even naarboven kijken');
        var animation = new five.Animation(servos);

        //Create an animation object
        animation.enqueue(
        {
        duration: 3000,
        cuePoints: [0, 0.3, 1.0],
        keyFrames: [
                [{degrees: 90, easing: "inOutQuad"}, {degrees: 20, easing: "inOutQuad"}, {degrees: 90, easing: "inOutQuad"}],
                [{degrees: 0, easing: "inOutQuad"}, {degrees: 10, easing: "inOutQuad"}, {degrees: 0, easing: "inOutQuad"}],
                [{degrees: 80, easing: "inOutQuad"}, {degrees: 120, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}],
                [{degrees: 100, easing: "inOutQuad"}, {degrees: 20, easing: "inOutQuad"}, {degrees: 100, easing: "inOutQuad"}]
            ]
        });
    }    

    function knikJa()
    {
        console.log('JAAHAAA');
        var animation = new five.Animation(servos);

        //Create an animation object
        animation.enqueue(
        {
        duration: 1000,
        cuePoints: [0, 0.3, 1.0],
        keyFrames: [
                [{degrees: 90, easing: "inOutQuad"}],
                [{degrees: 0, easing: "inOutQuad"}, {degrees: 10, easing: "inOutQuad"}, {degrees: 0, easing: "inOutQuad"}],
                [{degrees: 80, easing: "inOutQuad"}, {degrees: 90, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}],
                [{degrees: 100, easing: "inOutQuad"}, {degrees: 130, easing: "inOutQuad"}, {degrees: 100, easing: "inOutQuad"}]
            ]
        });

        customPWMStart(2000);
    }    

    function knikNee()
    {
        console.log('NEHEEEEE');
        var animation = new five.Animation(servos);

        //Create an animation object
        animation.enqueue(
        {
        duration: 5000,
        cuePoints: [0, 0.3, 0.4, 1.0],
        keyFrames: [
                [{degrees: 90, easing: "inOutQuad"}, {degrees: 60, easing: "inOutQuad"}, {degrees: 110, easing: "inOutQuad"}, {degrees: 90, easing: "inOutQuad"}],
                [{degrees: 0, easing: "inOutQuad"}, {degrees: 10, easing: "inOutQuad"}, {degrees: 0, easing: "inOutQuad"}],
                [{degrees: 80, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}],
                [{degrees: 100, easing: "inOutQuad"}, {degrees: 100, easing: "inOutQuad"}, {degrees: 100, easing: "inOutQuad"}]
            ]
        });

        //Draai kop
        customPWMStart(1000);
    }        

    // var i = 1;

    // setInterval(function()
    // {
    //     switch(i)
    //     {
    //         case 1:
    //             knikJa();
    //             break;
    //         case 2:
    //             knikNee();
    //             break;   
    //         case 3:
    //             bekijkPlafond();
    //             break;    
    //         case 4:
    //             bekijkDeVloer();
    //             break;                                                
    //         default:
    //             i = 0;
    //             break;
    //     }

    //     i++;
    // }, 4000);
});



/**
 * CUSTOM PWM
 * 
 */

var pin = new mraa.Gpio(11);
pin.dir(mraa.DIR_OUT);
PWM = 1;
PWM_enabled = false;
counter = 0;
PWM_speed = 1500;

// setTimeout(function()
// {
//     PWM_enabled = false;
// }, 20000);

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
    }, 2000);
}


var LampPos = [90,0,80,100];

app.post('/', function(req, res, next) {

//    console.log(req.body);
    var x = req.body.x,
          y = req.body.y,
          z = req.body.z;

      console.log('y:' + y + ' - x:' + x + ' - z:' + z);

      servos.each(function( servo, index )
      {
            if(index == 1)
            {
                var direction = true;

                if(0 < y)
                    direction = false;

                if(y != 0)
                    stepLoop(0, Math.abs(y), this, direction);
            }

            if(index == 0)
            {
                var direction = true;

                if(0 < x)
                    direction = false;

                if(x != 0)
                    stepLoop(0, Math.abs(x), this, direction);
            }            
      });

      res.end('It worked!');
});

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


