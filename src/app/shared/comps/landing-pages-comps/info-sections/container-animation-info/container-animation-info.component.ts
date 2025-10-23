import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-container-animation-info',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './container-animation-info.component.html',
  styleUrl: './container-animation-info.component.scss',
})
export class ContainerAnimationInfoComponent {
  watercansOptions: AnimationOptions = {
    path: '/assets/animations/watercans.json',
  };
}
