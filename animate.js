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
    // Create two customized servos
    // 

    //3 -> rust 90 graden normaal
    //5 -> rust 0 graden normaal - max 80 graden
    //6 -> rust 80 graden normaal - min 0 - max 120 graden
    //9 -> rust 100 - min 0 - max 180
    //

    var servos = new five.Servos([
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
         *          * middel arm - grijs
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
            range: [0, 180],
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
                [{degrees: 90, easing: "inOutQuad"}, {degrees: 40, easing: "inOutQuad"}, {degrees: 90, easing: "inOutQuad"}],
                [{degrees: 0, easing: "inOutQuad"}, {degrees: 10, easing: "inOutQuad"}, {degrees: 0, easing: "inOutQuad"}],
                [{degrees: 80, easing: "inOutQuad"}, {degrees: 100, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}],
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
    }    

    function knikNee()
    {
        console.log('NEHEEEEE');
        var animation = new five.Animation(servos);

        //Create an animation object
        animation.enqueue(
        {
        duration: 1000,
        cuePoints: [0, 0.5, 1],
        keyFrames: [
                [{degrees: 90, easing: "inOutQuad"}, {degrees: 90, easing: "inOutQuad"}, {degrees: 90, easing: "inOutQuad"}],
                [{degrees: 0, easing: "inOutQuad"}, {degrees: 0, easing: "inOutQuad"}, {degrees: 0, easing: "inOutQuad"}],
                [{degrees: 80, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}],
                [{degrees: 100, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}, {degrees: 100, easing: "inOutQuad"}]
            ]
        });

        //Draai kop om 'nee te schudden'

        nope();

        setTimeout(function()
        {
            nope();
        }, 800);

        function nope()
        {
            headLeft();

            setTimeout(function()
            {            
                headRight();
            }, 400);
        }

        setTimeout(function()
        {
            headCenter();
        }, 1600);        

    }

    function schudEraf()
    {
        console.log('gooi die muts weggg');
        var animation = new five.Animation(servos);

        //Create an animation object
        animation.enqueue(
        {
        duration: 3000,
        cuePoints: [0, 0.5, 1.0],
        keyFrames: [
                [{degrees: 90, easing: "inOutQuad"}, {degrees: 100, easing: "inOutQuad"}, {degrees: 120, easing: "inOutQuad"}],
                [{degrees: 0, easing: "inOutQuad"}, {degrees: 40, easing: "inOutQuad"}, {degrees: 50, easing: "inOutQuad"}],
                [{degrees: 80, easing: "inOutQuad"}, {degrees: 65, easing: "inOutQuad"}, {degrees: 65, easing: "inOutQuad"}],
                [{degrees: 100, easing: "inOutQuad"}, {degrees: 105, easing: "inOutQuad"}, {degrees: 105, easing: "inOutQuad"}]
            ]
        });
    }

    function backup()
    {
        console.log('backup');
        var animation = new five.Animation(servos);

        //Create an animation object
        animation.enqueue(
        {
        duration: 3000,
        cuePoints: [0, 0.5, 1.0],
        keyFrames: [
                [{degrees: 120, easing: "inOutQuad"}, {degrees: 70, easing: "inOutQuad"}, {degrees: 90, easing: "inOutQuad"}],
                [{degrees: 50, easing: "inOutQuad"}, {degrees: 50, easing: "inOutQuad"}, {degrees: 0, easing: "inOutQuad"}],
                [{degrees: 65, easing: "inOutQuad"}, {degrees: 65, easing: "inOutQuad"}, {degrees: 80, easing: "inOutQuad"}],
                [{degrees: 100, easing: "inOutQuad"}, {degrees: 105, easing: "inOutQuad"}, {degrees: 100, easing: "inOutQuad"}]
            ]
        });        
    }

    //Before it does anything make sure it's in the center pos
    //center();

    var i = 1;

    setInterval(function()
    {
        switch(i)
        {
            case 1:
                knikJa();
                break;
            case 2:
                knikNee();
                break;   
            case 3:
                //bekijkPlafond();
                schudEraf();
                //knikNee();
                break;    
            case 4:
                //bekijkDeVloer();
                backup();
                break;                                                
            default:
                i = 0;
                break;
        }

        i++;
    }, 4000);

    function center()
    {
          console.log('Position to default settings');
          
          servos.each(function( servo, index )
          {
                //servo.to(servo.startAt);
                servo.center();
                console.log(servo.position);
          });

          headCenter();
    }


//    servotest();

    //Make sure to wait for the lamp to be in center pos

    // setTimeout(function()
    // {
    //     servotest();
    // }, 300);

    function servotest()
    {
        var time = 0;
        servos.each(function( servo, index )
        {
                console.log('servo: ' + index);
                
                setTimeout(function()
                {
                    testservo(servo, index);
                }, time);

                time += 16000;        
        });
    }

});

function testservo(serv, index)
{
    console.log('serv: '+ index +' to center');
    serv.center(4000);

    setTimeout(function()
    {
        console.log('serv: '+ index +' to '+serv.range[0]);
        serv.max(4000);
    }, 4000);

    setTimeout(function()
    {
        console.log('serv: '+ index +' to '+serv.range[1]);
        serv.min(4000);
    }, 8000);    
    
    setTimeout(function()
    {
        console.log('serv: '+ index +' to center');
        serv.center(4000);

    }, 12000);
}

function headCenter()
{
       customPWMStart(1200);
}

function headLeft()
{
       customPWMStart(700);
}

function headRight()
{
       customPWMStart(2000);
}

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


