// DOM variables
const rulesBtn = document.querySelector("#rules-btn");
const rules = document.querySelector("#rules");
const keyboard = document.querySelector("#keyboard");

// global variables
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

const toggleRules = () => {
	rules.classList.toggle("active");
};

rulesBtn.addEventListener("click", toggleRules);

// Add keys for keyboard
letters.forEach((letter) => {
	const key = document.createElement("div");
	keyboard.appendChild(key);
	key.classList.add("key");
	key.textContent = letter;
});
