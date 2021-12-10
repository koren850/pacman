'use strict'
const PACMAN = 'ᗧ';

var gPacman;
var gDeg = '';
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 9
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    checkVictory();
    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === CHERRY) updateScore(10);
    if (nextCell === FOOD) {
        updateScore(1);
        gFoodleft--;
    }
    else if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    }
    else if (nextCell === SUPERFOOD && gPacman.isSuper) return
    else if (nextCell === SUPERFOOD) activateSuper();
    else if (nextCell === GHOST && gPacman.isSuper) {
        updateScore(5);
        var ghost;
        // gDeadGhosts.push();
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                var ghosts = gGhosts.splice(i, 1);
                ghost = ghosts[0]
                gDeadGhosts.push(ghosts[0]);
                // console.log(gDeadGhosts);
            }
        }
        if (ghost.currCellContent === FOOD) {
            gFoodleft--
            // console.log('ate');
        }
        //dom
        // renderCell(gPacman.location, EMPTY);
        // //model
        // gPacman.location.i = nextLocation.i;
        // gPacman.location.j = nextLocation.j;
        // gBoard[nextLocation.i][nextLocation.j] = PACMAN;
        // gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
        // //dom
        // renderCell(nextLocation, PACMAN);
        // // console.log(gDeadGhosts);
        // return;
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, getPacmanHTML());


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gDeg = '-90deg'
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gDeg = '90deg'
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gDeg = '180deg'
            break;
        case 'ArrowRight':
            nextLocation.j++;
            gDeg = '0deg'
            break;
        default:
            return null;
    }
    return nextLocation;
}

function activateSuper() {
    var colors = [];
    for (var i = 0; i < gGhosts.length; i++) {
        colors[i] = gGhosts[i].color;
        gGhosts[i].color = 'blue'
    }
    gPacman.isSuper = true;
    setTimeout(function () {
        gPacman.isSuper = false
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = colors[i]
        }
        reviveGhosts();
    }, 5000);


}

function getPacmanHTML() {
    // var deg = diff + 'deg';
    return `<span style="color: gold; transform: rotate(${gDeg});
    display: inline-block; ">${PACMAN}</span>`;
}
