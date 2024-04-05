const correctWord = "APPLE".toUpperCase();
const maxGuesses = 6;
let guesses = 0;

document.getElementById('guessButton').addEventListener('click', () => {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value.toUpperCase();

    if (guess.length !== 5) {
        alert("Please enter a 5 letter word.");
        return;
    }

    processGuess(guess);
    guessInput.value = '';

    if (guesses >= maxGuesses || guess === correctWord) {
        endGame(guess === correctWord);
    }
});

function processGuess(guess) {
    guesses++;
    const guessContainer = document.createElement('div');
    guessContainer.classList.add('guess');

    for (let i = 0; i < guess.length; i++) {
        const letterEl = document.createElement('div');
        letterEl.classList.add('letter');
        letterEl.textContent = guess[i];

        if (correctWord[i] === guess[i]) {
            letterEl.classList.add('correct');
        } else if (correctWord.includes(guess[i])) {
            letterEl.classList.add('present');
        } else {
            letterEl.classList.add('absent');
        }

        guessContainer.appendChild(letterEl);
    }

    document.getElementById('guessesContainer').appendChild(guessContainer);
}

function endGame(won) {
    const message = won ? "Congratulations! You've guessed the word!" : "Unfortunately, you didn't guess the word. It was " + correctWord;
    setTimeout(() => alert(message), 100);
}
