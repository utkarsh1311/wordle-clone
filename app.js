let grid = document.getElementById("word-grid");

for (let i = 0; i < 6; i++) {
	let row = document.createElement("div");

	for (let j = 0; j < 5; j++) {
		let cell = document.createElement("div");
		cell.classList.add("cell");
		row.appendChild(cell);
	}

	grid.appendChild(row);
}

let secretWord = "apple";

let wordArr = secretWord.split("");

let gridRows = grid.children;

const clearBoard = () => {
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			gridRows[i].children[j].textContent = "";
		}
	}
};

let i = 0;
let j = 0;
let str = "";

const resetGame = () => {
	clearBoard();
	i = 0;
	j = 0;
	str = "";
};

document.addEventListener("keydown", (e) => {
	if (j === 5 && e.key === "Enter") {
		if (str === secretWord) {
			alert("Congo");
			resetGame();
		} else {
			j = 0;
			i++;
			str = "";
			alert("Not the correct word");
		}
	}
	if (e.keyCode >= 65 && e.keyCode <= 90 && j < 5) {
		gridRows[i].children[j].textContent = e.key;
		j++;
		str += e.key;
	}
});
