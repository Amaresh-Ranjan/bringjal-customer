import {
  Component,
  DestroyRef,
  Inject,
  inject,
  PLATFORM_ID,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { RelativeDatePipe } from '../../shared/pipes/luxondate.pipe';
import { FooterSectionComponent } from '../../shared/comp/footer-section/footer-section.component';
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposits',
  standalone: true,
  imports: [
    CommonModule,
    RelativeDatePipe,
    CustomLoaderComponent,
    FooterSectionComponent,
  ],
  templateUrl: './deposits.component.html',
  styleUrl: './deposits.component.scss',
})
export class DepositsComponent {
  loaderEnable: boolean = true;
  previousTransactions:any = [];
  index: any;
  deposit: any;
  userData:any
  homeService = inject(HomeUserServiceService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loaderEnable = true;
    if (isPlatformBrowser(this.platformId)) {
        let subscription = this.homeService
        .fetchUserDetailsUsingId()
        .subscribe({
          next: (data) => {
            this.userData = data.data;
            console.log('this.userData:', this.userData);
            

       subscription = this.homeService.getDeposits().subscribe({
        next: (data: any) => {
          console.log('deposits data : ', data);
          this.deposit = data.data;
          this.homeService.getDepositTransactions().subscribe((data: any) => {
            console.log('deposit transactions : ', data);
            this.previousTransactions = data.data;
            this.loaderEnable = false;
          });
        },
        error: (error: any) => {
          console.error('Error in fetching deposits : ', error);
          this.loaderEnable = false;
        },
      });
      },
      error:(error)=>{
console.log(error)
 this.loaderEnable = false;
      }
    });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

   goToProductSelectionPage() {
    this.router.navigate(['/india/book-bringjal-watercan']);
  }
  activeSegment: string = 'depositTransactionsHistory'; // Default to 'segment1'

  setActiveSegment(segment: string) {
    this.activeSegment = segment;
  }
}
