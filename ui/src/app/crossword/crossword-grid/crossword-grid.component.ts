import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeyboardComponent } from '../../keyboard/keyboard.component';
import { WordleSharedService } from '../../wordle/wordle-shared.service';

@Component({
  selector: 'app-crossword-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, KeyboardComponent],
  templateUrl: './crossword-grid.component.html',
  styleUrls: ['./crossword-grid.component.css']
})
export class CrosswordGridComponent {
  grid: string[][] = [];
  correctGrid: string[][] = [];
  colors: string[][] = [];
  hints: string[] = [];
  words: string[] = [];
  commonLetter: string = '';
  activeRow: number = 0;
  activeCol: number = 0;
  wordPositions: string[] = []

  constructor(private wordleService: WordleSharedService, private renderer: Renderer2, private elRef: ElementRef) {}

  async ngOnInit() {
    // Fetch crossword data
    this.hints = await this.wordleService.getWordsAndHints().hints;
    this.words = await this.wordleService.getWordsAndHints().words;
    this.commonLetter = await this.wordleService.getWordsAndHints().commonLetter[0][0];
    const maxWordLength = Math.max(...this.words.map(word => word.length));
    this.adjustGridSize(maxWordLength); // Adjust the grid size dynamically

    // Generate the correct grid dynamically based on the largest word length
    this.correctGrid = Array.from({ length: maxWordLength }, () =>
      Array(maxWordLength).fill('*') // Create a grid with maxWordLength x maxWordLength size
    );
    this.populateCorrectGrid();

    // Initialize user grid and color states
    this.grid = Array.from({ length: maxWordLength }, (_, rowIndex) =>
      this.correctGrid[rowIndex].map(cell => (cell === '*' ? '*' : ''))
    );
    
    this.colors = this.generateEmptyGrid(maxWordLength, maxWordLength);
    this.hints = this.hints.map((hint, index) => {
      return `${hint} (${this.wordPositions[index]})`;
    });
  }

  adjustGridSize(maxWordLength: number) {
    const crosswordGrid = this.elRef.nativeElement.querySelector('.crossword-grid');  }

  populateCorrectGrid() {
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        let position = this.findLetterPosition(this.commonLetter, this.words[i + 1]);
        this.wordPositions[0] = `Row: ${position+1}, Column 1`; 
        for (let j = 0; j < this.words[i].length; j++) {
          this.correctGrid[j][position] = this.words[i][j].toUpperCase();
        }
      }
      if (i === 1) {
        let position = this.findLetterPosition(this.commonLetter, this.words[i - 1]);
        this.wordPositions[1] = `Row: 1, Column ${position+1}`; 
        for (let j = 0; j < this.words[i].length; j++) {
          this.correctGrid[position][j] = this.words[i][j].toUpperCase();
        }
      }
    }
  }

  findLetterPosition(letter: string, word: string): number {
    return word.indexOf(letter);
  }

  generateEmptyGrid(rows: number, cols: number): string[][] {
    return Array.from({ length: rows }, () => Array(cols).fill(''));
  }

  selectCell(row: number, col: number) {
    // Reset previously selected cell
    this.activeRow = row;
    this.activeCol = col;
  }

  addLetter(letter: string) {
    if (this.grid[this.activeRow][this.activeCol] !== '*') {
      this.grid[this.activeRow][this.activeCol] = letter.toUpperCase();
      this.checkLetter();
      this.moveToNextCell();
    }
  }

  deleteLetter() {
    if (this.grid[this.activeRow][this.activeCol] !== '*') {
      this.grid[this.activeRow][this.activeCol] = '';
    }
  }

  moveToNextCell() {
    if (this.activeCol < this.grid[0].length - 1) {
      this.activeCol++;
    } else if (this.activeRow < this.grid.length - 1) {
      this.activeRow++;
      this.activeCol = 0;
    }
  }
  checkLetter() {
    const enteredLetter = this.grid[this.activeRow][this.activeCol];
    const correctLetter = this.correctGrid[this.activeRow][this.activeCol]; // Use correctGrid to get the solution

    if (enteredLetter === correctLetter) {
        // Reveal the correct letter in the displayed grid
        this.grid[this.activeRow][this.activeCol] = correctLetter; 
        this.colors[this.activeRow][this.activeCol] = 'green';  // Mark as correct
    } else {
        this.colors[this.activeRow][this.activeCol] = 'grey';  // Mark as incorrect
    }
}


  enterGuess() {
    this.moveToNextCell();
  }
}
