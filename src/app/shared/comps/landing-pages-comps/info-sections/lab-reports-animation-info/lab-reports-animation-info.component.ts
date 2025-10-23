import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-lab-reports-animation-info',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './lab-reports-animation-info.component.html',
  styleUrl: './lab-reports-animation-info.component.scss'
})
export class LabReportsAnimationInfoComponent {
  labTechnicianOptions: AnimationOptions = {
    path: '/assets/animations/labTechnician.json',
  };
}
