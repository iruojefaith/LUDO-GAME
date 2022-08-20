'use strict';

//SELECTING ELEMENT BY THEIR ID IN HTML FILE
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl   = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const win = document.querySelector('.win');


let scores, currentScore, activePlayer, playing;


// Starting conditions
const init = function () {
     scores = [0, 0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;


    //reset the user score to zero at the start of the game
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    win.classList.add('hidden');
};
init();


 //switch to next player
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    //togglemethod had class if it not there and if it is there it remove the class
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
    if(playing) {

//generating random number dice row
const dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

//dispaly dice result
diceEl.classList.remove('hidden');
diceEl.src = `dice-${dice}.png`;

//check if dice roll result is one switch to next playe
if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`
    ).textContent = currentScore;
} else {
   //switch to next player
   switchPlayer();

}
}
});

//onclick hold button
btnHold.addEventListener('click', function () {
    if(playing) {

         //Add current score to active player's score
    scores[activePlayer] += currentScore;
    //scores[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if player's score is >=100
    if (scores[activePlayer] >= 50){

         //Finish the game
         playing = false;
        diceEl.classList.add('hidden');
        win.classList.remove('hidden');
       win.textContent = document.getElementById(`name--${activePlayer}`).textContent + " " + "WIN!!!";


         document
         .querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
             // Switch to the next Player
    switchPlayer();
        }
    }
});

//Reset game by clicking new game
btnNew.addEventListener('click', init);