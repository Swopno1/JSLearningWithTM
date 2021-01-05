/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winingNum = getRandomNum(min, max),
    guessLeft = 3;

// UI Element
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign min & max in UI
minNum.textContent = min;
maxNum.textContent = max;

// Play Again event listner
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

// Listen from guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

// Validate input, check if won, check if incorect
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else if(guess === winingNum){
    // Game Over - WON
    gameOver(true, `${guess} is correct, YOU WIN!`);
  } else {
    // Wrong Number
    guessLeft -= 1;

    if(guessLeft === 0){
      // Game Over - LOST
      gameOver(false, `GAME OVER... You Lost! The correct number was ${winingNum}`);
    } else {
      // Game continue

      // Change border Color
      guessInput.style.borderColor = 'red';
      // Clear input
      guessInput.value = '';
      // Set winning message
      setMessage(`${guess} is not correct, ${guessLeft} guesses left!`, 'red');
    }
  }

})
// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color ='red';
  // Disable input
  guessInput.disabled = true;
  // Change border Color
  guessInput.style.borderColor = color;
  // Change text Color
  message.style.color = color;
  // Set winning message
  setMessage(msg);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again'
}
// Get Wining number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}