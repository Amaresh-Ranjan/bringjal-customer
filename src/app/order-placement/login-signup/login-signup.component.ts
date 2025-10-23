import { Component, EventEmitter, Output } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { LoginComponent } from '../../shared/comp/header-section/login-and-signup-sections/login/login.component';
import { SignupComponent } from '../../shared/comp/header-section/login-and-signup-sections/signup/signup.component';
import { SignupOtpComponent } from '../../shared/comp/header-section/login-and-signup-sections/signup-otp/signup-otp.component';
import { ForgotpasswordNumberComponent } from '../../shared/comp/header-section/login-and-signup-sections/forgotpassword-number/forgotpassword-number.component';
import { ForgotpasswordOtpComponent } from '../../shared/comp/header-section/login-and-signup-sections/forgotpassword-otp/forgotpassword-otp.component';
import { ForgotpasswordNewPasswordComponent } from '../../shared/comp/header-section/login-and-signup-sections/forgotpassword-new-password/forgotpassword-new-password.component';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [
    LottieComponent,
    LoginComponent,
    SignupComponent,
    SignupOtpComponent,
    ForgotpasswordNumberComponent,
    ForgotpasswordOtpComponent,
    ForgotpasswordNewPasswordComponent,
  ],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
})
export class LoginSignupComponent {
  loginSection: boolean = false;
  signupSection: boolean = true;
  sOtpSection: boolean = false;
  fpMobileNumberSection: boolean = false;
  fpOtpSection: boolean = false;
  fpNewPswSection: boolean = false;
  mobile: any;
  userid: any;
  @Output() loaderToggle = new EventEmitter<boolean>();
  @Output() authenticationDone = new EventEmitter<any>();

  options: AnimationOptions = {
    path: '/assets/animations/login.json',
  };

  showOrHideLoader() {
    this.loaderToggle.emit(true);
  }

  showLogin() {
    this.loginSection = true;
    this.signupSection = false;
    this.sOtpSection = false;
    this.fpMobileNumberSection = false;
    this.fpOtpSection = false;
    this.fpNewPswSection = false;
  }

  showSignup() {
    this.loginSection = false;
    this.signupSection = true;
    this.sOtpSection = false;
    this.fpMobileNumberSection = false;
    this.fpOtpSection = false;
    this.fpNewPswSection = false;
  }

  showSignupOtp() {
    this.loginSection = false;
    this.signupSection = false;
    this.sOtpSection = true;
    this.fpMobileNumberSection = false;
    this.fpOtpSection = false;
    this.fpNewPswSection = false;
  }

  showForgotPasswordMobile() {
    this.loginSection = false;
    this.signupSection = false;
    this.sOtpSection = false;
    this.fpMobileNumberSection = true;
    this.fpOtpSection = false;
    this.fpNewPswSection = false;
  }

  showForgotPasswordOtp() {
    this.loginSection = false;
    this.signupSection = false;
    this.sOtpSection = false;
    this.fpMobileNumberSection = false;
    this.fpOtpSection = true;
    this.fpNewPswSection = false;
  }

  showForgotPasswordNewPassword() {
    this.loginSection = false;
    this.signupSection = false;
    this.sOtpSection = false;
    this.fpMobileNumberSection = false;
    this.fpOtpSection = false;
    this.fpNewPswSection = true;
  }

  userAuthenticationComplete() {}

  operationSuccessSignupOtp(recievedData:any) {
    if (recievedData.success) {
      this.authenticationDone.emit(recievedData);
    }
  }

  operationSuccessLogin(data:any) {
    console.log('login data from login-signup child', data);
    if (data.verified) {
      this.authenticationDone.emit(data);
    } else {
      this.userid=data.userid
      this.mobile=data.mobile
      this.showSignupOtp();
    }
  }

  operationSuccessFpNumber(recievedData:any) {
    if (recievedData.success) {
      this.mobile = recievedData.mobile;
      this.showForgotPasswordOtp();
    }
  }

  operationSuccessFpOtp(recievedData:any) {
    console.log('forgot password otp data', recievedData);
    if (recievedData.success) {
      this.userid = recievedData.userid;
    }
  }

  operationSuccessFpPassword(recievedData:any) {
    if (recievedData.success) {
      this.authenticationDone.emit(recievedData);
    }
  }

  operationSuccessSignup(event:any) {
    this.mobile = event.mobile;
    this.userid = event.userid;
    this.showSignupOtp();
  }
}
