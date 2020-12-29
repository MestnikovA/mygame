var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var bg2 = new Image();
var fg = new Image();
var fg2 = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/head.png";
bg.src = "img/bg1.png";
bg2.src = "img/bg2.png";
fg.src = "img/fg.png";
fg2.src = "img/fg2.png";
pipeUp.src = "img/swrdUp.png";
pipeBottom.src = "img/swrdBottom.png";

var loadMusic = new Audio();
var deathMusic = new Audio();

loadMusic.src = "audio/onload.mp3";
deathMusic.src = "audio/death.mp3";



var gap = 120;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -= 50;

}


var pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}

var score = 0;





var xPos = 10;
var yPos = 150;
var grav = 4;


function draw() {
	loadMusic.play();
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x-=5;

		if(pipe[i].x == 652) {
			pipe.push({
			x : cvs.width,
			y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}

		if(
		xPos + bird.width >= pipe[i].x//
		&& 
		xPos <= pipe[i].x + pipeUp.width//
		&& 
		(yPos <= pipe[i].y + pipeUp.height//
		|| 
		yPos + bird.height >= pipe[i].y + pipeUp.height + gap)//пол
		)
		{
			deathMusic.play();
			alert("GAME OVER, score = " + score);
			alert.onclick(location.reload());
		}
		if(pipe[i].x == 42) {
			score++;
		}
	}
	ctx.drawImage(fg2, 0, cvs.height - fg2.height);
	ctx.drawImage(fg2, 288, cvs.height - fg2.height);
	ctx.drawImage(fg2, 576, cvs.height - fg2.height);
	ctx.drawImage(fg2, 864, cvs.height - fg2.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;
	if(yPos + bird.height >= cvs.height - fg2.height){
		grav=0;
	}
	else{
		grav=4;
	}

	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);
	requestAnimationFrame(draw);

}

pipeBottom.onload = draw;