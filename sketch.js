function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    init();
    //console.log(getN(26, 25));
    cellHeight = windowHeight / numCells;
    cellWidth = windowWidth / numCells;

    cellHeight = min([cellHeight, cellWidth]);
    cellWidth = min([cellHeight, cellWidth]);

    cellXStart = (windowWidth / 2) - (cellWidth * (numCells / 2));
    cellYStart = (windowHeight / 2) - (cellHeight * (numCells / 2));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, 1);

    cellHeight = windowHeight / numCells;
    cellWidth = windowWidth / numCells;

    cellHeight = min([cellHeight, cellWidth]);
    cellWidth = min([cellHeight, cellWidth]);

    cellXStart = (windowWidth / 2) - (cellWidth * (numCells / 2));
    cellYStart = (windowHeight / 2) - (cellHeight * (numCells / 2));
}

var numCells = 50;
var grid = [];

var cellHeight = 0;
var cellWidth = 0;

var cellXStart = 0;
var cellYStart = 0;

function init() {
    var y = 0;
    var x = 0;
    while (y < numCells) {
        grid[y] = [];
        y++;
    }

    y = 0;
    while (y < numCells) {
        while (x < numCells) {
            grid[y][x] = 0;
            x++;
        }
        y++;
        x = 0;
    }

    grid[25][20] = 1;

    grid[25][22] = 1;
    grid[24][22] = 1;

    grid[23][24] = 1;
    grid[22][24] = 1;
    grid[21][24] = 1;

    grid[22][26] = 1;
    grid[21][26] = 1;
    grid[20][26] = 1;

    grid[21][27] = 1;
}

function draw() {
    displayCells();
    if (frameCount > 1 && frameCount % 10 == 0) {
        updateCells();
    }
}

function displayCells() {
    var y = 0;
    var x = 0;

    while (y < numCells) {
        while (x < numCells) {
            //console.log(grid[y][x]);
            fill(255 - grid[y][x] * 250);
            rect(cellXStart + (cellWidth * x), cellYStart + (cellHeight * y), cellWidth, cellHeight);
            x++;
        }
        y++;
        x = 0;
    }
}

function updateCells() {
    var y = 0;
    var x = 0;
    var neibour = 0;
    var newGrid = copyGrid(grid);

    while (y < numCells) {
        while (x < numCells) {
            neibour = getN(y, x);
            neibour += getE(y, x);
            neibour += getS(y, x);
            neibour += getW(y, x);
            neibour += getNE(y, x);
            neibour += getSE(y, x);
            neibour += getSW(y, x);
            neibour += getNW(y, x);

            if (neibour < 2) {
                newGrid[y][x] = 0;
            } else if (neibour > 3) {
                newGrid[y][x] = 0;
            } else if (neibour == 3) {
                newGrid[y][x] = 1;
            }

            x++;
        }
        y++;
        x = 0;
    }

    transferIntoGrid(newGrid);
}

// Return a copy of the given grid
function copyGrid(from) {
    var copy = [];

    var y = 0;
    var x = 0;
    while (y < numCells) {
        copy[y] = [];
        y++;
    }

    y = 0;
    while (y < numCells) {
        while (x < numCells) {
            copy[y][x] = from[y][x];
            x++;
        }
        y++;
        x = 0;
    }

    return copy;
}

function getN(y, x) {
    return grid[(((y-1) % numCells) + numCells) % numCells][x];
}

function getS(y, x) {
    return grid[(((y+1) % numCells) + numCells) % numCells][x];
}

function getE(y, x) {
    return grid[y][(((x+1) % numCells) + numCells) % numCells];
}

function getW(y, x) {
    return grid[y][(((x-1) % numCells) + numCells) % numCells];
}

function getNE(y, x) {
    return grid[(((y-1) % numCells) + numCells) % numCells][(((x+1) % numCells) + numCells) % numCells];
}

function getSE(y, x) {
    return grid[(((y+1) % numCells) + numCells) % numCells][(((x+1) % numCells) + numCells) % numCells];
}

function getSW(y, x) {
    return grid[(((y+1) % numCells) + numCells) % numCells][(((x-1) % numCells) + numCells) % numCells];
}

function getNW(y, x) {
    return grid[(((y-1) % numCells) + numCells) % numCells][(((x-1) % numCells) + numCells) % numCells];
}

function transferIntoGrid(from) {
    var y = 0;
    var x = 0;

    while (y < numCells) {
        while (x < numCells) {
            grid[y][x] = from[y][x];
            x++;
        }
        y++;
        x = 0;
    }
}
