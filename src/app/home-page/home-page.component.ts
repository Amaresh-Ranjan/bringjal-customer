import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../shared/comps/footer/footer.component';
import { HeaderComponent } from '../shared/comps/header/header.component';
import { Meta, Title } from '@angular/platform-browser';
import { OverlayCardInfoComponent } from '../shared/comps/landing-pages-comps/info-sections/overlay-card-info/overlay-card-info.component';
import { ProcessInfoComponent } from '../shared/comps/landing-pages-comps/info-sections/process-info/process-info.component';
import { LabReportsAnimationInfoComponent } from '../shared/comps/landing-pages-comps/info-sections/lab-reports-animation-info/lab-reports-animation-info.component';
import { DeviceAnimationInfoComponent } from '../shared/comps/landing-pages-comps/info-sections/device-animation-info/device-animation-info.component';
import { HassleFreeWatercanDeliveryAnimationInfoComponent } from '../shared/comps/landing-pages-comps/info-sections/hassle-free-watercan-delivery-animation-info/hassle-free-watercan-delivery-animation-info.component';
import { PaymentAnimationInfoComponent } from '../shared/comps/landing-pages-comps/info-sections/payment-animation-info/payment-animation-info.component';
import { WaterPurificationAnimationInfoComponent } from '../shared/comps/landing-pages-comps/info-sections/water-purification-animation-info/water-purification-animation-info.component';
import { ContainerAnimationInfoComponent } from '../shared/comps/landing-pages-comps/info-sections/container-animation-info/container-animation-info.component';
import { UserReviewsFirstComponent } from '../shared/comps/landing-pages-comps/info-sections/user-reviews-first/user-reviews-first.component';
import { SlantPriceComponent } from '../shared/comps/landing-pages-comps/info-sections/slant-price/slant-price.component';
import { CheckBoxComponent } from '../shared/comps/landing-pages-comps/info-sections/check-box/check-box.component';
import { FloatingCanComponent } from '../shared/comps/landing-pages-comps/info-sections/floating-can/floating-can.component';
import { MainHeroSectionComponent } from '../shared/comps/landing-pages-comps/hero-sections/main-hero-section/main-hero-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    MainHeroSectionComponent,
    OverlayCardInfoComponent,
    ProcessInfoComponent,
    LabReportsAnimationInfoComponent,
    DeviceAnimationInfoComponent,
    HassleFreeWatercanDeliveryAnimationInfoComponent,
    PaymentAnimationInfoComponent,
    WaterPurificationAnimationInfoComponent,
    ContainerAnimationInfoComponent,
    UserReviewsFirstComponent,
    SlantPriceComponent,
    CheckBoxComponent,
    FloatingCanComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  isMenuCollapsed = true;
  searchAddress: string|any;
  latLng: any;
  disableBtn: boolean|any;

  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle(
      'Drinking Water Can Delivery Service Online At Best Price For Home And Offices'
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Doorstep Water can delivery of 20 litre drinking water bottle online service for home and offices near you. We provide our own brand Bringjal 20 liter water which is on par with bisleri 20, kinley,Aquafina mineral water delivery service',
    });

    // console.log("before afterNextRender");
    // afterNextRender(() => {
    //   console.log("after afterNextRender");
    //   if(this.cookieStorageService.get('testCookie')){
    //     console.log("in if file changed to check cookie", this.cookieStorageService.get('testCookie'))
    //   }else{

    //     this.cookieStorageService.set('testCookie', 'bringjal cookie', 1652);
    //     console.log("in else file changed to check cookie")
    //   }

    // });
  }

  ngOnInit(): void {}
}
