import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from '../shared/comps/footer/footer.component';

@Component({
  selector: 'app-enterprise-landing',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, FooterComponent],
  templateUrl: './enterprise-landing.component.html',
  styleUrl: './enterprise-landing.component.scss',
})
export class EnterpriseLandingComponent {
  userSubscribed: boolean = false;
  images: any;
  constructor() { }
  ngOnInit(): void {
    let images = [
      {
        src: '../../assets/icons/Enterprise/logo-adobe.png',
        alt: 'logo-adobe'
      },
      {
        src: '../../assets/icons/Enterprise/logo-google.png',
        alt: 'logo-google'
      },
      {
        src: '../../assets/icons/Enterprise/logo-paypal.png',
        alt: 'logo-paypal'
      },
      {
        src: '../../assets/icons/Enterprise/logo-puma.png',
        alt: 'logo-puma'
      }
    ];

    this.images = images;

    console.log("🚀 ----------------------------------------------------------------------------------------------------------🚀");
    console.log("🚀 ~ file: enterprise-landing.component.ts:39 ~ EnterpriseLandingComponent ~ ngOnInit ~ images:-- ", this.images);
    console.log("🚀 ----------------------------------------------------------------------------------------------------------🚀");


  }
}
