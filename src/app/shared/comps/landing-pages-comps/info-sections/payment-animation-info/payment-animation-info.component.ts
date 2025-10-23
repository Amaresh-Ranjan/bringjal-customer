import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-payment-animation-info',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './payment-animation-info.component.html',
  styleUrl: './payment-animation-info.component.scss'
})
export class PaymentAnimationInfoComponent {
  paymentsOptions: AnimationOptions = {
    path: '/assets/animations/multimodePayment.json',
  };
}
