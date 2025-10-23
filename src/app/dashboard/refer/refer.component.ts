import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FooterSectionComponent } from '../../shared/comp/footer-section/footer-section.component';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';
import { RelativeDatePipe } from '../../shared/pipes/luxondate.pipe';

@Component({
  selector: 'app-refer',
  standalone: true,
  imports: [FooterSectionComponent,CustomLoaderComponent,RelativeDatePipe],
  templateUrl: './refer.component.html',
  styleUrl: './refer.component.scss',
})
export class ReferComponent {
  private cdr = inject(ChangeDetectorRef);
  private userStorage = inject(UserSotrageService);
  private destroyRef = inject(DestroyRef);
  userData: any;
  referralCode: string | any;
  referralTransactions:any=[]
  whatsappString: string | any;
  emailString: string | any;
  loaderEnable = signal<boolean>(false);
  totalCount: number = 0;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private homeService: HomeUserServiceService
) {
    if (isPlatformBrowser(this.platformId)) {
       this.loaderEnable.update(() => true);
      const subscription = this.userStorage.getUser.subscribe({
        next: (user) => {
          if (user) {
            this.userData = user;
            this.referralCode = this.userData.referral.code;
            console.log('userdata:', this.userData);
            this.whatsappString =
              'https://api.whatsapp.com/send?text=Get 100 on signup. Register with BringJal using referral code: ' +
              this.referralCode +
              'and experience premium quality water. Signup at https://www.bringjal.com/signup/' +
              this.referralCode;
            this.emailString =
              'mailto:?subject=Get 100 on signup&amp;body=Register with BringJal using referral code: ' +
              this.referralCode +
              ' and experience premium quality water. Signup at https://www.bringjal.com/signup/' +
              this.referralCode;
              this.getReferralTransaction()
          }
        },
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

getReferralTransaction(){
    if(this.userData){
    this.homeService.getReferralTransaction(this.userData._id,this.referralTransactions.length,4).subscribe({
      next: (resData:any) => {
        console.log('data post order placement:', resData);
        this.totalCount = resData.totalCount
        this.referralTransactions = this.referralTransactions.concat(resData.data);
        console.log('this.referralTransactions:', this.referralTransactions);
          this.loaderEnable.update(() => false);
      },
      error: (err) => {
        console.log(err)
          this.loaderEnable.update(() => false);
      }
    })
  }
  }
  
  copieText: boolean = false;
  private copyTimeout: any;

  copyCode() {
    // Clear any existing timeout
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }

    // Show the success message
    this.copieText = true;
    
    // Copy the referral code to clipboard
    navigator.clipboard.writeText(this.referralCode);
    
    // Set timeout to hide the message after 2 seconds
    this.copyTimeout = setTimeout(() => {
      this.copieText = false;
      this.cdr.detectChanges();
    }, 2000);
    
    this.cdr.detectChanges();
  }
}
