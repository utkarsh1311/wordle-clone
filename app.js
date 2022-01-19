const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

window.onload = function () {
	toggleModal();
};

function toggleModal() {
	modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
	if (event.target === modal) {
		toggleModal();
	}
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

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
			gridRows[i].children[j].classList.remove(
				"correct-cell",
				"correct-letter-wrong-cell",
				"wrong-cell"
			);
		}
	}
};

let row = 0;
let col = 0;
let str = "";
let modalText = document.querySelector(".modal-text");

const resetGame = () => {
	clearBoard();
	row = 0;
	col = 0;
	str = "";
	toggleModal();
};

document.addEventListener("keydown", (e) => {
	if (e.key === "Backspace" && col >= 1) {
		col--;
		gridRows[row].children[col].textContent = "";
		str = str.substring(0, str.length - 1);
	}

	if (col === 5 && e.key === "Enter") {
		if (str === secretWord) {
			modalText.innerHTML =
				"<h1> Congratulations 🎉🎉🎉 <br>You guesses the correct word. <h1>";
			allCorrect(row);
			toggleModal();
			// setTimeout(toggleModal, 3000);
			setTimeout(resetGame, 3000);
		} else {
			let wrongArr = str.split("");
			wrongWordColor(wrongArr, row);
			col = 0;
			row++;
			str = "";
		}
	}
	if (e.keyCode >= 65 && e.keyCode <= 90 && col < 5) {
		gridRows[row].children[col].textContent = e.key.toUpperCase();
		col++;
		str += e.key.toLowerCase();
	}
});

const allCorrect = (row) => {
	for (let i = 0; i < 5; i++) {
		gridRows[row].children[i].classList.add("correct-cell");
	}
};

const wrongWordColor = (arr, row) => {
	let cells = gridRows[row].children;
	for (let i = 0; i < 5; i++) {
		if (wordArr[i] === arr[i]) {
			cells[i].classList.add("correct-cell");
		}
	}

	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			if (wordArr[i] === arr[j]) {
				if (!cells[j].classList.contains("correct-cell")) {
					cells[j].classList.add("correct-letter-wrong-cell");
				}
			}
		}
	}

	for (let i = 0; i < 5; i++) {
		if (
			!(
				cells[i].classList.contains("correct-cell") ||
				cells[i].classList.contains("correct-letter-wrong-cell")
			)
		) {
			cells[i].classList.add("wrong-cell");
		}
	}
};
