import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CrosswordGridComponent } from './crossword/crossword-grid/crossword-grid.component';
import { ClueListComponent } from './clue-list/clue-list.component';
import { WordleBoardComponent } from './wordle/wordle-board/wordle-board.component';
import { MenuComponent } from './menu/menu.component'; // New menu component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crossword-app';
}

// Define the routes
export const routes: Routes = [
  { path: '', component: MenuComponent }, // Default route is the menu
  { path: 'crossword', component: CrosswordGridComponent }, // Crossword game route
  { path: 'wordle', component: WordleBoardComponent }, // Wordle game route
];

