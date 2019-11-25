const $colorDisplay = document.querySelector("#color-display");
const $preNav = document.querySelector("#pre-nav");
const $liResult = document.querySelector("#li-result");
const $newGame = document.querySelector("#new-game");
const $easyBtn = document.querySelector("#easy-mode");
const $hardBtn = document.querySelector("#hard-mode");
const $divContainer = document.querySelector("#container");
let gameMode = "hard";
let $square = document.querySelectorAll(".square");

let selectSquare = Math.floor(Math.random() * 6);

let colors = [];

function generateSquares(gameMode) {
    let squares;
    if (gameMode === "hard") {
        squares = 6;
    } else {
        squares = 3;
    };
    for (let i = 0; i < squares; i++) {
        const createDiv = document.createElement("div");
        $divContainer.appendChild(createDiv);
        createDiv.classList.add("square");
    };
};

function removeSquares(squares) {
    for (i = 0; i < squares.length; i++) {
        document.querySelector("#container").removeChild(squares[i]);
    };
};

function generateRGBColor() {
    let r = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    let g = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    let b = Math.floor(Math.random() * (255 - 0 + 1)) + 0;

    let rgbColor = "rgb(" + r + ", " + g + ", " + b + ")";

    return rgbColor;
};

function giveSquaresColor() {
    $square.forEach(function (element) {

        let color = generateRGBColor();

        colors.push(color);

        element.style.backgroundColor = color;
    });
};

function wrongSquare(squareClicked) {
    squareClicked.classList.add("wrong-square");
    $liResult.textContent = "Try again!"
};

function rightSquare() {
    $square.forEach(function (element) {
        element.classList.remove("wrong-square");
        element.classList.add("right-square");
        element.style.backgroundColor = colors[selectSquare];
    });
    $preNav.style.backgroundColor = colors[selectSquare];
    $liResult.textContent = "Correct!"
    $newGame.textContent = "Play again?"
};

function resetGame() {
    $square.forEach(function (element) {
        element.classList.remove("wrong-square");
        element.classList.remove("right-square");
    });
    $liResult.textContent = "";
    $newGame.textContent = "New colors";
    colors = [];
    removeSquares($square);
    $preNav.style.backgroundColor = ""
    setGame();
};

function setGame() {
    generateSquares(gameMode);
    $square = document.querySelectorAll(".square");
    generateRGBColor();
    giveSquaresColor();
    selectSquare = Math.floor(Math.random() * $square.length);
    $colorDisplay.textContent = colors[selectSquare];
    $square.forEach(function (element) {
        element.addEventListener("click", function () {
            if (this.style.backgroundColor === colors[selectSquare]) {
                rightSquare(element);
            } else {
                wrongSquare(element);
            };
        });
    });
};

$newGame.addEventListener("click", function () {
    resetGame();
});

$easyBtn.addEventListener("click", function () {
    if (gameMode !== "easy") {
        $easyBtn.classList.add("selected");
        $hardBtn.classList.remove("selected");
        gameMode = "easy";
        resetGame();
    };
});

$hardBtn.addEventListener("click", function () {
    if (gameMode !== "hard") {
        $easyBtn.classList.remove("selected");
        $hardBtn.classList.add("selected");
        gameMode = "hard";
        resetGame();
    };
});

setGame();
