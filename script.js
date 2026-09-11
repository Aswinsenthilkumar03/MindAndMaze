const allSymbols = [
    "1", "1",
    "2", "2",
    "3", "3",
    "4", "4"
];

let symbols = allSymbols.slice(0,8);


let firstCard = null;
let secondCard = null;
let moves = 0;
let score = 0;
let lockBoard = false;

const gameBoard = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

function startGame() {

    firstCard = null;
    secondCard = null;
    moves = 0;
    score = 0;
    lockBoard = false;

    movesDisplay.textContent = moves;
    scoreDisplay.textContent = score;

    gameBoard.innerHTML = "";

    const shuffledSymbols = [...symbols]
        .sort(() => Math.random() - 0.5);

    shuffledSymbols.forEach(function(symbol) {

        const card = document.createElement("button");

        card.classList.add("card");

        card.dataset.symbol = symbol;

        card.textContent = "?";

        card.addEventListener("click", function() {
            flipCard(card);
        });

        gameBoard.appendChild(card);
    });
}

function flipCard(card) {

    if (
        lockBoard ||
        card === firstCard ||
        card.classList.contains("matched")
    ) {
        return;
    }

    card.classList.add("open");
    card.textContent = card.dataset.symbol;

    if (firstCard === null) {

        firstCard = card;

        return;
    }

    secondCard = card;

    moves++;

    movesDisplay.textContent = moves;

    checkMatch();
}

function checkMatch() {

    if (
        firstCard.dataset.symbol ===
        secondCard.dataset.symbol
    ) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        score += 10;

        scoreDisplay.textContent = score;

        resetTurn();

        checkWin();

    } else {

        lockBoard = true;

        setTimeout(function() {

            firstCard.classList.remove("open");
            secondCard.classList.remove("open");

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            resetTurn();

        }, 800);
    }
}

function resetTurn() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkWin() {

    const matchedCards =
        document.querySelectorAll(".card.matched");

    if (matchedCards.length === symbols.length) {

        setTimeout(function() {

            alert(
                "🎉 Well Done!\n\n" +
                "Score: " + score +
                "\nMoves: " + moves
            );

        }, 300);
    }
}

restartButton.addEventListener("click", startGame);

startGame();
