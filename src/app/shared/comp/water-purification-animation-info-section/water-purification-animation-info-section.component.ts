import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-water-purification-animation-info-section',
  standalone: true,
  imports: [LottieComponent, CommonModule],
  templateUrl: './water-purification-animation-info-section.component.html',
  styleUrl: './water-purification-animation-info-section.component.scss',
})
export class WaterPurificationAnimationInfoSectionComponent {
  constructor() {
    console.log('Water Purification Data:', this.waterPurification);
  }
  waterPurification = {
    title: 'Multi Stage Water Purification To Bring Best Jal',
    stages: [
      {
        icon: 'bi bi-droplet',
        color: 'text-blue-400',
        title: 'Fixed source of raw water',
        description:
          'We make sure that our manufacturing plant has enough resource of ground water, which goes 15+ quality tests at regular interval.',
      },
      {
        icon: 'bi bi-filter',
        color: 'text-green-400',
        title: 'Various Filteration stages',
        description:
          'Each water droplet passes through Carbon filter, Sand Filter, Micron-filteration, Reverse Osmosis to eliminate odour, colour, unwanted particles and excess minerals.',
      },
      {
        icon: 'bi bi-sun',
        color: 'text-yellow-400',
        title: 'Ultra violet Treatment & Ozonisation',
        description:
          'Ozonisation and UV treatment to kill the harmful bacteria and to stop its multiplication, thereby maintaining quality in sealed condition.',
      },
      {
        icon: 'bi bi-capsule',
        color: 'text-purple-400',
        title: 'Mineralisation',
        description:
          'For enhancing the taste and to make sure that essential mineral salts in water are retained, we include the process of mineralisation.',
      },
    ],
    cta: {
      icon: 'bi-arrow-right',
      text: 'Click here to know more about Water Purification',
    },
  };
  waterPurificationOptions: AnimationOptions = {
    path: '/assets/animations/waterPurification.json',
  };
}
