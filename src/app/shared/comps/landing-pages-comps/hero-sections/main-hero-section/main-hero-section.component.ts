import { Component, inject } from '@angular/core';
import { DataLayerService } from '../../../../services/common/data-layer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackgroundEffectComponent } from "../../../../background-effects/background-effect/background-effect.component";

@Component({
  selector: 'app-main-hero-section',
  standalone: true,
  imports: [CommonModule, BackgroundEffectComponent],
  templateUrl: './main-hero-section.component.html',
  styleUrl: './main-hero-section.component.scss'
})
export class MainHeroSectionComponent {

  private _dataLayerService = inject(DataLayerService); 
  private router = inject(Router);
  buttonOfInterestClicked(){
    //call the service's logEvent method
    console.log("buttonsad of interest clicked");
    this._dataLayerService.logEvent("'ButtonClicked'","'Buttons'","'Clicked'","'InterestingButton'");
    this.router.navigate(['/india/book-bringjal-watercan']);


     // continue with logic for what needs to be done in this method.
   }
}
