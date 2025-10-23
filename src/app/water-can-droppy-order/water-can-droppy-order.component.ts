import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { HeroSectionOneComponent } from '../shared/comps/landing-pages-comps/hero-sections/hero-section-one/hero-section-one.component';
import { HeroSectionTwoComponent } from '../shared/comps/landing-pages-comps/hero-sections/hero-section-two/hero-section-two.component';
import { HeroSectionThreeComponent } from '../shared/comps/landing-pages-comps/hero-sections/hero-section-three/hero-section-three.component';
import { HeaderOfferSectionOneComponent } from '../shared/comps/landing-pages-comps/header-offers/header-offer-section-one/header-offer-section-one.component';
import { HeaderOfferSectionTwoComponent } from '../shared/comps/landing-pages-comps/header-offers/header-offer-section-two/header-offer-section-two.component';
import { HeaderOfferSectionThreeComponent } from '../shared/comps/landing-pages-comps/header-offers/header-offer-section-three/header-offer-section-three.component';
import { FooterSectionOneComponent } from '../shared/comps/landing-pages-comps/footer-buttons/footer-section-one/footer-section-one.component';
import { FooterSectionThreeComponent } from '../shared/comps/landing-pages-comps/footer-buttons/footer-section-three/footer-section-three.component';
import { FooterSectionTwoComponent } from '../shared/comps/landing-pages-comps/footer-buttons/footer-section-two/footer-section-two.component';
import { CardSectionTwoComponent } from '../shared/comps/landing-pages-comps/cards-sections/card-section-two/card-section-two.component';
import { CardSectionThreeComponent } from '../shared/comps/landing-pages-comps/cards-sections/card-section-three/card-section-three.component';
import { CardSectionOneComponent } from '../shared/comps/landing-pages-comps/cards-sections/card-section-one/card-section-one.component';
import {
  NgbModal,
  NgbOffcanvas,
  NgbOffcanvasRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-water-can-droppy-order',
  standalone: true,
  imports: [
    HeroSectionOneComponent,
    HeroSectionTwoComponent,
    HeroSectionThreeComponent,
    HeaderOfferSectionOneComponent,
    HeaderOfferSectionTwoComponent,
    HeaderOfferSectionThreeComponent,
    FooterSectionOneComponent,
    FooterSectionThreeComponent,
    FooterSectionTwoComponent,
    CardSectionTwoComponent,
    CardSectionThreeComponent,
    CardSectionOneComponent,
    FormsModule,
  ],
  templateUrl: './water-can-droppy-order.component.html',
  styleUrl: './water-can-droppy-order.component.scss',
})
export class WaterCanDroppyOrderComponent {
  mainHeading!: string;
  couponSection: boolean = false;
  couponCode: string = '';
  showModal: boolean = false;
  showToast: boolean = false;
  showGif: boolean = false;
  @ViewChild('content') content!: TemplateRef<any>;
  private offcanvasRef!: NgbOffcanvasRef;
  private modalService = inject(NgbModal);
  constructor(private offcanvasService: NgbOffcanvas) { }

  ngOnInit() {
    setTimeout(() => {
      this.openBottom();
    }, 5000);
  }
  // Cookies Model Function
  openBottom() {
    if (this.content) {
      this.offcanvasRef = this.offcanvasService.open(this.content, {
        position: 'bottom',
        backdrop: 'static',
        keyboard: false,
        backdropClass: 'bg-dark',
      });
    }
  }

  acceptCookies() {
    localStorage.setItem('acceptCookies', 'true');
    this.offcanvasRef.dismiss();
    console.log('cookies accepted');
  }

  rejectCookies() {
    localStorage.setItem('acceptCookies', 'false');
    this.offcanvasRef.dismiss();
    console.log('cookies rejected');
  }
  // Apply Coupon Code Model Function
  // openVerticallyCentered(contentCouponModel: TemplateRef<any>) {
  //   this.showGif = true;
  //   setTimeout(() => {
  //     this.showGif = false;
  //     const modalRef = this.modalService.open(contentCouponModel, {
  //       centered: true,
  //       backdrop: 'static',
  //       keyboard: false,
  //       backdropClass: 'bg-dark',
  //     });
  //     modalRef.componentInstance.couponCode = this.couponCode;
  //   }, 0);
  //   setTimeout(() => {
  //     this.couponSection = true;
  //   }, 1000);
  // }
  // Dummy validation function
  validateCoupon(code: string): boolean {
    // Replace with actual validation logic
    const validCoupons = ['DISCOUNT10', 'SAVE20']; // Example valid coupons
    return validCoupons.includes(code);
  }

  @ViewChild('successModal', { static: true }) successModal!: TemplateRef<any>;
  @ViewChild('errorModal', { static: true }) errorModal!: TemplateRef<any>;
  applyCoupon() {
    if (this.validateCoupon(this.couponCode)) {
      this.openModal(this.successModal);
      setTimeout(() => {
        this.couponSection = true;
      }, 1000);
    } else {
      this.openModal(this.errorModal);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.showGif = true;
    setTimeout(() => {
      this.showGif = false;
      const modalRef = this.modalService.open(template, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
        backdropClass: 'bg-dark',
      });
      modalRef.componentInstance.couponCode = this.couponCode;
    }, 0);
  }
  // Quantity
  quantity: number = 2; // Default quantity set to 2
  minQuantity: number = 2; // Minimum allowed quantity
  maxQuantity: number = 100; // Maximum allowed quantity
  selectedDays:any = {
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  };
  paymentFrequency: string = '';

  // Method to handle increment
  increment() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  // Method to handle decrement
  decrement() {
    if (this.quantity > this.minQuantity) {
      this.quantity--;
    }
  }

  // Method to handle quantity input change
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (value >= this.minQuantity && value <= this.maxQuantity) {
      this.quantity = value;
    }
  }

  // Method to handle day change
  onDayChange(day: string, isChecked: boolean) {
    this.selectedDays[day] = isChecked;
    console.log('Selected Days:', this.selectedDays); // For debugging purposes
  }

  // Method to handle frequency change
  onFrequencyChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.paymentFrequency = select.value;
  }

  // Method to handle form submission
  onSubmit() {
    const formData = {
      quantity: this.quantity,
      selectedDays: this.selectedDays,
      paymentFrequency: this.paymentFrequency,
    };
    console.log('Form Submitted:', formData);
  }
}
