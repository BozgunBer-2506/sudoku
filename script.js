let board = [];
let originalBoard = [];
let solution = [];
let selectedCell = null;
let gameTimer = 0;
let timerInterval = null;
let difficulty = 'easy';

const puzzles = {
    easy: [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ],
    medium: [
        [0,2,0,0,0,0,0,5,0],
        [0,0,6,0,1,0,2,0,0],
        [0,0,0,2,0,5,0,0,0],
        [6,0,0,0,0,0,0,0,2],
        [0,3,0,0,0,0,0,1,0],
        [2,0,0,0,0,0,0,0,8],
        [0,0,0,8,0,4,0,0,0],
        [0,0,4,0,9,0,5,0,0],
        [0,5,0,0,0,0,0,3,0]
    ],
    hard: [
        [0,0,5,3,0,0,0,0,0],
        [8,0,0,0,0,0,0,2,0],
        [0,7,0,0,1,0,5,0,0],
        [4,0,0,0,0,5,3,0,0],
        [0,1,0,0,7,0,0,0,6],
        [0,0,3,2,0,0,0,8,0],
        [0,6,0,5,0,0,0,0,9],
        [0,0,4,0,0,0,0,3,0],
        [0,0,0,0,0,9,7,0,0]
    ]
};

function initGame() {
    const puzzle = puzzles[difficulty];
    board = JSON.parse(JSON.stringify(puzzle));
    originalBoard = JSON.parse(JSON.stringify(puzzle));
    solution = solveSudoku(JSON.parse(JSON.stringify(puzzle)));
    gameTimer = 0;
    selectedCell = null;
    document.getElementById('status').textContent = '';
    clearInterval(timerInterval);
    startTimer();
    renderGrid();
    updateStats();
}

function setDifficulty(level) {
    difficulty = level;
    document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const labels = { easy: 'Kolay seviye', medium: 'Orta seviye', hard: 'Zor seviye' };
    document.getElementById('difficulty-label').textContent = labels[level];
    
    newGame();
}

function renderGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;

            if (originalBoard[i][j] !== 0) {
                cell.classList.add('given');
            }

            cell.textContent = board[i][j] !== 0 ? board[i][j] : '';
            cell.onclick = () => selectCell(i, j);
            grid.appendChild(cell);
        }
    }
}

function selectCell(row, col) {
    if (selectedCell) {
        document.getElementById(`cell-${selectedCell[0]}-${selectedCell[1]}`).classList.remove('selected');
    }

    if (originalBoard[row][col] === 0) {
        selectedCell = [row, col];
        document.getElementById(`cell-${row}-${col}`).classList.add('selected');
    }
}

function fillNumber(num) {
    if (selectedCell) {
        board[selectedCell[0]][selectedCell[1]] = num;
        renderGrid();
        if (selectedCell) {
            document.getElementById(`cell-${selectedCell[0]}-${selectedCell[1]}`).classList.add('selected');
        }
        updateStats();
    }
}

function clearCell() {
    if (selectedCell && originalBoard[selectedCell[0]][selectedCell[1]] === 0) {
        board[selectedCell[0]][selectedCell[1]] = 0;
        renderGrid();
        if (selectedCell) {
            document.getElementById(`cell-${selectedCell[0]}-${selectedCell[1]}`).classList.add('selected');
        }
        updateStats();
    }
}

function checkSolution() {
    const status = document.getElementById('status');
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== solution[i][j]) {
                status.classList.add('error');
                status.textContent = '❌ Yanlışlık var!';
                setTimeout(() => status.textContent = '', 2000);
                return;
            }
        }
    }
    
    status.classList.remove('error');
    status.classList.add('success');
    status.textContent = '✓ Doğru! Tebrikler!';
    clearInterval(timerInterval);
    
    const minutes = Math.floor(gameTimer / 60);
    const seconds = gameTimer % 60;
    document.getElementById('finalTime').textContent = 
        `Süreniz: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    setTimeout(() => {
        document.getElementById('successModal').classList.add('show');
    }, 1000);
}

function newGame() {
    initGame();
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

function startTimer() {
    timerInterval = setInterval(() => {
        gameTimer++;
        const minutes = Math.floor(gameTimer / 60);
        const seconds = gameTimer % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function updateStats() {
    const empty = board.flat().filter(cell => cell === 0).length;
    document.getElementById('empty-count').textContent = empty;
    
    let correct = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0 && board[i][j] === solution[i][j]) {
                correct++;
            }
        }
    }
    const accuracy = Math.round((correct / 81) * 100);
    document.getElementById('accuracy').textContent = accuracy + '%';
}

function solveSudoku(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, i, j, num)) {
                        board[i][j] = num;
                        if (solveSudoku(board)) {
                            return board;
                        }
                        board[i][j] = 0;
                    }
                }
                return null;
            }
        }
    }
    return board;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

// Oyunu başlat
initGame();