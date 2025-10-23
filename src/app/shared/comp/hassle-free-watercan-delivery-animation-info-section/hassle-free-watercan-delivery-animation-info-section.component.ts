import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-hassle-free-watercan-delivery-animation-info-section',
  standalone: true,
  imports: [LottieComponent, CommonModule],
  templateUrl:
    './hassle-free-watercan-delivery-animation-info-section.component.html',
  styleUrl:
    './hassle-free-watercan-delivery-animation-info-section.component.scss',
})
export class HassleFreeWatercanDeliveryAnimationInfoSectionComponent {
  deliveryData = {
    title: 'Hassle Free Watercan Delivery Always',
    features: [
      {
        icon: 'bi bi-phone',
        color: 'text-green-400',
        title: 'Order your next refill in various ways',
        description:
          'No more apps or calls to order your next set of refills. Only press on DropPy or order via Chatbot by just sending hi on whatsapp. We will fetch your address from database and arrange the delivery with your preselected quantity.',
      },
      {
        icon: 'bi bi-house-door',
        color: 'text-blue-400',
        title: 'Not at home during delivery, No problem',
        description:
          'You can keep empty containers outside the door and we will replace them with filled containers and send the payment link post delivery if any pending amount is there.',
      },
      {
        icon: 'bi bi-truck',
        color: 'text-yellow-400',
        title: 'Adoption of EV cargo vehicles to reduce carbon footprint',
        description:
          'We are changing our last mile delivery fleet to Electric vehicles, which helps to reduce carbon emission to greater extent. 99% of our deliveries are using closed containers to avoid sunlight exposure of water containers.',
      },
      {
        icon: 'bi bi-headset',
        color: 'text-purple-400',
        title: 'Customer support always at fingertips',
        description:
          'Have issues with delivery service or any other issue all it needs us a hi on whatsapp, our chatbot will collect all the necessary information and get back with resolution.',
      },
    ],
    cta: {
      text: 'Click here to know more about Delivery',
      icon: 'bi bi-arrow-right',
    },
  };

  deliveryOptions: AnimationOptions = {
    path: '/assets/animations/delivery.json',
  };

  whatsappOptions: AnimationOptions = {
    path: '/assets/animations/whatsapp.json',
  };
}
