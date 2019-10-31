$('document').ready(function() {
    var wrapp = $('#wrapp');
    function start() {
        var numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
        for (let i=0; i<16; i++) {
            let number = numbers.splice(Math.floor(Math.random()*numbers.length), 1);
            wrapp.append(`<div class="container"><div class="front">${number}</div><div class="back"></div></div>`);
        };
        wrapp.append('<div class="timers"></div>');
        wrapp.append('<div class="win"></div>');
        wrapp.append('<div class="startBtn"></div>');
    }
    start();
    var containers = $('.container');    
    var clicks = 0;
    var clickedBoxes = [];  
    var maches = 0;
	var estTime = 30;
    function timeLeft() {
    	var a = setInterval(function(){
			if (maches === 8) {
				clearInterval(a);
			};
			estTime--;
    		if (estTime === 0) {
    			containers.off();
    			clearInterval(a);
                $('.timers').text('GAME OVER');
                $('.win').text('You lost');
                $('.win').fadeIn(400);
                $('.startBtn').text('Try again');
                $('.startBtn').fadeIn(700);
    		}else {
    			$('.timers').text('Time left: ' + estTime + ' sec'); 
    		}
    	},1000)
    }
    timeLeft();
    function startGame() {
        containers.click(function() {
            if ($(this).hasClass('lock') === false) {
                $(this).find('.back').css('transform','perspective(900px) rotateY(180deg)');
                $(this).find('.front').css('transform','perspective(900px) rotateY(0deg)');
                $(this).off();
                clickedBoxes.push($(this));
                clicks++;
                if (clicks === 2) {
                    containers.off();
                    if (clickedBoxes[0].html() === clickedBoxes[1].html()) {
                        clickedBoxes[0].addClass('lock');
                        clickedBoxes[1].addClass('lock');
                        maches++;
                        if (maches === 8) {
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
    function restart() {
        wrapp.html('');
        start();
        containers = $('.container');    
        clicks = 0;
        clickedBoxes = [];  
        maches = 0;
        estTime = 30;
        startGame();
        timeLeft();
    }
    $('.startBtn').on('click',restart);
})