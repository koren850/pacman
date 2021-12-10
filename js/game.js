'use strict'
const WALL = '#'
const FOOD = '•'
const EMPTY = ' ';
const SUPERFOOD = '💎';
const CHERRY = '🍒';


var gBoard;
var gFoodleft = -1
var gRandomCherry;
var gRandomCherryInterval;
var gGame = {
    score: 0,
    isOn: false
}


function init() {
    console.log('hello')
    gFoodleft = -1
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    renderMat(gBoard, '.board-container')
    gRandomCherryInterval = setInterval(createCherry, 15000)
    createCherry();
    gGame.isOn = true
    closeModal()
    gGame.score = 0;
    document.querySelector('.score').innerText = '0';
}

function buildBoard() {
    var size = 15;
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD;
            gFoodleft++;
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                ((j >= 3 && j <= 5) && i === 4 ||
                    (i >= 8 && i <= 11) && j === 11 ||
                    (i >= 9 && i <= 11) && j === 4 ||
                    (j >= 3 && j <= 5) && i === 10 ||
                    (i >= 5 && i <= 7) && j === 8 ||
                    (j >= 7 && j <= 9) && i === 6 ||
                    (j >= 11 && j <= 13) && i === 3 ||
                    (i >= 11 && i <= 13) && j === 8 ||
                    (j >= 1 && j <= 2) && i === 7 ||
                    (i >= 1 && i <= 2) && j === 8
                )) {
                board[i][j] = WALL;
                gFoodleft--;
            }
            var corner = size - 2;
            if ((i === 1 && j === 1) || (i === 1 && j === corner) || (i === corner && j === 1) || (i === corner && j === corner)) {
                board[i][j] = SUPERFOOD;
                gFoodleft--;
            }
        }
    }
    return board;
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gRandomCherryInterval);
    openModal('Game Over you lost 😈');
}

function checkVictory() {
    if (gFoodleft === 0) {
        gGame.isOn = false;
        clearTimeout(gIntervalGhosts);
        clearInterval(gRandomCherryInterval);
        openModal('You Won!!!');
    }
}


function getRandomCherry() {
    var emptys = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptys.push({ i: i, j: j });
            }
        }
    }
    return emptys[getRandomIntInt(0, emptys.length - 1)];
}

function createCherry() {
    var coord = getRandomCherry()
    if (!coord) return
    console.log(coord);
    gBoard[coord.i][coord.j] = CHERRY;
    renderCell(coord, CHERRY);

}


