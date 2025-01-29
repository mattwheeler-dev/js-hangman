// DOM variables
const rulesOpen = document.querySelector("#rules-btn");
const rulesClose = document.querySelector("#rules-close");
const rules = document.querySelector("#rules");
const hangPieces = document.querySelectorAll(".piece");
const mystery = document.querySelector("#mystery-word");
const keyboard = document.querySelector("#keyboard");
const winner = document.querySelector("#winner");
const loser = document.querySelector("#loser");

// Global variables
const apiURL = `https://random-word-api.vercel.app/api?words=1`;
const letters = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];
let guesses = [];
let solution = [];
let turns = 0;
let score = 0;
let fails = 0;

// toggle rules open / closed
const toggleRules = () => {
	rules.classList.toggle("active");
};

rulesOpen.addEventListener("click", toggleRules);
rulesClose.addEventListener("click", toggleRules);

// fetch and set solution word
const setSolution = async () => {
	try {
		const response = await fetch(apiURL);
		const data = await response.json();
		solution = data[0].split("");
		solution.forEach((letter) => {
			const mysteryLetter = document.createElement("div");
			mystery.appendChild(mysteryLetter);
			mysteryLetter.classList.add(`mystery-letter`, `${letter}`);
			mysteryLetter.textContent = "-";
		});
	} catch (error) {
		console.error(error);
	}
};
setSolution();

// game over
const gameOver = (str) => {
	const gameStats = document.createElement("h3");
	const answer = solution.join("");
	if (str == "win") {
		winner.classList.add("active");
		winner.appendChild(gameStats);
		gameStats.textContent = `You guessed ${answer} in just ${turns} turns!`;
	} else {
		loser.classList.add("active");
		loser.appendChild(gameStats);
		gameStats.textContent = `The word was ${answer}...`;
	}
	mystery.classList.add("game-over");
	keyboard.classList.add("game-over");
};

// turn handling
const handleTurn = (key) => {
	const targetKey = document.querySelectorAll(`.key.${key}`)[0];
	turns += 1;
	if (solution.includes(key)) {
		targetKey.disabled = true;
		targetKey.classList.add("found");
		const revealed = document.querySelectorAll(`.mystery-letter.${key}`);
		revealed.forEach((slot) => {
			slot.textContent = key;
			score += 1;
		});
		if (score == solution.length) {
			gameOver("win");
		}
	} else {
		targetKey.disabled = true;
		targetKey.classList.add("failed");
		fails += 1;
		if (fails == 7) {
			gameOver("lose");
		}
	}
};

// Add on screen keyboard
letters.forEach((letter) => {
	const key = document.createElement("button");
	keyboard.appendChild(key);
	key.addEventListener("click", (e) => {
		guesses.push(e.target.textContent);
		handleTurn(e.target.textContent);
	});
	key.classList.add(`key`, `${letter}`);
	key.textContent = letter;
});

// Keyboard input handling
document.addEventListener("keydown", (key) => {
	if (guesses.includes(key.key)) {
		return;
	}
	guesses.push(key.key);
	handleTurn(key.key);
});
