import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crossword-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crossword-grid.component.html',
  styleUrls: ['./crossword-grid.component.css']
})
export class CrosswordGridComponent {
  grid: { letter: string, correct: string, editable: boolean, isIncorrect: boolean, isUnused: boolean }[][] = [];
  words: { word: string, direction: 'H' | 'V' }[] = [
    { word: 'PROGRAM', direction: 'H' },
    { word: 'DEBUG', direction: 'V' },
    { word: 'CODE', direction: 'H' },
    { word: 'SCRIPT', direction: 'V' },
    { word: 'BUILD', direction: 'H' }
  ];
  private correctAnswers: string[][] = Array.from({ length: 10 }, () => Array(10).fill(''));

  constructor() {
    this.initializeGrid();
    this.generateCrossword(this.words);
  }

  initializeGrid() {
    this.grid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({
        letter: '',
        correct: '',
        editable: false,
        isIncorrect: false,
        isUnused: true
      }))
    );
  }

  generateCrossword(words: { word: string, direction: 'H' | 'V' }[]) {
    this.initializeGrid();

    // Place the first word horizontally at the top-left corner
    const firstWord = words.shift();
    if (firstWord) {
      this.placeWordInGrid(firstWord.word, 0, 0, 'H');
    }

    // Place remaining words
    for (const { word, direction } of words) {
      let placed = false;

      for (let row = 0; row < 10 && !placed; row++) {
        for (let col = 0; col < 10 && !placed; col++) {
          if (this.canPlaceWord(word, row, col, direction)) {
            this.placeWordInGrid(word, row, col, direction);
            placed = true;
          }
        }
      }

      // Log a message if the word could not be placed
      if (!placed) {
        console.warn(`Could not place word: ${word}`);
      }
    }

    this.updateGrid();
  }

  canPlaceWord(word: string, startRow: number, startCol: number, direction: 'H' | 'V'): boolean {
    const length = word.length;
    const gridSize = 10;

    if (direction === 'H') {
      if (startCol + length > gridSize) return false;

      for (let i = 0; i < length; i++) {
        const cell = this.correctAnswers[startRow][startCol + i];
        if (cell !== '' && cell !== word[i]) return false;
      }

      return true;
    } else {
      if (startRow + length > gridSize) return false;

      for (let i = 0; i < length; i++) {
        const cell = this.correctAnswers[startRow + i][startCol];
        if (cell !== '' && cell !== word[i]) return false;
      }

      return true;
    }
  }

  placeWordInGrid(word: string, startRow: number, startCol: number, direction: 'H' | 'V') {
    for (let i = 0; i < word.length; i++) {
      if (direction === 'H') {
        this.correctAnswers[startRow][startCol + i] = word[i];
      } else {
        this.correctAnswers[startRow + i][startCol] = word[i];
      }
    }

    this.updateGrid(); // Update the grid after placing the word
  }

  updateGrid() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const correctLetter = this.correctAnswers[row][col];
        const currentLetter = this.grid[row][col].letter;

        this.grid[row][col] = {
          letter: currentLetter,
          correct: correctLetter || '',
          editable: correctLetter === '' || (currentLetter === '' && !this.grid[row][col].isUnused),
          isIncorrect: (currentLetter.toUpperCase() !== correctLetter.toUpperCase()) && currentLetter !== '',
          isUnused: !correctLetter
        };

        if (correctLetter !== '') {
          this.grid[row][col].editable = false;
        }
      }
    }
  }

  checkAnswer(row: number, col: number) {
    const cell = this.grid[row][col];
    if (cell.letter.toUpperCase() !== cell.correct.toUpperCase()) {
      cell.isIncorrect = true;
    } else {
      cell.isIncorrect = false;
    }
  }

  onInput(event: Event, row: number, col: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toUpperCase();

    this.grid[row][col].letter = value;
    this.checkAnswer(row, col);
  }
}
