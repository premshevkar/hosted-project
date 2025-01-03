let boxes = document.querySelectorAll(".box");
let resetbt = document.querySelector("#resetbt");
let newgamebt = document.querySelector("#newgame");
let msg = document.querySelector(".msg");
let msgcontainer = document.querySelector(".msgcontainer");
let count = 0; //to track draw

let turnO = true; //playerX, playerO

const winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [6, 7, 8],
  [3, 4, 5],
];

const resetGame = () => {
  let turnO = true;
  count = 0;
  enablebtn();
  msgcontainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    count++;

    let iswinner = checkwiner();

    if (count === 9 && !iswinner) {
      gamedraw();
    }
  });
});

const gamedraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgcontainer.classList.remove(".hide");
  disablebtn();
};

const disablebtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enablebtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinnwer = (winner) => {
  msg.innerText = `congratulation ,Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disablebtn();
};

const checkwiner = () => {
  for (let pattern of winpattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinnwer(pos1val);
        return true;
      }
    }
  }
};

newgamebt.addEventListener("click", resetGame);
resetbt.addEventListener("click", resetGame);

function goBackHome() {
  window.location.href = "newgame.html";
}
