const N = 4;
const M = 4;

let turn = "R";
let selectedLines = [];
let filledBox = [];
var isSquare = { bool: false };
const hoverClasses = { R: "hover-red", B: "hover-blue" };
const bgClasses = { R: "bg-red", B: "bg-blue" };
let score = { R: 0, B: 0 };

const playersTurnText = (turn) => `It's ${turn === "R" ? "Red" : "Blue"}'s turn`;
const gameScoreText = (score) => `<span class="txt-red">Red: ${score.R}</span> | <span class="txt-blue">Blue: ${score.B}</span>`;
const isLineSelected = (line) => line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B);

const createGameGrid = () => {
  const gameGridContainer = document.querySelector(".game-grid-container");

  const rows = Array(N)
    .fill(0)
    .map((_, i) => i);
  const cols = Array(M)
    .fill(0)
    .map((_, i) => i);

  rows.forEach((row) => {
    cols.forEach((col) => {
      const dot = document.createElement("div");
      dot.setAttribute("class", "dot");

      const hLine = document.createElement("div");
      hLine.setAttribute("class", `line-horizontal ${hoverClasses[turn]}`);
      hLine.setAttribute("id", `h-${row}-${col}`);
      hLine.addEventListener("click", handleLineClick);

      gameGridContainer.appendChild(dot);
      if (col < M - 1) gameGridContainer.appendChild(hLine);
    });

    if (row < N - 1) {
      cols.forEach((col) => {
        const vLine = document.createElement("div");
        vLine.setAttribute("class", `line-vertical ${hoverClasses[turn]}`);
        vLine.setAttribute("id", `v-${row}-${col}`);
        vLine.addEventListener("click", handleLineClick);

        const box = document.createElement("div");
        box.setAttribute("class", "box");
        box.setAttribute("id", `box-${row}-${col}`);

        gameGridContainer.appendChild(vLine);
        if (col < M - 1) gameGridContainer.appendChild(box);
      });
    }
  });
  document.getElementById("game-score-status").innerHTML = gameScoreText(score);
  document.getElementById("game-status").innerHTML = playersTurnText(turn);
};

const changeTurn = () => {
  const nextTurn = turn === "R" ? "B" : "R";
  document.getElementById("game-status").innerHTML = playersTurnText(nextTurn);
  const lines = document.querySelectorAll(".line-vertical, .line-horizontal");
  lines.forEach((l) => {
    // if (!isLineSelected(l)) {
    l.classList.replace(hoverClasses[turn], hoverClasses[nextTurn]);
    // }
  });
  turn = nextTurn;
};

const boxFill = (boxId, turn) => {
  document.getElementById(boxId).setAttribute("class", bgClasses[turn]);
  if (!filledBox.includes(boxId)) {
    score[turn]++;
    isSquare.bool = true;
    filledBox = [...filledBox, boxId];
  }
};

