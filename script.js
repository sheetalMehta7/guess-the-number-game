'use strict';

const body = document.querySelector("body");
const againBtn = document.querySelector(".again");
const numberDisplay = document.querySelector(".number");
const guessInputField = document.querySelector(".guess");
const checkBtn = document.querySelector(".check");
const message = document.querySelector(".message");
const currentScore = document.querySelector(".score");
const highScoreVal = document.querySelector(".highscore");

let score = 20;
let highScore = 0;
let randomNumber;

function generateRandomNum() {
    // Reset game state when a new random number is generated.
    randomNumber = Math.floor(Math.random() * 20) + 1;
    score = 20;
    guessInputField.value = "";
    numberDisplay.innerText = "?";
    body.style.backgroundColor = "#222";
    message.innerText = "Start guessing...";
    currentScore.innerText = score;
}

function handleGuess() {
    const guessedValue = Number(guessInputField.value);
    let messageText = "";

    if (!guessedValue) {
        messageText = "Please enter a number";
        message.innerText = messageText;
        return;
    }

    if (score === 0) {
        messageText = "You lost the game. Try again!";
        message.innerText = messageText;
        return;
    }

    if (guessedValue === randomNumber) {
        // Handle correct guess.
        if (score > highScore) highScore = score;
        else highScore += randomNumber;
        messageText = "Hooray🥳 You got it!";
        numberDisplay.innerText = randomNumber;
        body.style.backgroundColor = "#60b347";
    } else {
        // Handle incorrect guess.
        messageText = guessedValue > randomNumber ? "It's Too High!" : "It's Too Low!";
        score = Math.max(0, score - 1); // Ensure score doesn't go below zero.
        numberDisplay.innerText = "?";
        body.style.backgroundColor = "#F08080";
        message.innerText = `Oops🥲 ${messageText}`;
    }

    // Update UI.
    currentScore.innerText = score;
    highScoreVal.innerText = highScore;
    message.innerText = messageText;
}

window.onload = function () {
    generateRandomNum();
};

againBtn.addEventListener("click", generateRandomNum);
checkBtn.addEventListener("click", handleGuess);
