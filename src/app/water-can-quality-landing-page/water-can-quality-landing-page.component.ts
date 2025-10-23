import { CommonModule } from '@angular/common';
import { afterNextRender, AfterViewInit, Component } from '@angular/core';
import Typewriter from 'typewriter-effect/dist/core';

@Component({
  selector: 'app-water-can-quality-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './water-can-quality-landing-page.component.html',
  styleUrl: './water-can-quality-landing-page.component.scss',
})
export class WaterCanQualityLandingPageComponent implements AfterViewInit {
  // Header Section 1
  headerSection1!: boolean;
  constructor() { }
  //
  categoryContent!: boolean;
  categoryCards() {
    this.categoryContent = !this.categoryContent;
  }
  //
  ngOnInit(): void {
    afterNextRender(() => {
    });
  }
  ngAfterViewInit() {
    new Typewriter('#typewriter', {
      strings: [
        'It will loop through all texts.',
        'Change speed or style if needed.',
        'Hello World!',
        'Welcome to Angular!',
        'Enjoy the Typewriter Effect!',
        'You can add more texts.',
        'Customize it as you like.',
        'It will loop through all texts.',
        'Change speed or style if needed.',
        'Make sure it fits your design.',
        'Feel free to experiment!',
        'Have fun with Angular!'
      ],
      autoStart: true,
      loop: true,
      delay: 25,
      deleteSpeed: 10,
      cursorClassName: 'typewriter-cursor'
    });
  }
}
