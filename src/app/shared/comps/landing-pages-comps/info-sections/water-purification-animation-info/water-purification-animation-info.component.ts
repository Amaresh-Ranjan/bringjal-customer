import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-water-purification-animation-info',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './water-purification-animation-info.component.html',
  styleUrl: './water-purification-animation-info.component.scss'
})
export class WaterPurificationAnimationInfoComponent {
  waterPurificationOptions: AnimationOptions = {
    path: '/assets/animations/waterPurification.json',
  };
}
