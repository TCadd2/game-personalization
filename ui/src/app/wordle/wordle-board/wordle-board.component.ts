import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WordleSharedService } from '../wordle-shared.service';
import { KeyboardComponent } from '../../keyboard/keyboard.component';

@Component({
  selector: 'app-wordle-board',
  standalone: true,
  imports: [CommonModule, FormsModule, KeyboardComponent],
  templateUrl: './wordle-board.component.html',
  styleUrls: ['./wordle-board.component.css']
})
export class WordleBoardComponent {
  correctWord: string = '';  // Word to guess
  guesses: string[][] = Array.from({ length: 5 }, () => Array(5).fill(''));
  colors: string[][] = Array.from({ length: 5 }, () => Array(5).fill(''));
  currentGuess: string = '';
  currentRow: number = 0;
  currentTile: number = 0;
  gameWon: boolean = false;
  gameLost: boolean = false;

  constructor(private router: Router, private wordleSharedService: WordleSharedService) {}

  ngOnInit() {
    const topic = 'WORDS';  // Example topic for wordle

    this.correctWord = this.wordleSharedService.getWord();
  }

  addLetter(letter: string) {
    if (this.currentTile < 5 && !this.gameWon && !this.gameLost) {
      this.guesses[this.currentRow][this.currentTile] = letter;
      this.currentTile++;
    }
  }

  deleteLetter() {
    if (this.currentTile > 0 && !this.gameWon && !this.gameLost) {
      this.currentTile--;
      this.guesses[this.currentRow][this.currentTile] = '';
    }
  }
  submitGuess() {
    if (this.currentTile === 5) {
      const guess = this.guesses[this.currentRow].join('').toUpperCase();
      
      if (guess === this.correctWord) {
        this.gameWon = true;
      } else if (this.currentRow === 4) {
        this.gameLost = true;
      }

      this.checkGuess(guess);
      this.currentRow++;
      this.currentTile = 0;
    }
  }

  checkGuess(guess: string) {
    for (let i = 0; i < 5; i++) {
      if (guess[i] === this.correctWord[i]) {
        this.colors[this.currentRow][i] = 'green';
      } else if (this.correctWord.includes(guess[i])) {
        this.colors[this.currentRow][i] = 'yellow';
      } else {
        this.colors[this.currentRow][i] = 'grey';
      }
    }
  }

  resetGame() {
    this.correctWord = 'HELLO'; // Set a new word
    this.guesses = Array.from({ length: 5 }, () => Array(5).fill(''));
    this.colors = Array.from({ length: 5 }, () => Array(5).fill(''));
    this.currentRow = 0;
    this.currentTile = 0;
    this.gameWon = false;
    this.gameLost = false;
  }

  goBackToMenu() {
    this.router.navigate(['/']); // Navigate to the main menu (adjust the route as needed)
  }
}
