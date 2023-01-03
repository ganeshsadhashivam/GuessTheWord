const inputs = document.querySelector(".inputs"),
  resetBtn = document.querySelector(".reset-btn"),
  hint = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  typingInput = document.querySelector(".typing-input");

let word,
  incorrects = [],
  corrects = [],
  maxGuesses;

function randomWord() {
  // getting random object from wordList

  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  //getting word of random object
  word = ranObj.word;
  maxGuesses = 8;
  incorrects = [];
  corrects = [];
  console.log(word);

  hint.innerText = ranObj.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrects;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `  <input type="text"  disabled />`;
  }
  inputs.innerHTML = html;
}

randomWord();

function initGame(e) {
  console.log("initgame");

  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrects.includes(` ${key} `) &&
    !corrects.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          corrects.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      //decrement maxguesses by 1
      maxGuesses--;
      incorrects.push(` ${key} `);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;
  }
  typingInput.value = "";
  setTimeout(() => {
    if (corrects.length === word.length) {
      // if user found all letters
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      //calling randomword func so the game reset
      randomWord();
    } else if (maxGuesses < 1) {
      // if user couldn't found all letters

      alert("Game over! You don't have remaining guesses");
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          corrects.push(key);
          // show all letters in the input

          inputs.querySelectorAll("input")[i].value = word[i];
        }
      }
    }
  });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
