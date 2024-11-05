const lessThanTwoGrid = [
    [1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const lessThanTwoDeadGrid = [
    [-1, 0, 0, 0, 0],
    [1, 1, -1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const twoOrThreeGrid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const twoOrThreeLiveGrid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const moreThanThreeGrid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const moreThanThreeDeadGrid = [
    [0, 0, 0, 0, 0],
    [0, 1, -1, 0, 0],
    [0, 1, -1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const threeGrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, -1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const threeLiveGrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];



// replace the canvas with the grid
function drawGrid(grid, cellSize, canvas) {
    const ctx = canvas.getContext("2d");


    canvas.width = 5 * cellSize;
    canvas.height = 5 * cellSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === 1) {
                ctx.fillStyle = "lightgreen";
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            } else if (cell === -1) {
                ctx.fillStyle = "gray";
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        });
    });
}
const lessThanTwoCanvas = document.getElementById("lessthantwo");
const lessThanTwoDeadCanvas = document.getElementById("lessthantwodead");

const twoOrThreeCanvas = document.getElementById("twoorthree");
const twoOrThreeLiveCanvas = document.getElementById("twoorthreelive");

const moreThanThreeCanvas = document.getElementById("morethanthree");
const moreThanThreeDeadCanvas = document.getElementById("morethanthreedead");

const deadThreeCanvas = document.getElementById("three");
const deadThreeLiveCanvas = document.getElementById("threelive");

drawGrid(lessThanTwoGrid, 20, lessThanTwoCanvas);
drawGrid(lessThanTwoDeadGrid, 20, lessThanTwoDeadCanvas);

drawGrid(twoOrThreeGrid, 20, twoOrThreeCanvas);
drawGrid(twoOrThreeLiveGrid, 20, twoOrThreeLiveCanvas);

drawGrid(moreThanThreeGrid, 20, moreThanThreeCanvas);
drawGrid(moreThanThreeDeadGrid, 20, moreThanThreeDeadCanvas);

drawGrid(threeGrid, 20, deadThreeCanvas);
drawGrid(threeLiveGrid, 20, deadThreeLiveCanvas);
