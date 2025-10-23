import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-device-animation-info-section',
  standalone: true,
  imports: [LottieComponent, CommonModule],
  templateUrl: './device-animation-info-section.component.html',
  styleUrl: './device-animation-info-section.component.scss'
})
export class DeviceAnimationInfoSectionComponent {
  constructor() {
    console.log('Device Data:', this.deviceData);
  }

  deviceData = {
    title: 'Just Press To Order On DropPy!!',
    features: [
      {
        icon: 'bi-currency-rupee',
        color: 'text-green-400',
        title: '₹1600/- worth device absolutely free',
        description: 'We collect a small deposit amount for DropPy, which will be returned no questions asked if you choose to discontinue our service. Thus making DropPy absolutely free of cost.'
      },
      {
        icon: 'bi-lightbulb',
        color: 'text-yellow-400',
        title: 'Simplicity at its core',
        description: 'We all hate user manuals, so we have designed DropPy to make sure that you will not require one. Working Wi-Fi connection is all you need from your side.'
      },
      {
        icon: 'bi-tools',
        color: 'text-blue-400',
        title: 'Free maintenance and servicing',
        description: 'All the cost with respect to DropPy, be it installation, maintenance or service is free. Though DropPy is very robust, any problems which you will encounter will be addressed by our service team, free of cost.'
      }
    ],
    cta: {
      text: 'Click here to know more about DropPy',
      icon: 'bi-arrow-right'
    }
  };

  wifiOptions: AnimationOptions = {
    path: '/assets/animations/droppyWifi.json',
  };
}
