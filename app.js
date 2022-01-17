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
