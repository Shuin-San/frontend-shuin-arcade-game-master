//Game settings
var lifes = 5;
var score = 0;
var status = "ok";
var title = document.getElementsByClassName('title');

//Set dificulty level
var gameLevel = 1;

// Enemies our player must avoid
var Enemy = function([posXMin,posXMax], [posYMin, posYMax], [speedMin, speedMax]) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //spawn position randomizer - futureproof if input is given by player at a later version
    minX = Math.ceil(posXMin);
    maxX = Math.floor(posXMax);
    minY = Math.ceil(posYMin);
    maxY = Math.floor(posYMax);
    this.x = Math.floor(Math.random() * (maxX - minX)) + minX;
    this.y = Math.floor(Math.random() * (maxY - minY)) + minY;

    //speed randomizer
    minSpeed = Math.ceil(speedMin);
    maxSpeed = Math.floor(speedMax);
    this.speed = Math.floor(Math.random() * (maxSpeed - minSpeed ) + minSpeed);

    //starting positions of enemies
    this.startX = this.x;
    this.startY = this.y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. increase speed based on gameLevel
    for (var enemy in allEnemies){
      this.upOrDownShift = 0;

      //reset enemy position when enemy out of bounds
      if (this.x > 490){
        this.x = -90;

        //variate enemy speed at each position reset
        shifter = Math.random() * (0, 2);
        if (shifter < 1){
          this.speed = this.speed - 1;
          console.log(this.speed);
        } else {
          this.speed = this.speed + 0.5;
        }
      } else {
        this.x = this.x + (this.speed * dt + 0.5) ;
        if (this.x === player.x) {
          console.log("ouch");
        }
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collision = function () {

    //check enemy collisions with player
    if ((this.x > player.x - 50) && (this.y > player.y -50 ) &&
        (this.x - 50< player.x) && (this.y - 50 < player.y)) {

        //life is lost
        player.loseALife();
    }

};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(locX, locY) {

  // set player spawn
  this.sprite = 'images/char-boy.png';
  this.y = locY;
  this.x = locX;
  this.startX = locX;
  this.startY = locY;
  this.score = 0;
};

// Update Player's position
Player.prototype.update = function(dt) {
  if(this.y < - 10) {
    //if player reaches the goal , level up + score +100
    gameLevel++;
    player.score = player.score + 100;
    this.restart(1);
    // new enemy spawn until enemies count reaches 7
    if (allEnemies.length <= 8){
      allEnemies.push(new Enemy([0, -500],[50, 300], [1, 7]));
    }
    // win prerequisites
    if (gameLevel === 8){
      win();
    }
  }
};

//add movement
Player.prototype.handleInput = function(keyPressed){
  if (keyPressed === "up" && this.y > -200) {
      this.y = this.y - 90;
      this.score = this.score + 10;
  } else if (keyPressed === "down" && this.y < 400) {
      this.y = this.y + 90;
  } else if (keyPressed === "left" && this.x > 0) {
      this.x = this.x - 100;
  } else if(keyPressed === "right" && this.x < 400) {
      this.x = this.x + 100;
  }
};

Player.prototype.restart = function(cond) {
  if (cond === 1){
    this.x = 200;
    this.y = 400;
    title[0].innerHTML = `<h3 class="animated fadeIn">Level : <span class="animated bounce">${gameLevel} </span><br>Lives : ${lifes} <br> Score: ${player.score} <br> <a href="#" onClick=pause()>Pause game</a></h3>`;
  } else if (cond === 0) {
    lifes--;
    this.x = 200;
    this.y = 400;
    if (lifes === 0){
      title[0].innerHTML = `<h3 class="animated bounce">You Lost. You reached level ${gameLevel} and your score was ${player.score} <a href="#" onClick=reset()>Restart !</a></h3>`;
      status = "lost"
    } else {
      title[0].innerHTML = `<h3 class="animated fadeIn">Level : <span class="animated bounce">${gameLevel} </span><br>Lives : ${lifes} <br> Score: ${player.score} <br> <a href="#" onClick=reset()>Restart !</a></h3>`;
    }
  }
};

Player.prototype.loseALife = function(){
  //how to lose a life
  player.restart(0);
  console.log('ouch');
}

//Render the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//instatiate Enemies with randomized stats
enemy0 = new Enemy([0, -500],[50, 300], [1, 4]);

var allEnemies = [enemy0];

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

//reset everything !
function reset(){
  status = "ok"
  lifes = 5;
  gameLevel = 1;
  for (var i = 0; i <= allEnemies.length; i++){
    allEnemies.pop();
  }
  player.x = player.startX;
  player.y = player.startY;
  player.score = 0;
  title[0].innerHTML = `<h3 class="animated fadeIn">Level : ${gameLevel}<br>Lives : ${lifes} <br> Score: ${player.score} <br> <a href="#" onClick=pause()>Pause game.</a></h3>`;

}

//win logic
function win(){
  status = "Win !"
  player.x = player.startX;
  player.y = player.startY;
  player.score = 0;
  title[0].innerHTML = `<h3 class="animated bounce infinite">YOU WON !!! </h3> <br> <br> <h3 class="animated fadeIn"><a href="#" onClick=reset()>New Game.</a></h3>`;

}
//pause logic
function pause(){
  if (status === "paused") {
    status = "ok";
  } else {
    status = "paused";
  }
}
