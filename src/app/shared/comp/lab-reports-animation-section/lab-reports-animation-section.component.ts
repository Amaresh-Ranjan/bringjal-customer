import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-lab-reports-animation-section',
  standalone: true,
  imports: [LottieComponent, CommonModule],
  templateUrl: './lab-reports-animation-section.component.html',
  styleUrl: './lab-reports-animation-section.component.scss',
})
export class LabReportsAnimationSectionComponent {
  constructor() {
    console.log('Quality Data:', this.qualityData);
  }
  qualityData = {
    title: '100+ Quality Checks',
    subtitle: 'Ensuring Premium Water Quality, Always',
    checks: [
      {
        icon: 'bi-droplet-fill',
        color: 'text-blue-400',
        title: 'Raw Water Source Testing',
        frequency: '15 tests every 3 months',
        description:
          'We conduct several tests on color, PH, turbidity, TDS etc which determines taste and colour of water along with tests for detecting Micro-Organisms like E coli and cloriforms or excess of parameters like Chloride, Sulphate, Nitrate etc.',
      },
      {
        icon: 'bi-shield-check',
        color: 'text-green-400',
        title: 'Daily Water Analysis',
        frequency: '16 tests daily',
        description:
          'Various Organoleptic & Physical Parameters Test, along with 6 Microbiological requirement tests to ensure the specified micro-organisms are within specifications are conducted for each batch.',
      },
      {
        icon: 'bi-radioactive',
        color: 'text-yellow-400',
        title: 'Radioactive Testing',
        frequency: '2 specialized tests every 5 years',
        description:
          'Tests to determine presence of harmful radio active residues Alpha & Beta Emitters in water.',
      },
      {
        icon: 'bi-flower1',
        color: 'text-purple-400',
        title: 'Pesticide Screening',
        frequency: '16+ tests every 6 months',
        description:
          'Tests to determine presence of 16+ Pesticides Residues in water.',
      },
      {
        icon: 'bi-exclamation-triangle',
        color: 'text-red-400',
        title: 'Toxic Substance Monitoring',
        frequency: '9 tests every 6 months',
        description:
          'Tests to determine presence of toxic substances like Mercury, Cadmium, Arsenic, Cyanide, Bromates etc in water.',
      },
    ],
    cta: {
      text: 'Learn More About Our Quality Standards',
      icon: 'bi-arrow-right',
    },
  };
  labTechnicianOptions: AnimationOptions = {
    path: '/assets/animations/labTechnician.json',
  };
}
