export const ActionTypes = { // Types of actions that can be performed on the game state
    INIT: 'INIT',
    PAUSE: 'PAUSE',
    PLAY: 'PLAY',
    RESET: 'RESET'
};

export const Config = { // Configuration of the game
    rows: 0,
    cols: 0,
    cellSize: 0,
    speed: 0
};

export const State = { // Initial state of the game
    generation: 0,
    config: Config,
    grid: [[]],
};

function initState(grid, speed, cellSize) { // Initialize the game state
    // build the config object
    const initConfig = {
        rows: grid.length,
        cols: grid[0].length,
        cellSize: cellSize,
        speed: speed
    };
    const state = {
        generation: 0,
        config: initConfig,
        grid: grid,
    };
    return state;
}

function pauseState(state) { // Pause the game
    state.config.speed = 0;
    return state;
}

function updateSpeedOfState(state, speed) { // Update the speed of the game
    state.config.speed = speed;
    return state;
}

function resetState(state, config,resetGrid) { 
    // Reset the game
    state.generation = 0;
    state.grid = resetGrid
    state.config = config;
    return state;
}

function checkNeighbors(state, row, col) { // Check the neighbors of a cell
    const { rows, cols } = state.config;
    const neighbors = [];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            const r = (row + i + rows) % rows;
            const c = (col + j + cols) % cols;
            neighbors.push(state.grid[r][c]);
        }
    }
    return neighbors; // returns an array of the neighbors of the cell
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playGame(state) {
    console.log("Playing game");
    while (state.config.speed > 0) {
        await sleep(1000 / state.config.speed);
        const { rows, cols } = state.config;
        const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const neighbors = checkNeighbors(state, i, j);
                const liveNeighbors = neighbors.reduce((acc, curr) => acc + curr, 0);
                if (state.grid[i][j] === 1) {
                    if (liveNeighbors < 2 || liveNeighbors > 3) {
                        newGrid[i][j] = 0; // Cell dies
                    } else {
                        newGrid[i][j] = 1; // Cell stays alive
                    }
                } else {
                    if (liveNeighbors === 3) {
                        newGrid[i][j] = 1; // Cell becomes alive
                    }
                }
            }
        }
        state.grid = newGrid;
        state.generation++;
    }
}

// Export functions if they are intended to be used in other modules
export { initState, pauseState, resetState, updateSpeedOfState, playGame };