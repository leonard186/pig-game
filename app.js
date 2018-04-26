window.onload = function() {
  document.querySelector('.modal2').style.display = 'block';
};

//define global variables
var globalScore, currentScore,player, cache, otherPlayer, targetScore;

otherPlayer = function() {
return player === 0 ? otherPlayer = 1 : otherPlayer = 0;
};

//initialize the game
cache = 0;
init();
otherPlayer();
cache = 0;
console.log('current player is ' + player + '|| other player is ' + otherPlayer)
//get html elements
var glScore0, glscore1, cScore0, cScore1;

glScore0 = document.getElementById('score-0');
glScore1 = document.getElementById('score-1');
cScore0 = document.getElementById('current-0');
cScore1 = document.getElementById('current-1');

//declare reusable functions

function init() {
  globalScore = [0, 0];
  currentScore = 0;
  player = 0;
};

function togglePlayer() {
  player === 0 ? player = 1 : player = 0;
  resetCurrentScore();
  cache = 0;
  console.log('player swapped, cache reset to ' + cache)
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
};

function imgOpacity(value) {
  document.querySelector('.dice').style.opacity = value;
  document.querySelector('.dice2').style.opacity = value;
}

function resetAll(){
  init();
  glScore0.textContent = '0';
  glScore1.textContent = '0';
  resetCurrentScore();
};

function resetCurrentScore(){
    currentScore = 0;
    cScore0.textContent = '0';
    cScore1.textContent = '0';
  };

function hideDice() {
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
};

//Set the default values to 0 and hide the dice
hideDice();
glScore0.textContent = globalScore[0];
cScore0.textContent = '0';
glScore1.textContent = globalScore[1];
cScore1.textContent = '0';



//create action for rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
  imgOpacity(1)
  //generate a random number between 1 and 6
  var dice = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;

  //declare local variables

  var diceSelector = document.querySelector('.dice');
  var diceSelector2 = document.querySelector('.dice2');
  diceSelector.style.display = 'block';
  diceSelector2.style.display = 'block';
  diceSelector.src = 'dice-' + dice + '.png';
  diceSelector2.src = 'dice-' + dice2 + '.png';

  //create game logic
  //if the current player rolled and got a number different to 1 then he can carry on playing
  if(dice !== 1 && dice2 !== 1) {
      //increment the amount of time a player has thrown a double
      if(dice === dice2) {
        cache++;
        console.log('current cache count is: ' + cache);
        }
      //if the player rolled a double less then two times he can carry on playing
       if(cache < 2){
        currentScore += dice + dice2;
        document.querySelector('#current-' + player).textContent = currentScore;
      }
      //if the player has rolled a double 2 times or more then reset the current player scores
      else {
        cache = 0;
        console.log('cache reset to ' + cache)
        globalScore[player] = 0;
        document.querySelector('#score-' + player).textContent = '0';
        console.log('current player score:' + globalScore[player]);
        togglePlayer();
        resetCurrentScore();
      }
  }
  //if the current player rolled and got at least one 1 then reset current score and switch to the next player.
  else {
    togglePlayer();
    imgOpacity(0.5);
    }
});



  //create the hold action to update the general score for each player
  document.querySelector('.btn-hold').addEventListener('click', function() {
    cache = 0;
    console.log('cache is ' + cache + ' after hold');
    var playerName = document.getElementById('name-' + player).textContent;
    var winner = function(){
      document.getElementById('score-' + player).textContent = globalScore[player];
      togglePlayer();
    }
    //decide who is the winner
    if(player === 0) {
      globalScore[0] += currentScore;
      globalScore[0] >= targetScore ? winnerPopup(globalScore[0], playerName) : null;
      winner();

    } else {
      globalScore[1] += currentScore;
      globalScore[1] >= targetScore ? winnerPopup(globalScore[1], playerName) : null;
      winner();
    }

    console.log('current score: ' + currentScore);
    console.log('general score: ' + globalScore);
  });



  //reset all scores and start a new game
  document.querySelector('.btn-new').addEventListener('click', resetAll);


  //create modal function
  function winnerPopup(score, winnerPlayer) {
    //declare local variables
    var scoreDiff = globalScore[player] - globalScore[otherPlayer];
    var modalSelector = document.querySelector('.modal');
    var closeBtn = document.querySelector('.close');
    var header = document.querySelector('.winner-header');
    var scoreIndex = document.querySelector('.score-index');

    var playerN = document.querySelector('.player');
    var playerN1 = document.querySelector('.player-n');
    var scoreDifference = document.querySelector('.score-difference');
    var scorePlayer1 = document.querySelector('.score-index1');
    var scorePlayer2 = document.querySelector('.score-index2');

    //set behaviour
    modalSelector.style.display = 'block';
    playerN.textContent = winnerPlayer;
    playerN1.textContent = winnerPlayer;
    scoreIndex.textContent = score;
    scorePlayer1.textContent = globalScore[0];
    scorePlayer2.textContent = globalScore[1];
    scoreDifference.textContent = scoreDiff;

    closeBtn.addEventListener('click', function() {
    modalSelector.style.display = 'none';
    location = location
    })
  }

  //set score and start the game modal2

  document.querySelector('.button').addEventListener('click', function(){
    document.querySelector('.modal2').style.display = 'none';
    targetScore = document.getElementById('setScore').value;

  })
