import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Typewriter from 'typewriter-effect/dist/core';
import { DataLayerService } from '../../services/common/data-layer.service';

@Component({
  selector: 'app-main-hero-type-writer-section',
  standalone: true,
  templateUrl: './main-hero-type-writer-section.component.html',
  styleUrl: './main-hero-type-writer-section.component.scss',
  imports: [],
})
export class MainHeroTypeWriterSectionComponent {
  private _dataLayerService = inject(DataLayerService);
  private router = inject(Router);
  buttonOfInterestClicked() {
    //call the service's logEvent method
    console.log('buttonsad of interest clicked');
    this._dataLayerService.logEvent(
      "'ButtonClicked'",
      "'Buttons'",
      "'Clicked'",
      "'InterestingButton'"
    );
    this.router.navigate(['/india/book-bringjal-watercan']);
  }
  ngAfterViewInit() {
    const element = document.querySelector('#typewriter') as HTMLElement;
    if (element) {
      new Typewriter(element, {
        strings: [
          'Innovation',
          'Growth',
          'Success',
          'Water',
          'Efficiency',
          'Sustainability',
          'Trust',
          'Impact',
          'Quality',
          'Leadership',
        ],
        autoStart: true,
        loop: true,
        delay: 25,
        deleteSpeed: 10,
        // cursorClassName: 'typewriter-cursor'
      });
    }
  }
}
