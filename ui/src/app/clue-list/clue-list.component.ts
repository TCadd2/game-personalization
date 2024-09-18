import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clue-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clue-list.component.html',
  styleUrls: ['./clue-list.component.css'],
})
export class ClueListComponent {
  // Updated clues based on the new grid layout
  clues = [
    { number: 1, clue: 'A small domesticated feline', direction: 'across', startRow: 0, startCol: 0, length: 3 },  // CAT
    { number: 2, clue: 'A work of creativity', direction: 'down', startRow: 0, startCol: 2, length: 3 },            // ART
    { number: 3, clue: 'Move swiftly on foot', direction: 'across', startRow: 2, startCol: 0, length: 3 },         // RUN
    { number: 4, clue: 'A pronoun for oneself', direction: 'down', startRow: 2, startCol: 2, length: 1 },          // I
    { number: 5, clue: 'A wild carnivorous mammal', direction: 'across', startRow: 4, startCol: 0, length: 3 },    // FOX
    { number: 6, clue: 'The fifth letter of the alphabet', direction: 'down', startRow: 4, startCol: 2, length: 1 } // E
  ];
  
  get acrossClues() {
    return this.clues.filter(clue => clue.direction === 'across');
  }

  get downClues() {
    return this.clues.filter(clue => clue.direction === 'down');
  }
}
