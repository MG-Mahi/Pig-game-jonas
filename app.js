const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.getElementById("player--0");
const player1El = document.getElementById("player--1");

const diceEl = document.getElementById("dice");
const rollDiceEl = document.querySelector(".btn--roll");
const holdBtnEl = document.querySelector(".btn--hold");
const resetBtnEl = document.querySelector(".btn--new");

// Adding Conditions
score0El.innerHTML = 0;
score1El.innerHTML = 0;
diceEl.classList.add("hidden");

//  Global counters
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    diceEl.classList.add("hidden");

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove("player--winner");
    player0El.classList.remove("player--active");
    player1El.classList.remove("player--winner");
    player1El.classList.remove("player--active");
}

// Switch Player
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
}

// Function to add score and checking rolled 1
function addScore(dice) {
    if (playing) {
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // if 1 is rolled
            switchPlayer();
        }
    }
}

const addTotalScore = () => {
    if (playing) {
        // Add current score to scores
        scores[activePlayer] += currentScore;
        // Change the total score
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // Check score equals to 100
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        } else {
            // Switch Player
            switchPlayer();
        }
    }
}

const rollDice = () => {
    if (playing) {
        let randomNumber = Math.round(Math.random() * 5) + 1;
        console.log(randomNumber);
        diceEl.classList.remove("hidden");
        diceEl.setAttribute("src", `dice-${randomNumber}.png`);
        addScore(randomNumber);
    }
}

// 1) Roll the dice 
rollDiceEl.addEventListener("click", rollDice);
// Switching player
holdBtnEl.addEventListener("click", addTotalScore);
// Resetting Game
resetBtnEl.addEventListener("click", init);