// On clicking any of the images the avatar will be changed.
$(document).ready(function(){
    $('img').on('click',function (e) {
        player.sprite = $(this).attr('src');
        $('.score').text(0);
    })
})
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 500){
        this.x += this.speed*dt;
    }
    else
        this.x = -10;

    this.detectCollison();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.detectCollison = function () {
    var xDistance = Math.abs(this.x - player.x);
    var yDistance = Math.abs(this.y - player.y);
    if(xDistance >= 0 && xDistance < 73 && yDistance >= 0 && yDistance <= 60){
        player.x = 202;
        player.y = 402;
        score = 0;
        $('.score').text(score);

    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;

};

Player.prototype.update = function(dt) {

};

//Reset player to beginning position
Player.prototype.reset = function() {
    setTimeout(function() {
        player.x = 202;
        player.y = 402;
        score+=1;
        $('.score').text(score);
    },200);

}

var score = 0;

Player.prototype.handleInput = function(keyCode) {
    if ( keyCode === 'left'  && this.x > 10) {
            this.x -=100;
    } else if ( keyCode === 'right' &&  this.x < 350 ) {
            this.x +=100;
    } else if ( keyCode === 'up'  && this.y > 10) {
            this.y  -= 80;
    } else if ( keyCode === 'down' && this.y < 350) {
            this.y += 80;
    }
    if(this.y < 25){
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202,402)

allEnemies = [new Enemy(100,230,250),new Enemy(250,150,100),new Enemy(300,70,350)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
