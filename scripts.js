// DOM variables
const rulesOpen = document.querySelector("#rules-btn");
const rulesClose = document.querySelector("#rules-close");
const rules = document.querySelector("#rules");
const hangPieces = document.querySelectorAll(".piece");
const mystery = document.querySelector("#mystery-word");
const keyboard = document.querySelector("#keyboard");

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

const checkLetter = (e) => {
	const targetLetter = e.target.textContent;
	for (let i = 0; i < solution.length; i++) {
		if (solution[i] == targetLetter) {
			document.querySelector(`.${targetLetter}`).textContent = targetLetter;
			score += 1;
			return;
		}
	}
	fails += 1;
};

// Add keys for keyboard
letters.forEach((letter) => {
	const key = document.createElement("div");
	keyboard.appendChild(key);
	key.addEventListener("click", checkLetter);
	key.classList.add("key");
	key.textContent = letter;
});
