let board = [];
let originalBoard = [];
let solution = [];
let selectedCell = null;
let gameTimer = 0;
let timerInterval = null;
let difficulty = 'easy';
let language = 'tr';

const translations = {
    tr: {
        lang_title: '🌍 Dil',
        difficulty_title: 'Zorluk Seviyesi',
        easy: 'Kolay',
        medium: 'Orta',
        hard: 'Zor',
        stats_title: 'İstatistikler',
        time_label: 'Süre:',
        empty_label: 'Boş Hücre:',
        accuracy_label: 'Doğruluk:',
        new_game: '🔄 Yeni Oyun',
        check: '✓ Kontrol Et',
        clear: '✕ Hücreyi Sil',
        delete: 'Sil',
        tips_title: '💡 İpuçları',
        tip_1: 'Her satırda 1-9 bir kez olmalı',
        tip_2: 'Her sütunda 1-9 bir kez olmalı',
        tip_3: 'Her 3x3 kutuda 1-9 bir kez olmalı',
        tip_4: 'Mantıksal düşün, tahmin etme',
        title: 'Sudoku Bulmacası',
        easy_level: 'Kolay seviye',
        medium_level: 'Orta seviye',
        hard_level: 'Zor seviye',
        wrong: '❌ Yanlışlık var!',
        correct: '✓ Doğru! Tebrikler!',
        empty_error: 'Hala {count} boş hücre var!',
        congratulations: '🎉 Tebrikler!',
        success_text: 'Sudoku\'yu başarıyla çözdün!',
        time_text: 'Süreniz:',
        modal_new: 'Yeni Oyun',
        modal_close: 'Kapat',
        check_cell: 'Seçili Hücreyi Kontrol Et'
    },
    en: {
        lang_title: '🌍 Language',
        difficulty_title: 'Difficulty Level',
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
        stats_title: 'Statistics',
        time_label: 'Time:',
        empty_label: 'Empty Cells:',
        accuracy_label: 'Accuracy:',
        new_game: '🔄 New Game',
        check: '✓ Check',
        clear: '✕ Clear Cell',
        delete: 'Delete',
        tips_title: '💡 Tips',
        tip_1: 'Each row must contain 1-9 once',
        tip_2: 'Each column must contain 1-9 once',
        tip_3: 'Each 3x3 box must contain 1-9 once',
        tip_4: 'Think logically, don\'t guess',
        title: 'Sudoku Puzzle',
        easy_level: 'Easy level',
        medium_level: 'Medium level',
        hard_level: 'Hard level',
        wrong: '❌ Wrong answer!',
        correct: '✓ Correct! Congratulations!',
        empty_error: 'Still {count} empty cells!',
        congratulations: '🎉 Congratulations!',
        success_text: 'You solved the Sudoku!',
        time_text: 'Your time:',
        modal_new: 'New Game',
        modal_close: 'Close',
        check_cell: 'Check Selected Cell'
    },
    de: {
        lang_title: '🌍 Sprache',
        difficulty_title: 'Schwierigkeitsstufe',
        easy: 'Leicht',
        medium: 'Mittel',
        hard: 'Schwer',
        stats_title: 'Statistiken',
        time_label: 'Zeit:',
        empty_label: 'Leere Zellen:',
        accuracy_label: 'Genauigkeit:',
        new_game: '🔄 Neues Spiel',
        check: '✓ Überprüfen',
        clear: '✕ Zelle löschen',
        delete: 'Löschen',
        tips_title: '💡 Tipps',
        tip_1: 'Jede Reihe muss 1-9 einmal enthalten',
        tip_2: 'Jede Spalte muss 1-9 einmal enthalten',
        tip_3: 'Jedes 3x3-Feld muss 1-9 einmal enthalten',
        tip_4: 'Denke logisch, nicht raten',
        title: 'Sudoku-Rätsel',
        easy_level: 'Leichte Stufe',
        medium_level: 'Mittelstufe',
        hard_level: 'Schwere Stufe',
        wrong: '❌ Falsche Antwort!',
        correct: '✓ Richtig! Glückwunsch!',
        empty_error: 'Noch {count} leere Zellen!',
        congratulations: '🎉 Glückwunsch!',
        success_text: 'Du hast das Sudoku gelöst!',
        time_text: 'Deine Zeit:',
        modal_new: 'Neues Spiel',
        modal_close: 'Schließen',
        check_cell: 'Gewählte Zelle überprüfen'
    }
};

