import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header-offer-section-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-offer-section-three.component.html',
  styleUrl: './header-offer-section-three.component.scss',
})
export class HeaderOfferSectionThreeComponent {
  // Define the items you want to display
  marqueeItems = [
    { emoji: '💧', text: 'Hydrate - BringJal', letters: 'BRNG' },
    { emoji: '🥤', text: 'Sip - BringJal', letters: 'CAN' },
    { emoji: '🌊', text: 'Quench - BringJal', letters: 'JAL' },
    { emoji: '🚰', text: 'Refresh - BringJal', letters: 'H2O' },
    { emoji: '🥃', text: 'Drink - BringJal', letters: 'WATER' },
    { emoji: '🧊', text: 'Satisfy - BringJal', letters: 'FRESH' },
    { emoji: '💦', text: 'Swig - BringJal', letters: 'PURE' },
    { emoji: '🥛', text: 'Consume - BringJal', letters: 'CLEAN' },
    { emoji: '💦', text: 'Gulp - BringJal', letters: 'THIRST' },
    { emoji: '🚰', text: 'Imbibe - BringJal', letters: 'HYDR' }
  ];
}
