// DOM variables
const rulesOpen = document.querySelector("#rules-btn");
const rulesClose = document.querySelector("#rules-close");
const rules = document.querySelector("#rules");
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
			mysteryLetter.classList.add(`letter`);
			mysteryLetter.textContent = "";
		});
	} catch (error) {
		console.error(error);
	}
};

setSolution();

// Add keys for keyboard
letters.forEach((letter) => {
	const key = document.createElement("div");
	keyboard.appendChild(key);
	key.classList.add("key");
	key.textContent = letter;
});
