import { AfterViewInit, Component, Input } from '@angular/core';
import Typewriter from 'typewriter-effect/dist/core';
import { BackgroundEffectComponent } from "../../../../background-effects/background-effect/background-effect.component";

@Component({
  selector: 'app-hero-section-one',
  standalone: true,
  imports: [BackgroundEffectComponent],
  templateUrl: './hero-section-one.component.html',
  styleUrl: './hero-section-one.component.scss',
})
export class HeroSectionOneComponent implements AfterViewInit {
  @Input() mainHeading!: String;
  @Input() animationArray!: String[];

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
