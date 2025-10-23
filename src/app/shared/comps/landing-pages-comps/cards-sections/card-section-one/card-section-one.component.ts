import { Component } from '@angular/core';

@Component({
  selector: 'app-card-section-one',
  standalone: true,
  imports: [],
  templateUrl: './card-section-one.component.html',
  styleUrl: './card-section-one.component.scss'
})
export class CardSectionOneComponent {
  openModels!: boolean
  openModal() {
    this.openModels = !this.openModels
  }
}
