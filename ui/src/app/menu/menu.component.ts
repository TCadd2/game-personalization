import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WordleSharedService } from '../wordle/wordle-shared.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule], // For linking to routes
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router, private wordleSharedService: WordleSharedService) {}

  // Method to handle game selection and navigation
  selectGame(game: string) {
    this.wordleSharedService.setSelectedGame(game);  // Set the selected game
    this.router.navigate(['/topic-selection']);  // Navigate to topic selection for Wordle
 
  }
}
