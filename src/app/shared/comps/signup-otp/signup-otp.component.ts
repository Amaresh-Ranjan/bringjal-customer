import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { HomeUserServiceService } from '../../services/backendInteractionServices/home-user-service.service';
import { CookieStorageService } from '../../services/storageRelated/cookie-storage.service';


@Component({
  selector: 'app-signup-otp',
  standalone: true,
  imports: [
    NgOtpInputModule,
  ],
  templateUrl: './signup-otp.component.html',
  styleUrl: './signup-otp.component.scss'
})
export class SignupOtpComponent {
  errSignupOtp!: string; 
  dBtnSignupOtp: boolean = true;
  timeLeft: number = 30;
  interval: any;
  retry = false;
  dBtnretry: boolean = false;
  loader!: boolean;
  @Output() operationSuccess = new EventEmitter<any>();
  @Input() mobile!: string;
  @Input() userid!: string;
  otp!: string;
  _ResidentialUserService = inject(HomeUserServiceService);
  cookieStorage = inject(CookieStorageService);
 
  showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false })
  ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "43px",
      height: "37px",
    },
  };


  onOtpChange(value: string): void {
    console.log(value, typeof(value));
    if (/^\d{4}$/.test(value)) {
      console.log('Input value is valid.');
      this.otp = value;
    } else {
      console.log('Input value is not valid.');
    }
  }

  ngOnInit(): void {

     this.startTimer();
  }

  onSOtpSubmit() {
    this.dBtnSignupOtp = true;
    this.loader = true;
    this._ResidentialUserService.signupOtpSubmit(this.otp, this.userid, this.mobile).subscribe({
      next: (referral_amount_added) => {
        
        this.dBtnSignupOtp = false;
        var outputData = {
          success: true,
          referralAmount: referral_amount_added
        }
        console.log(outputData,)
        this.operationSuccess.emit(outputData);
      },
      error: (error) => {
        this.dBtnSignupOtp = false;
        this.loader = false;
        this.errSignupOtp = error.error.message;
      }
    });
  }

  // otp retry
  otpRetry() {
    this.dBtnretry = true;
    this.loader = true;
    //this.stopTimer();
    this.startTimer();
    this._ResidentialUserService.otpRetry(this.mobile).subscribe({
      next: () => {
        this.dBtnretry = false;
        this.loader = false;
      },
      error: (error) => {
        this.dBtnretry = false;
        this.loader = false;
        if (error.status === 403 || error.status === 500) {
          this.loader = false;
          this.errSignupOtp = error.error.error.message;
        }else{
          this.loader = false;
          this.errSignupOtp = error.error.error.message;
        }
      }
    });
  }

  startTimer() {
    this.retry = false;
    this.timeLeft = 30;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.retry = true;
        this.timeLeft = 30;
        return;
      }
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.interval);
    this.timeLeft = 0;
  }

  ngOnDestroy() {
    this.retry = false;
    this.timeLeft = 30;
  }

}
