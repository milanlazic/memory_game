$('document').ready(function() {
    var wrapp = $('#wrapp');
    // start game
    function start() {
        var numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
        // make elements
        for (let i=0; i<16; i++) {
            let number = numbers.splice(Math.floor(Math.random()*numbers.length), 1);
            wrapp.append(`<div class="container"><div class="front">${number}</div><div class="back"></div></div>`);
        }
        // timer
        wrapp.append('<div class="timers"></div>');
        // message on the end
        wrapp.append('<div class="win"></div>');
        // button for restart
        wrapp.append('<div class="startBtn"></div>');
        $('.startBtn').on('click',restart);
    }
    start();
    var containers = $('.container');
    var clicks = 0;
    var clickedBoxes = [];  
    var matches = 0;
    var gameTime = 30;
    // time
    function timeLeft() {
        var sec = setInterval(function(){
            // stop timer on win
            if (matches === 8) {
                clearInterval(sec);
            }
            gameTime--;
            // if time is elapsed
            if (gameTime === 0) {
                containers.off();
    			clearInterval(a);
                $('.timers').text('GAME OVER');
                $('.win').text('You lost');
                $('.win').fadeIn(400);
                $('.startBtn').text('Try again');
                $('.startBtn').fadeIn(700);
    		}else {
    			$('.timers').text('Time left: ' + gameTime + ' sec');
    		}
    	},1000);
    }
    timeLeft();
    // add clicks on elements
    function startGame() {
        containers.click(function() {
            // remove clicks on matched elements
            if ($(this).hasClass('lock') === false) {
                $(this).find('.back').css('transform','perspective(900px) rotateY(180deg)');
                $(this).find('.front').css('transform','perspective(900px) rotateY(0deg)');
                $(this).off(); // prevent two clicks on the same element
                clickedBoxes.push($(this));
                clicks++;
                // prevent more than two clicks
                if (clicks === 2) {
                    containers.off();
                    // checking numbers
                    if (clickedBoxes[0].html() === clickedBoxes[1].html()) {
                        clickedBoxes[0].addClass('lock');
                        clickedBoxes[1].addClass('lock');
                        matches++;
                        // if win
                        if (matches === 8) {
                            setTimeout(function(){
                                $('.win').text('You win');
                                $('.win').fadeIn(400);
                                $('.startBtn').text('Start');
                                $('.startBtn').fadeIn(700);
                            },800);
                        };
                        clicks = 0;
                        clickedBoxes.length = 0;
                        startGame();
                    } else {
                        setTimeout(function(){
                            clickedBoxes[0].find('.back').css('transform','perspective(900px) rotateY(0deg)');
                            clickedBoxes[0].find('.front').css('transform','perspective(900px) rotateY(180deg)');
                            clickedBoxes[1].find('.back').css('transform','perspective(900px) rotateY(0deg)');
                            clickedBoxes[1].find('.front').css('transform','perspective(900px) rotateY(180deg)');
                            clicks = 0;
                            clickedBoxes.length = 0;
                            startGame();
                        },800);
                    }
                }
            }
        });
    }
    startGame();
    // start game again
    function restart() {
        wrapp.html('');
        start();
        containers = $('.container');    
        clicks = 0;
        clickedBoxes = [];  
        matches = 0;
        gameTime = 30;
        startGame();
        timeLeft();
    }
    
})