import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-device-animation-info',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './device-animation-info.component.html',
  styleUrl: './device-animation-info.component.scss'
})
export class DeviceAnimationInfoComponent {
  wifiOptions: AnimationOptions = {
    path: '/assets/animations/droppyWifi.json',
  };
}
