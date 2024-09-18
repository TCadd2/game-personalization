import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wordle-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wordle-board.component.html',
  styleUrls: ['./wordle-board.component.css']
})
export class WordleBoardComponent {
  correctWord: string = 'HELLO';  // The correct word to guess
  guesses: string[][] = Array.from({ length: 5 }, () => Array(5).fill(''));  // 5 rows of 5 columns
  colors: string[][] = Array.from({ length: 5 }, () => Array(5).fill(''));   // Corresponding colors for cells
  currentGuess: string = '';  // The current guess from the input box
  currentRow: number = 0;     // Keeps track of which row/guess the user is on
  gameWon: boolean = false;
  gameLost: boolean = false;

  submitGuess() {
    if (this.currentGuess.length !== 5 || this.currentRow >= 5 || this.gameWon || this.gameLost) {
      return;  // Guess must be exactly 5 letters, and game must still be ongoing
    }

    // Fill the guess in the appropriate row
    this.guesses[this.currentRow] = this.currentGuess.toUpperCase().split('');

    // Check each letter and color accordingly
    this.checkGuess();
    
    // Check if the user has won or lost
    if (this.currentGuess.toUpperCase() === this.correctWord) {
      this.gameWon = true;
    } else if (this.currentRow === 4) {
      this.gameLost = true;
    }

    // Move to the next row and clear the current guess
    this.currentRow++;
    this.currentGuess = '';
  }

  checkGuess() {
    for (let i = 0; i < 5; i++) {
      if (this.currentGuess[i].toUpperCase() === this.correctWord[i]) {
        // Correct letter in the correct position
        this.colors[this.currentRow][i] = 'green';
      } else if (this.correctWord.includes(this.currentGuess[i].toUpperCase())) {
        // Letter exists in the word, but wrong position
        this.colors[this.currentRow][i] = 'yellow';
      } else {
        // Letter does not exist in the word
        this.colors[this.currentRow][i] = 'grey';
      }
    }
  }

  resetGame() {
    this.correctWord = 'HELLO';  // Optionally pick a new word
    this.guesses = Array.from({ length: 5 }, () => Array(5).fill(''));
    this.colors = Array.from({ length: 5 }, () => Array(5).fill(''));
    this.currentGuess = '';
    this.currentRow = 0;
    this.gameWon = false;
    this.gameLost = false;
  }
}