const squareCheck = (selectedLines, lineId, turn) => {
  isSquare.bool = false;
  const isVertical = lineId[0] == "v";
  if (isVertical) {
    if (lineId[4] == "3") {
      if (
        selectedLines.includes(`v-${lineId[2]}-${parseInt(lineId[4]) - 1}`) &&
        selectedLines.includes(`h-${parseInt(lineId[2]) + 1}-${parseInt(lineId[4]) - 1}`) &&
        selectedLines.includes(`h-${parseInt(lineId[2])}-${parseInt(lineId[4]) - 1}`)
      ) {
        boxId = `box-${lineId[2]}-${parseInt(lineId[4]) - 1}`;
        boxFill(boxId, turn);
      }
    }
    if (lineId[4] == "0") {
      if (
        selectedLines.includes(`v-${lineId[2]}-${parseInt(lineId[4]) + 1}`) &&
        selectedLines.includes(`h-${parseInt(lineId[2]) + 1}-${parseInt(lineId[4])}`) &&
        selectedLines.includes(`h-${parseInt(lineId[2])}-${parseInt(lineId[4])}`)
      ) {
        boxId = `box-${lineId[2]}-${lineId[4]}`;
        boxFill(boxId, turn);
      }
    }
    if (
      selectedLines.includes(`v-${lineId[2]}-${parseInt(lineId[4]) - 1}`) &&
      selectedLines.includes(`h-${parseInt(lineId[2]) + 1}-${parseInt(lineId[4]) - 1}`) &&
      selectedLines.includes(`h-${parseInt(lineId[2])}-${parseInt(lineId[4]) - 1}`)
    ) {
      boxId = `box-${lineId[2]}-${parseInt(lineId[4]) - 1}`;
      boxFill(boxId, turn);
    }
    if (
      selectedLines.includes(`v-${lineId[2]}-${parseInt(lineId[4]) + 1}`) &&
      selectedLines.includes(`h-${parseInt(lineId[2]) + 1}-${parseInt(lineId[4])}`) &&
      selectedLines.includes(`h-${parseInt(lineId[2])}-${parseInt(lineId[4])}`)
    ) {
      boxId = `box-${lineId[2]}-${lineId[4]}`;
      boxFill(boxId, turn);
    }
  } else {
    if (lineId[2] == "3") {
      if (
        selectedLines.includes(`h-${parseInt(lineId[2]) - 1}-${parseInt(lineId[4])}`) &&
        selectedLines.includes(`v-${parseInt(lineId[2]) - 1}-${parseInt(lineId[4])}`) &&
        selectedLines.includes(`v-${parseInt(lineId[2]) - 1}-${parseInt(lineId[4]) + 1}`)
      ) {
        boxId = `box-${parseInt(lineId[2]) - 1}-${parseInt(lineId[4])}`;
        boxFill(boxId, turn);
      }
    }
    if (lineId[2] == "0") {
      if (
        selectedLines.includes(`h-${parseInt(lineId[2]) + 1}-${parseInt(lineId[4])}`) &&
        selectedLines.includes(`v-${parseInt(lineId[2])}-${parseInt(lineId[4])}`) &&
        selectedLines.includes(`v-${parseInt(lineId[2])}-${parseInt(lineId[4]) + 1}`)
      ) {
        boxId = `box-${lineId[2]}-${lineId[4]}`;
        boxFill(boxId, turn);
      }
    }
    if (
      selectedLines.includes(`h-${parseInt(lineId[2]) + 1}-${parseInt(lineId[4])}`) &&
      selectedLines.includes(`v-${parseInt(lineId[2])}-${parseInt(lineId[4])}`) &&
      selectedLines.includes(`v-${parseInt(lineId[2])}-${parseInt(lineId[4]) + 1}`)
    ) {
      boxId = `box-${lineId[2]}-${lineId[4]}`;
      boxFill(boxId, turn);
    }
    if (
      selectedLines.includes(`h-${parseInt(lineId[2]) - 1}-${parseInt(lineId[4])}`) &&
      selectedLines.includes(`v-${parseInt(lineId[2]) - 1}-${parseInt(lineId[4])}`) &&
      selectedLines.includes(`v-${parseInt(lineId[2]) - 1}-${parseInt(lineId[4]) + 1}`)
    ) {
      boxId = `box-${parseInt(lineId[2]) - 1}-${parseInt(lineId[4])}`;
      boxFill(boxId, turn);
    }
  }
};

const handleLineClick = (e) => {
  const lineId = e.target.id;
  const selectedLine = document.getElementById(lineId);
  if (isLineSelected(selectedLine)) {
    return;
  }

  selectedLines = [...selectedLines, lineId];
  colorLine(selectedLine);
  squareCheck(selectedLines, lineId, turn);
  if (isSquare.bool) {
  } else changeTurn();

  document.getElementById("game-score-status").innerHTML = gameScoreText(score);
  if (selectedLines.length == 24) document.getElementById("game-status").innerHTML = `won ${score["B"] > score["R"] ? "Blue" : "Red"}`;
};

const colorLine = (selectedLine) => {
  selectedLine.classList.remove(hoverClasses[turn]);
  selectedLine.classList.add(bgClasses[turn]);
};

createGameGrid();
