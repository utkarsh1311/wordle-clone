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
			gridRows[i].children[j].classList.remove("correct-cell");
		}
	}
};

let i = 0;
let j = 0;
let str = "";
let modalText = document.getElementById("modal-h1");

const resetGame = () => {
	clearBoard();
	i = 0;
	j = 0;
	str = "";
	toggleModal();
};

document.addEventListener("keydown", (e) => {
	if (j === 5 && e.key === "Enter") {
		if (str === secretWord) {
			modalText.innerText = "Congratulations!! You guessed the correct word.";
			allCorrect(i);
			toggleModal();
			setTimeout(resetGame, 2000);
			// resetGame();
		} else {
			j = 0;
			i++;
			str = "";
			modalText.innerText = "Not the correct word!!";
			setTimeout(toggleModal, 1000);
		}
	}
	if (e.keyCode >= 65 && e.keyCode <= 90 && j < 5) {
		gridRows[i].children[j].textContent = e.key;
		j++;
		str += e.key;
	}
});




const allCorrect = row => {
	for (let i = 0; i < 5; i++) {
		gridRows[row].children[i].classList.add("correct-cell");
	}
}

