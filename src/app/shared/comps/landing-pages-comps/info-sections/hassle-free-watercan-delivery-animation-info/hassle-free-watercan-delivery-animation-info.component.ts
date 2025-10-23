import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-hassle-free-watercan-delivery-animation-info',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './hassle-free-watercan-delivery-animation-info.component.html',
  styleUrl: './hassle-free-watercan-delivery-animation-info.component.scss'
})
export class HassleFreeWatercanDeliveryAnimationInfoComponent {
  deliveryOptions: AnimationOptions = {
    path: '/assets/animations/delivery.json',
  };

  whatsappOptions: AnimationOptions = {
    path: '/assets/animations/whatsapp.json',
  };
}
