import { Component, inject } from '@angular/core';
import { BackgroundEffectComponent } from '../shared/background-effects/background-effect/background-effect.component';
import { MainHeroTypeWriterSectionComponent } from '../shared/comp/main-hero-type-writer-section/main-hero-type-writer-section.component';
import { CheckBoxSectionComponent } from '../shared/comp/check-box-section/check-box-section.component';
import { FloatingCanSectionComponent } from '../shared/comp/floating-can-section/floating-can-section.component';
import { SlantPriceSectionComponent } from '../shared/comp/slant-price-section/slant-price-section.component';
import { UserReviewsFirstSectionComponent } from '../shared/comp/user-reviews-first-section/user-reviews-first-section.component';
import { LabReportsAnimationSectionComponent } from '../shared/comp/lab-reports-animation-section/lab-reports-animation-section.component';
import { DeviceAnimationInfoSectionComponent } from '../shared/comp/device-animation-info-section/device-animation-info-section.component';
import { HassleFreeWatercanDeliveryAnimationInfoSectionComponent } from '../shared/comp/hassle-free-watercan-delivery-animation-info-section/hassle-free-watercan-delivery-animation-info-section.component';
import { WaterPurificationAnimationInfoSectionComponent } from '../shared/comp/water-purification-animation-info-section/water-purification-animation-info-section.component';
import { ContainerAnimationInfoSectionComponent } from '../shared/comp/container-animation-info-section/container-animation-info-section.component';
import { PaymentAnimationInfoSectionComponent } from '../shared/comp/payment-animation-info-section/payment-animation-info-section.component';
import { ProcessInfoSectionComponent } from '../shared/comp/process-info-section/process-info-section.component';
import { OverlayCardInfoSectionComponent } from '../shared/comp/overlay-card-info-section/overlay-card-info-section.component';
import { FooterSectionComponent } from '../shared/comp/footer-section/footer-section.component';
import { HeaderSectionComponent } from '../shared/comp/header-section/header-section.component';
import { ModalService } from '../shared/services/common/modal.service';
import { CommonModule } from '@angular/common';
import { LoginSignupModalSectionComponent } from '../shared/comp/login-signup-modal-section/login-signup-modal-section.component';
import { UserSotrageService } from '../shared/services/storageRelated/user-sotrage.service';
import { Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { UserReviewsSection } from "../shared/comp/user-reviews-section/user-reviews-section";

@Component({
  selector: 'app-home-section',
  standalone: true,
  imports: [
    BackgroundEffectComponent,
    MainHeroTypeWriterSectionComponent,
    CheckBoxSectionComponent,
    FloatingCanSectionComponent,
    SlantPriceSectionComponent,
    UserReviewsFirstSectionComponent,
    LabReportsAnimationSectionComponent,
    DeviceAnimationInfoSectionComponent,
    HassleFreeWatercanDeliveryAnimationInfoSectionComponent,
    WaterPurificationAnimationInfoSectionComponent,
    ContainerAnimationInfoSectionComponent,
    PaymentAnimationInfoSectionComponent,
    ProcessInfoSectionComponent,
    OverlayCardInfoSectionComponent,
    FooterSectionComponent,
    HeaderSectionComponent,
    CommonModule,
    LoginSignupModalSectionComponent,
    UserReviewsSection
],
  templateUrl: './home-section.component.html',
  styleUrl: './home-section.component.scss',
})
export class HomeSectionComponent {
  userStorage=inject(UserSotrageService)
  router=inject(Router)
  cookieStorage=inject(SsrCookieService)
  ngOnInit(){
    var userToken = this.cookieStorage.get('__bringjal_user_token');
    var userData:any = this.cookieStorage.get('userData');
    if(userData){
      userData=JSON.parse(userData);
    }
    if (userToken && userData?.status?.subscribed === true) {
      this.router.navigate(['india/dashboard']);
    }
  }
}
