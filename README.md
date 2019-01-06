# pig game

This application is a form of the popular [pig dice game](https://en.wikipedia.org/wiki/Pig_(dice_game))

### RULES

The pig dice game is similar to a "jeopardy game", where the points are at risk with each dice roll. 

On every turn, one player repeatedly rolls a dice until either a "1" is rolled or the player decides to "hold".

* If the player rolls a "1", then the current score is reset and the next player rolls.
* If the player rolls anything else then a '1' then the score keeps incrementing with each roll until the player holds the score.
* If the player chooses to "hold" then the current score is added to the total score and the next player rolls.
* If the player rolls doubles more than two times in a row the global score is reset and starts from 0.
* The first player to score the *target score* wins.

# Live Demo

[https://leonard186.github.io/pig-game/](https://leonard186.github.io/pig-game/)

## Description

The app is partially built on [The Complete JavaScript Course](https://www.udemy.com/the-complete-javascript-course/) taught by Jonas Schmedtmann
with basic HTML and CSS provided as a starter code. The app is further enhanced by providing the functionality to set the 
target score, read the rules before playing and statistics at completion

## Tech used

* HTML
* CSS
* Javascript ES5


## Acknowledgments

* This app is partially based on [The Complete JavaScript Course](https://www.udemy.com/the-complete-javascript-course/) on Udemy by Jonas Schmedtmann
