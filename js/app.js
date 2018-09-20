//Set dificulty level
var gameLevel = 1;

// Enemies our player must avoid
var Enemy = function(posX, posY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = posX;
    this.y = posY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. increase speed based on gameLevel

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(locX, locY) {

  // set player image
  this.sprite = 'images/char-boy.png';
  this.y = locY;
  this.x = locX;
};

// Update Player's position
Player.prototype.update = function(dt) {
  var title = document.getElementsByClassName('title');
  if(this.y < - 10) {
    gameLevel++;
    this.restart();
    title[0].innerHTML = `<h3 class="animated fadeOut">Level Up! Current Level : ${gameLevel}</h3>`;
  }
};

//add movement
Player.prototype.handleInput = function(keyPressed){
  if (keyPressed === "up" && this.y > -200) {
      this.y = this.y - 90;
  } else if (keyPressed === "down" && this.y < 400) {
      this.y = this.y + 90;
  } else if (keyPressed === "left" && this.x > 0) {
      this.x = this.x - 100;
  } else if(keyPressed === "right" && this.x < 400) {
      this.x = this.x + 100;
  }
};

Player.prototype.restart = function() {
  this.x = 200;
  this.y = 400;
};


//Render the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
enemy0 = new Enemy(60,-100);
enemy1 = new Enemy(80,-150);
enemy2 = new Enemy(100,-200);
enemy3 = new Enemy(120,-250);
enemy4 = new Enemy(140,-300);
enemy5 = new Enemy(160,-350);
enemy6 = new Enemy(180,-400);

const allEnemies = [enemy0, enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

//instatiate Player
var player = new Player(200, 400);

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
