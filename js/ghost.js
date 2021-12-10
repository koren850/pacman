'use strict'
const GHOST = 'ᗣ';

var gGhosts = []
var gDeadGhosts = []
var gIntervalGhosts;
var gRamdomGhostSpawn;
//defined by the dev
var gGhostStartLocaitions = [{ i: 3, j: 4 }, { i: 8, j: 4 }, { i: 10, j: 7 }, { i: 7, j: 11 }];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 4
        },
        currCellContent: FOOD,
        color: getRandomColor()


    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = [];
    for (var i = 0; i < 4; i++) {
        createGhost(board)
        gGhosts[i].location = gGhostStartLocaitions[i];
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === SUPERFOOD) return;
    if (nextCell === CHERRY) return;
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            gDeadGhosts.push(ghost);
            console.log(gDeadGhosts);
            //model
            gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
            // gBoard[nextLocation.i][nextLocation.j] = PACMAN;
            //dom
            renderCell(ghost.location, ghost.currCellContent);
            updateScore(5)
            // renderCell(nextLocation, PACMAN);
            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === ghost.location.i && gGhosts[i].location.j === ghost.location.j) gGhosts.splice(i, 1);
            }
            console.log(gDeadGhosts);
            return;
        }
        else {
            gameOver();
            return;
        }
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function reviveGhosts() {
    var currCellContent = gBoard[3][3];
    for (var i = 0; i < gDeadGhosts.length; i++) {
        gGhosts.push(gDeadGhosts[i])
        gGhosts[gGhosts.length - 1].location.i = gGhostStartLocaitions[i].i
        gGhosts[gGhosts.length - 1].location.j = gGhostStartLocaitions[i].j
        gGhosts[gGhosts.length - 1].currCellContent = currCellContent;
        gGhosts[gGhosts.length - 1].color = getRandomColor();
    }
    gDeadGhosts = [];

}


function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}; background: rgb(17,19,32);
background: linear-gradient(168deg, rgba(17,19,32,1) 0%, rgba(17,19,32,1) 50%, rgba(17,19,32,1) 100%);">${GHOST}</span>`;

}