// --- CORE LOGIC ---

function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (grid[i][j] === num) return false;
        }
    }
    return true;
}

function fillBoard(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                let nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
                for (let num of nums) {
                    if (isValid(grid, i, j, num)) {
                        grid[i][j] = num;
                        if (fillBoard(grid)) return true;
                        grid[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generateSudoku(level) {
    let newBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(newBoard);
    let fullSolution = JSON.parse(JSON.stringify(newBoard));
    const difficultyMap = { 'easy': 35, 'medium': 50, 'hard': 62 };
    let cellsToRemove = difficultyMap[level] || 40;
    while (cellsToRemove > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (newBoard[row][col] !== 0) {
            newBoard[row][col] = 0;
            cellsToRemove--;
        }
    }
    return { puzzle: newBoard, solution: fullSolution };
}

// --- INITIALIZATION ---

function initGame() {
    const generated = generateSudoku(difficulty);
    board = JSON.parse(JSON.stringify(generated.puzzle));
    originalBoard = JSON.parse(JSON.stringify(generated.puzzle));
    solution = generated.solution;
    gameTimer = 0;
    selectedCell = null;
    const status = document.getElementById('status');
    status.textContent = '';
    status.className = 'status';
    clearInterval(timerInterval);
    startTimer();
    renderGrid();
    updateStats();
    closeModal();
    updateLanguage();
}

function setLanguage(lang) {
    language = lang;
    document.getElementById('btn-tr').classList.toggle('active', lang === 'tr');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-de').classList.toggle('active', lang === 'de');
    updateLanguage();
}

function updateLanguage() {
    const t = translations[language];
    document.getElementById('lang-title').textContent = t.lang_title;
    document.getElementById('difficulty-title').textContent = t.difficulty_title;
    document.getElementById('btn-easy').textContent = t.easy;
    document.getElementById('btn-medium').textContent = t.medium;
    document.getElementById('btn-hard').textContent = t.hard;
    document.getElementById('stats-title').textContent = t.stats_title;
    document.getElementById('time-label').textContent = t.time_label;
    document.getElementById('empty-label').textContent = t.empty_label;
    document.getElementById('accuracy-label').textContent = t.accuracy_label;
    document.getElementById('btn-new').textContent = t.new_game;
    document.getElementById('btn-check').textContent = t.check;
    document.getElementById('btn-clear').textContent = t.clear;
    document.getElementById('btn-check-cell').textContent = t.check_cell;
    document.getElementById('tips-title').textContent = t.tips_title;
    document.getElementById('tip-1').textContent = t.tip_1;
    document.getElementById('tip-2').textContent = t.tip_2;
    document.getElementById('tip-3').textContent = t.tip_3;
    document.getElementById('tip-4').textContent = t.tip_4;
    document.getElementById('title').textContent = t.title;
    document.getElementById('modal-title').textContent = t.congratulations;
    document.getElementById('modal-text').textContent = t.success_text;
    document.getElementById('btn-modal-new').textContent = t.modal_new;
    document.getElementById('btn-modal-close').textContent = t.modal_close;
    const levelLabels = { easy: t.easy_level, medium: t.medium_level, hard: t.hard_level };
    document.getElementById('difficulty-label').textContent = levelLabels[difficulty];
}

function setDifficulty(level) {
    difficulty = level;
    initGame();
}

// --- GRID ---

function renderGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            if ((j+1)%3===0 && j!==8) cell.classList.add('border-right');
            if ((i+1)%3===0 && i!==8) cell.classList.add('border-bottom');
            if (originalBoard[i][j] !== 0) cell.classList.add('given');
            cell.textContent = board[i][j] !== 0 ? board[i][j] : '';
            cell.onclick = () => selectCell(i,j);
            grid.appendChild(cell);
        }
    }
}

function selectCell(row, col) {
    if (originalBoard[row][col] !== 0) return;
    if (selectedCell) {
        const prev = document.getElementById(`cell-${selectedCell[0]}-${selectedCell[1]}`);
        if(prev) prev.classList.remove('selected');
    }
    selectedCell = [row, col];
    const current = document.getElementById(`cell-${row}-${col}`);
    if(current) current.classList.add('selected');
}

function fillNumber(num) {
    if (selectedCell) {
        const [row, col] = selectedCell;
        board[row][col] = num;
        renderGrid();
        selectCell(row, col);
        updateStats();
    }
}

function clearCell() {
    if (selectedCell) {
        const [row, col] = selectedCell;
        board[row][col] = 0;
        renderGrid();
        selectCell(row, col);
        updateStats();
    }
}

// --- VALIDATION ---

function checkSolution() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const status = document.getElementById('status');
    const t = translations[language];
    const emptyCells = board.flat().filter(cell => cell === 0).length;
    
    if (emptyCells > 0) {
        status.className = 'status error';
        // Dinamik sayıyı mesajın içine yerleştiriyoruz
        status.textContent = t.empty_error.replace('{count}', emptyCells);
        setTimeout(() => { if(status.className.includes('error')) status.textContent = ''; }, 5000);
        return;
    }

    let isComplete = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== solution[i][j]) { isComplete = false; break; }
        }
    }

    if (!isComplete) {
        status.className = 'status error';
        status.textContent = t.wrong;
        setTimeout(() => { if(status.className.includes('error')) status.textContent = ''; }, 5000);
    } else {
        status.className = 'status success';
        status.textContent = t.correct;
        clearInterval(timerInterval);
        const minutes = Math.floor(gameTimer / 60);
        const seconds = gameTimer % 60;
        document.getElementById('finalTime').textContent = `${t.time_text} ${minutes}:${seconds.toString().padStart(2, '0')}`;
        setTimeout(() => document.getElementById('successModal').classList.add('show'), 500);
    }
}

