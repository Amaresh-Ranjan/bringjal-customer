import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { HomeUserServiceService } from '../../../../services/backendInteractionServices/home-user-service.service';
import { CustomLoaderComponent } from '../../../custom-loader/custom-loader.component';
@Component({
  selector: 'app-forgotpassword-otp',
  standalone: true,
  imports: [CommonModule, NgOtpInputModule,CustomLoaderComponent],
  templateUrl: './forgotpassword-otp.component.html',
  styleUrl: './forgotpassword-otp.component.scss',
})
export class ForgotpasswordOtpComponent {
  errFOtp!: string;
  timeLeft: number = 30;
  interval: any;
  retry = false;
  dBtnFpOtp: boolean = false;
  dBtnretry: boolean = false;
  loaderEnable:boolean=false
  loader!: boolean;
  @Output() operationSuccess = new EventEmitter<any>();
  @Input() mobile: any;
  showOtpComponent = true;
  otp!: string;

  @ViewChild('ngOtpInput', { static: false })
  ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '43px',
      height: '37px',
    },
  };
  _ResidentialUserService = inject(HomeUserServiceService);

  onOtpChange(value: string): void {
    console.log(value, typeof value);
    if (/^\d{4}$/.test(value)) {
      console.log('Input value is valid.');
      this.otp = value;
    } else {
      console.log('Input value is not valid.');
    }
  }

  forgetPassOtpSubmit() {
    this.dBtnFpOtp = true;
    this.loaderEnable=true
    this.loader = true;
    this._ResidentialUserService
      .forgetPassOtpSubmit(this.otp, this.mobile)
      .subscribe({
        next: (data) => {
          this.dBtnFpOtp = false;
          this.errFOtp = '';
          console.log('User forgot password OTP data', data);
          var outputData = {
            success: true,
            mobile: this.mobile,
            userid: data,
          };
          this.otp=''
          this.loaderEnable=false
          console.log('forgot password OTP outputData', outputData);
          this.operationSuccess.emit(outputData);
        },
        error: (error) => {
          console.log('in error forgot password ', error);
          this.dBtnFpOtp = false;
          this.loaderEnable=false
          this.loader = false;
          this.errFOtp = error.error.message;
        },
      });
  }

  // otp retry
  otpRetry() {
    this.dBtnretry = true;
    this.loader = true;
    this.loaderEnable=true
    //this.stopTimer();
    this.startTimer();
    this._ResidentialUserService.otpRetry(this.mobile).subscribe({
      next: () => {
        this.dBtnretry = false;
        this.loader = false;
        this.loaderEnable=false
      },
      error: (error) => {
        this.dBtnretry = false;
        this.loader = false;
        this.loaderEnable=false
        if (error.status === 403 || error.status === 500) {
          this.loader = false;
          this.errFOtp = error.error.error.message;
        } else {
          this.loader = false;
          this.errFOtp = error.error.error.message;
        }
      },
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
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.timeLeft = 0;
  }

 ngOnInit(): void {
    this.startTimer();
  }
}
