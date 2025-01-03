let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");


const userscorepara = document.querySelector("#userscore");
const compscorepara = document.querySelector("#compscore");



const generateComputerChoice = () => {
    const option = ["rock", "paper", "scissor"];
    const randIDX = Math.floor(Math.random() * 3);
    return option[randIDX];
}

const showWinner = (userwin,userchoice,compchoice) => {
    if(userwin) {
        userscore++;
        userscorepara.innerText = userscore;
        console.log("You Win!");
        msg.innerText = `You Win! Your ${userchoice} beats ${compchoice}`
        msg.style.backgroundColor = "green";

    } else {
        compscore++;
        compscorepara.innerText = compscore
        console.log("You Lose.");
        msg.innerText = `You Lose. ${compchoice} beats Your ${userchoice}`
        msg.style.backgroundColor = "red";
    }
};
const drawGame = () => {
    console.log("The Game Was Draw");
    msg.innerText = "The Game Was Draw. Play again"
    msg.style.backgroundColor = "black";
};

const playgame = (userchoice) => {
    console.log("user choice = ", userchoice);
    const compchoice = generateComputerChoice(); 
    console.log("comp choice = ", compchoice);

    if(userchoice===compchoice){
        drawGame();
      } else {
        let userwin = true;
        if(userchoice==="rock"){
           userwin = compchoice==="paper" ? false : true; 
        } else if(userchoice === "paper"){
          userwin = compchoice === "scissor" ? false : true;
        }else {
            userwin = compchoice === "rock" ? false : true;
        }
        showWinner(userwin,userchoice,compchoice); 
      }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
    const userchoice = choice.getAttribute("id");
    playgame(userchoice);
    });
});