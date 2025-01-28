// DOM variables
const keyboard = document.querySelector("#keyboard");

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

// Add keys for keyboard
letters.forEach((letter) => {
	const key = document.createElement("div");
	keyboard.appendChild(key);
	key.textContent = letter;
});
