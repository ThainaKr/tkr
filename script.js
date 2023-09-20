// script.js
const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const gameOverContainer = document.getElementById("game-over-container");
const restartButton = document.getElementById("restart-button");
let score = 0;
let timer = 0;
let gameInterval;
const colors = ["purple", "blue", "brown", "yellow", "green", "pink", "red", "orange", "gray", "black"];
let currentColorIndex = 0;

function changeSquareColor() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.classList.remove("clicked");
        square.style.backgroundColor = colors[currentColorIndex];
    });

    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

function createSquare() {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = colors[currentColorIndex];
    
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    
    square.style.left = x + "px";
    square.style.top = y + "px";

    square.addEventListener("click", () => {
        if (square.classList.contains("clicked")) return;
        
        square.classList.add("clicked");
        score += 1;
        scoreElement.textContent = score;
        
        if (score % 10 === 0) { // Encerra o jogo após 10 pontos
            clearInterval(gameInterval);
            gameOverContainer.style.display = "block";
            restartButton.style.display = "block"; // Mostrar o botão de reiniciar
        } else {
            changeSquareColor();
        }
    });

    gameContainer.appendChild(square);

    setTimeout(() => {
        square.remove();
    }, 1000);
}

function startGame() {
    score = 0;
    timer = 0;
    currentColorIndex = 0;
    scoreElement.textContent = score;
    timerElement.textContent = timer;
    gameOverContainer.style.display = "none";
    restartButton.style.display = "none"; // Ocultar o botão de reiniciar no início do jogo
    
    gameInterval = setInterval(() => {
        timer += 1;
        timerElement.textContent = timer;
        createSquare();
    }, 1000);
}

function restartGame() {
    clearInterval(gameInterval);
    startGame();
}

startGame();