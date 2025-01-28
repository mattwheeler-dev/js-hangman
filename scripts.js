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
let solution = [];
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
		console.log(solution);
		solution.forEach((letter) => {
			const mysteryLetter = document.createElement("div");
			mystery.appendChild(mysteryLetter);
			mysteryLetter.classList.add("letter", `${letter}`);
			mysteryLetter.textContent = "-";
		});
	} catch (error) {
		console.error(error);
	}
};
setSolution();

// game over
const gameOver = (str) => {
	if (str == "win") {
		winner.classList.add("active");
	} else {
		loser.classList.add("active");
	}
};

// turn handling
const handleTurn = (e) => {
	const targetLetter = e.target.textContent;
	if (solution.includes(targetLetter)) {
		e.target.disabled = true;
		const revealed = document.querySelectorAll(`.${targetLetter}`);
		revealed.forEach((slot) => {
			slot.textContent = targetLetter;
			score += 1;
		});
		if (score == solution.length) {
			gameOver("win");
		}
	} else {
		fails += 1;
		e.target.classList.add("failed");
		if (fails == 7) {
			gameOver("lose");
		}
	}
	console.log(`Score: ${score} | Fails: ${fails}`);
};

// Add on screen keyboard
letters.forEach((letter) => {
	const key = document.createElement("button");
	keyboard.appendChild(key);
	key.addEventListener("click", handleTurn);
	key.classList.add("key");
	key.textContent = letter;
});