function checkSelectedCell() {
    if (!selectedCell) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const [row, col] = selectedCell;
    const t = translations[language];
    const status = document.getElementById('status');
    gameTimer += 30;
    if (board[row][col] === solution[row][col]) {
        status.className = 'status success';
        status.textContent = t.correct;
        const cell = document.getElementById(`cell-${row}-${col}`);
        cell.style.backgroundColor = '#d4edda';
        setTimeout(() => { cell.style.backgroundColor = ''; }, 800);
    } else {
        status.className = 'status error';
        status.textContent = t.wrong;
        const cell = document.getElementById(`cell-${row}-${col}`);
        cell.style.backgroundColor = '#f8d7da';
        setTimeout(() => { cell.style.backgroundColor = ''; }, 800);
    }
    setTimeout(() => { if(status) status.textContent = ''; }, 2000);
}

// --- UTILS ---

function startTimer() {
    timerInterval = setInterval(()=>{
        gameTimer++;
        const minutes = Math.floor(gameTimer/60);
        const seconds = gameTimer % 60;
        const timerEl = document.getElementById('timer');
        if(timerEl) timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    },1000);
}

function updateStats() {
    const empty = board.flat().filter(cell=>cell===0).length;
    document.getElementById('empty-count').textContent = empty;
    let correct = 0;
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            if (board[i][j]!==0 && board[i][j]===solution[i][j]) correct++;
        }
    }
    const accuracy = Math.round((correct/81)*100);
    document.getElementById('accuracy').textContent = accuracy + '%';
}

function newGame(){ initGame(); }
function closeModal(){ document.getElementById('successModal').classList.remove('show'); }

document.addEventListener('DOMContentLoaded', () => initGame());
document.addEventListener('keydown', (event) => {
    if (!selectedCell) return;
    if (event.key >= '1' && event.key <= '9') fillNumber(parseInt(event.key));
    else if (event.key === 'Backspace' || event.key === 'Delete') clearCell();
});