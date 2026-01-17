# 数独 SUDOKU Game

**Multilingual** interactive Sudoku puzzle game with **infinite random** puzzles.

## ✨ Features

- 🌍 **3 Language Support**: Turkish, English, German
- 🎮 **3 Difficulty Levels**: Easy, Medium, Hard
- ♾️ **Infinite Games**: Algorithm generates millions of different Sudoku puzzles automatically
- ⏱️ **Real-Time Timer**: Track how many seconds it takes to solve
- 📊 **Statistics**: Accuracy percentage and empty cell counter
- 🎨 **Modern Design**: Sleek neon blue theme with dark interface
- 📱 **Mobile Friendly**: Perfect on phone, tablet, and desktop
- ✅ **Solution Check**: Validate answers and get instant feedback
- 🎉 **Success Modal**: Celebration message when you solve the puzzle
- 💡 **Tips**: Sudoku solving strategies

## 🎮 How to Play

1. **Select Language**: Choose TR/EN/DE from the 🌍 Language section
2. **Choose Difficulty**: Select Easy, Medium, or Hard level
3. **Select Cell**: Click on an empty cell you want to fill
4. **Enter Number**: Choose a number from buttons 1-9
5. **Check Solution**: Click "Check" button to validate your answer
6. **New Game**: Press "New Game" button anytime to get a new puzzle

## 📏 Sudoku Rules

- Each **row** must contain numbers 1-9 **exactly once**
- Each **column** must contain numbers 1-9 **exactly once**
- Each **3x3 box** must contain numbers 1-9 **exactly once**

## 🛠️ Technologies

- **HTML5**: Page structure with multi-language support
- **CSS3**: Modern neon design with responsive layout
- **JavaScript**: Game logic, Sudoku algorithm, multi-language system

## 📁 File Structure

```
sudoku-oyunu/
├── index.html      # HTML structure (3 language support)
├── style.css       # CSS styling (neon theme, mobile responsive)
├── script.js       # JavaScript (auto Sudoku generation, 3 languages)
└── README.md       # This file
```

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BozgunBer-2506/sudoku.git
   cd sudoku
   ```

2. Open `index.html` in your browser or start a local server:
   ```bash
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000` and play!

## 💡 Game Tips

- **Avoid guessing**: Think logically
- **Analyze rows**: Find missing numbers
- **Check columns**: Remember repeated numbers
- **Inspect 3x3 boxes**: Note what's missing in each box
- **Find frequent numbers**: Easy to place numbers that appear often
- **Progress step by step**: Don't jump to uncertain spots

## 🎯 Features in Detail

### Auto Sudoku Generation
- Each game creates a completely **new and random** Sudoku
- `fillBoard()` algorithm guarantees valid and solvable puzzles
- Variable cell count based on difficulty:
  - **Easy**: 30 cells removed (49 numbers remain)
  - **Medium**: 45 cells removed (36 numbers remain)
  - **Hard**: 55 cells removed (26 numbers remain)

### 3 Language Support
- All text changes dynamically
- Selected language affects entire UI
- Supported languages: 🇹🇷 Turkish, 🇬🇧 English, 🇩🇪 German

### Timer and Statistics
- Real-time elapsed time tracking
- Empty cell counter
- Accuracy percentage calculation

## 👨‍💻 Developer

**Crafted by The_Bozgun** 🧠

🎌 数独ゲーム © 2026

## 📄 License

MIT License - Use freely!

---

**GitHub Repo**: https://github.com/BozgunBer-2506/sudoku