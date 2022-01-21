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

fetch("./words.json")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		const arr = data.words;
		const secretWord = arr[Math.floor(Math.random() * arr.length)];
		const grid = document.getElementById("word-grid");
		const wordArr = secretWord.split("");
		const gridRows = grid.children;
		const keys = document
			.querySelector("#keyboard")
			.getElementsByTagName("input");

		let row = 0;
		let col = 0;
		let str = "";
		let modalText = document.querySelector(".modal-text");
		let modalContent = document.querySelector(".modal-content");

		for (let i = 0; i < 6; i++) {
			let row = document.createElement("div");

			for (let j = 0; j < 5; j++) {
				let cell = document.createElement("div");
				cell.classList.add("cell");
				row.appendChild(cell);
			}

			grid.appendChild(row);
		}
		
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

		const resetGame = () => {
			clearBoard();
			row = 0;
			col = 0;
			str = "";
			toggleModal();
		};

		const gameLogic = (e, val) => {
			if (e[val] === "Backspace" || e[val] === "<-" && col >= 1) {
				col--;
				gridRows[row].children[col].textContent = "";
				str = str.substring(0, str.length - 1);
			}

			if ((col === 5 && e[val] === "Enter") || e[val] === "enter") {
				if (str === secretWord) {
					modalText.innerHTML =
						"<h1> Congratulations 🎉🎉🎉 <br>You guesses the correct word. <h1>";
					allCorrect(row);
					toggleModal();
					setTimeout(resetGame, 3000);
				} else {
					let wrongArr = str.split("");
					wrongWordColor(wrongArr, row);
					col = 0;
					row++;
					str = "";
				}
			}
			if (isCharacterALetter(e[val]) && e[val].length === 1 && col < 5) {
				gridRows[row].children[col].textContent = e[val].toUpperCase();
				col++;
				str += e[val].toLowerCase();
			}

			if (row === 6) {
				modalContent.innerHTML =
					'<img class="game-over" src="/img/game-over-removebg-preview.png">';
				toggleModal();
				setTimeout(resetGame, 3000);
			}
		};

		for (let key of keys) {
			key.addEventListener("click", () => {
				gameLogic(key, "value");
				key.blur();
			});
		}

		document.addEventListener("keydown", (e) => {
			gameLogic(e, "key");
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

		const isCharacterALetter = (char) => {
			return /[a-zA-Z]/.test(char);
		};
	})
	.catch((err) => {
		console.log("Error in fetching word");
	});
