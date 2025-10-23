import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-info-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-info-section.component.html',
  styleUrl: './process-info-section.component.scss',
})
export class ProcessInfoSectionComponent implements OnInit {
  steps = [
    {
      title: 'Select your package',
      description:
        'Select the water can brand of your choice and pay the refundable deposit.',
      image:
        'https://res.cloudinary.com/dug99qncm/image/upload/dpr_auto,f_auto,q_auto:low/v1554769126/website/water_can_20_ltr_package.png',
    },
    {
      title: 'DropPy installation',
      description:
        'Our team will install DropPy and help you with the on-boarding process.',
      image:
        'https://res.cloudinary.com/dug99qncm/image/upload/dpr_auto,f_auto,q_auto:low/v1554769127/website/bringjal_water_can_device_installation.png',
    },
    {
      title: 'Press to order',
      description: 'A press on DropPy is all it takes to order your water can.',
      image:
        'https://res.cloudinary.com/dug99qncm/image/upload/dpr_auto,f_auto,q_auto:low/v1554769127/website/order_water_can_with_a_press.png',
    },
    {
      title: 'Get it delivered',
      description: 'Hassle-free water cans delivery to your doorstep.',
      image:
        'https://res.cloudinary.com/dug99qncm/image/upload/dpr_auto,f_auto,q_auto:low/v1554769127/website/water_can_delivery_online.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
