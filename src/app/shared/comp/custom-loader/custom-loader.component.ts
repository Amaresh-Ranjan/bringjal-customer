import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-custom-loader',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './custom-loader.component.html',
  styleUrl: './custom-loader.component.scss',
})
export class CustomLoaderComponent {
  options: AnimationOptions = {
    path: '/assets/animations/waterDrop.json',
  };
}
