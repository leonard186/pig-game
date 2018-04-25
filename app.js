//define global variables
var globalScore, currentScore,player;

globalScore = [0, 0];
currentScore = 0;
player = 0;

//get html elements
var glScore0, glscore1, cScore0, cScore1;

glScore0 = document.getElementById('score-0');
glScore1 = document.getElementById('score-1');
cScore0 = document.getElementById('current-0');
cScore1 = document.getElementById('current-1');

//declare reusable functions

function togglePlayer() {
  player === 0 ? player = 1 : player = 0;
  resetCurrentScore();
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function resetAll(){
  globalScore = [0, 0];
  currentScore = 0;
  player = 0;
  glScore0.textContent = '0';
  glScore1.textContent = '0';
  resetCurrentScore();
}

  function resetCurrentScore(){
    currentScore = 0;
    cScore0.textContent = '0';
    cScore1.textContent = '0';
  }

function hideDice() {
  document.querySelector('.dice').style.display = 'none';
}

//Set the default values to 0 and hide the dice
hideDice();
glScore0.textContent = globalScore[0];
cScore0.textContent = '0';
glScore1.textContent = globalScore[1];
cScore1.textContent = '0';

//create action for rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
  //generate a random number between 1 and 6
  var dice = Math.floor(Math.random() * 6) + 1;

  //declare local variables
  var diceSelector = document.querySelector('.dice');
  diceSelector.style.display = 'block';
  diceSelector.src = 'dice-' + dice + '.png';

  //create the game logic
  if(dice !== 1) {
    currentScore += dice;
    document.querySelector('#current-' + player).textContent = currentScore;
  } else {
    togglePlayer();
    diceSelector.src = 'roll.png';
  }
});

  //create the hold action to update the general score for each player
  document.querySelector('.btn-hold').addEventListener('click', function() {
    var playerName = document.getElementById('name-' + player).textContent;
    var winner = function(){
      document.getElementById('score-' + player).textContent = globalScore[player];
      togglePlayer();
    }
    //decide who is the winner
    if(player === 0) {
      globalScore[0] += currentScore;
      globalScore[0] > 99 ? winnerPopup(globalScore[0], playerName) : null;
      winner();

    } else {
      globalScore[1] += currentScore;
      globalScore[1] > 99 ? winnerPopup(globalScore[1], playerName) : null;
      winner();
    }

    console.log(currentScore);
    console.log(globalScore);
  });

  //reset all scores and start a new game
  document.querySelector('.btn-new').addEventListener('click', resetAll);

  //create modal function
  function winnerPopup(score, player) {
    //declare local variables
    var modalSelector = document.querySelector('.modal');
    var closeBtn = document.querySelector('.close');
    var header = document.querySelector('.winner-header');
    var body = document.querySelector('.winner-body');
    var footer = document.querySelector('.winner-footer');
    var playerN = document.getElementById('player');

    //set behaviour
    modalSelector.style.display = 'block';
    playerN.textContent = player;
    body.innerHTML = '<p>You beat your opponent with a score of<em>' + score + '</em></p>';
    footer.innerHTML = '<h3>Try a new game and see who wins next!</h3>';
    closeBtn.addEventListener('click', function() {
    modalSelector.style.display = 'none';
    resetAll();
    })
  }
