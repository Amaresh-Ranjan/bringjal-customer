import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-container-animation-info-section',
  standalone: true,
  imports: [LottieComponent, CommonModule],
  templateUrl: './container-animation-info-section.component.html',
  styleUrl: './container-animation-info-section.component.scss',
})
export class ContainerAnimationInfoSectionComponent {
  watercanCare = {
    heading: 'Special Care Of Watercan Containers',
    features: [
      {
        icon: 'bi bi-qr-code',
        color: 'text-info',
        title: 'QR code tracking of cans to prevent tampering',
        description:
          'Water can seal is great, however we want to go one more step ahead to prevent tampering of watercans in the supply chain, just like your two-factor authentication for your Gmail accounts.',
      },
      {
        icon: 'bi bi-recycle',
        color: 'text-warning',
        title: 'Deep cleaning of watercans',
        description:
          'Each watercan will be manually checked for any uncertainties and goes through rigorous cleaning process with internal/external pressure wash, hot water rinsing, and filtered water rinsing to make the container ready for the next refill.',
      },
      {
        icon: 'bi bi-shield-check',
        color: 'text-success',
        title: 'Safe Containers always',
        description:
          'We test the containers as per modes of conformity and duration of tests as per BIS, to provide you safe containers always.',
      },
      {
        icon: 'bi bi-qr-code-scan',
        color: 'text-primary',
        title: 'Scan to get assurance of quality',
        description:
          'Just scan the QR code present on the container or enter the code present on the watercan to get lab reports or basic parameters of the batch along with license details of the water manufacturing unit, expiry date, and batch number.',
      },
    ],
    cta: {
      icon: 'bi bi-arrow-right',
      text: 'Click here to know more about water can tracking',
    },
  };
  watercansOptions: AnimationOptions = {
    path: '/assets/animations/watercans.json',
  };
}
