import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-payment-animation-info-section',
  standalone: true,
  imports: [LottieComponent, CommonModule],
  templateUrl: './payment-animation-info-section.component.html',
  styleUrl: './payment-animation-info-section.component.scss',
})
export class PaymentAnimationInfoSectionComponent {
  constructor() {
    console.log('PaymentAnimationInfoSectionComponent', this.paymentOptions);
  }
  paymentOptions = {
    title: 'Pay Through Multiple Modes',
    paymentMethods: [
      {
        icon: 'bi bi-cash',
        color: 'text-success',
        title: 'Cash or UPI on delivery',
        description:
          'You can make payment via multiple UPI apps or through cash to our delivery executive. If exact change is not there for cash, not an issue. We will add extra amount to your wallet, which you can reuse for further orders.',
      },
      {
        icon: 'bi bi-wallet',
        color: 'text-info',
        title: 'Wallet Recharge',
        description:
          'Recharge your wallet via credit/debit card or UPI or Netbanking. Whenever you want to order a refill, if the amount is there in the wallet, it will auto-deduct from the wallet, and the order will get placed.',
      },
      {
        icon: 'bi bi-link',
        color: 'text-primary',
        title: 'Payment Links',
        description:
          'Not at home during delivery? No problem. We will send you the payment link, and you can pay via credit/debit card, UPI, or Netbanking.',
      },
    ],
    cta: {
      icon: 'bi bi-arrow-right',
      text: 'Click here to know more about how Bringjal Wallet will add value',
    },
  };
  paymentsOptions: AnimationOptions = {
    path: '/assets/animations/multimodePayment.json',
  };
}
