let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbutton");
let newGame = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let moves = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  moves = 0;
  enabledBoxes();
  msgContainer.classList.add("hide");
};

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
  }
  moves++;
  if (moves === 9) {
    alert("It's a draw!");
    resetGame();
  }
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO && box.innerText === "") {
      box.innerText = "O";
      box.classList.add('o'); // Apply the 'o' class for O before disabling
      box.disabled = true; // Disable the box after adding the class
      turnO = false;
      checkWinner();

      // Computer's turn
      const available = Array.from(boxes).filter((box) => box.innerText === "");
      if (available.length > 0) {
        const randomBox = available[Math.floor(Math.random() * available.length)];
        randomBox.innerText = "X";
        randomBox.classList.add('x'); // Apply the 'x' class for X before disabling
        randomBox.disabled = true; // Disable the box after adding the class
        turnO = true;
        checkWinner();
      }
    }
  });
});

newGame.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
