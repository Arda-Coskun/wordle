const WORDS = ["apple", "bread", "crane", "drain", "flock"];
const answer = WORDS[Math.floor(Math.random() * WORDS.length)];
const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const rows = 6;
const columns = 5;
let currentRow = 0;
let currentCol = 0;
let currentGuess = "";

function initBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.id = `tile-${r}-${c}`;
      board.appendChild(tile);
    }
  }
}

function createKeyboard() {
  const keys = "qwertyuiopasdfghjklzxcvbnm".split("");
  keys.forEach(key => {
    const keyElement = document.createElement("button");
    keyElement.textContent = key;
    keyElement.classList.add("key");
    keyElement.onclick = () => handleKeyPress(key);
    keyboard.appendChild(keyElement);
  });

  const enterKey = document.createElement("button");
  enterKey.textContent = "Enter";
  enterKey.classList.add("key");
  enterKey.onclick = checkGuess;
  keyboard.appendChild(enterKey);

  const deleteKey = document.createElement("button");
  deleteKey.textContent = "Del";
  deleteKey.classList.add("key");
  deleteKey.onclick = deleteLetter;
  keyboard.appendChild(deleteKey);
}

function handleKeyPress(letter) {
  if (currentCol < columns && currentRow < rows) {
    const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
    tile.textContent = letter;
    currentGuess += letter;
    currentCol++;
  }
}

function deleteLetter() {
  if (currentCol > 0) {
    currentCol--;
    const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
    tile.textContent = "";
    currentGuess = currentGuess.slice(0, -1);
  }
}

function checkGuess() {
  if (currentGuess.length !== columns) {
    alert("Word must be 5 letters long!");
    return;
  }

  for (let i = 0; i < columns; i++) {
    const tile = document.getElementById(`tile-${currentRow}-${i}`);
    const letter = currentGuess[i];
    if (letter === answer[i]) {
      tile.classList.add("correct");
    } else if (answer.includes(letter)) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }
  }

  if (currentGuess === answer) {
    alert("You win!");
    return;
  }

  if (currentRow === rows - 1) {
    alert(`Game over! The word was ${answer}.`);
    return;
  }

  currentRow++;
  currentCol = 0;
  currentGuess = "";
}

initBoard();
createKeyboard();
