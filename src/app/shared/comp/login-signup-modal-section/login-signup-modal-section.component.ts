import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediumScreenModalComponent } from '../../modal-comp/medium-screen-modal/medium-screen-modal.component';
import { ModalService } from '../../services/common/modal.service';
import { LoginComponent } from '../header-section/login-and-signup-sections/login/login.component';
import { SignupComponent } from '../header-section/login-and-signup-sections/signup/signup.component';
import { SignupOtpComponent } from '../header-section/login-and-signup-sections/signup-otp/signup-otp.component';
import { ForgotpasswordOtpComponent } from '../header-section/login-and-signup-sections/forgotpassword-otp/forgotpassword-otp.component';
import { ForgotpasswordNewPasswordComponent } from '../header-section/login-and-signup-sections/forgotpassword-new-password/forgotpassword-new-password.component';
import { ForgotpasswordNumberComponent } from '../header-section/login-and-signup-sections/forgotpassword-number/forgotpassword-number.component';

@Component({
  selector: 'app-login-signup-modal-section',
  standalone: true,
  imports: [
    CommonModule,
    MediumScreenModalComponent,
    LoginComponent,
    SignupComponent,
    SignupOtpComponent,
    ForgotpasswordNumberComponent,
    ForgotpasswordOtpComponent,
    ForgotpasswordNewPasswordComponent,
  ],
  templateUrl: './login-signup-modal-section.component.html',
  styleUrl: './login-signup-modal-section.component.scss',
})
export class LoginSignupModalSectionComponent {
  mobile!: string;
  userid!: string;
  isMediumModalOpen: boolean = false;
  copyright: any;
  constructor(private modalService: ModalService) {}
  ngOnInit() {
    this.modalService.modalState$.subscribe((isOpen) => {
      console.log('isOpen State', isOpen);
      this.isMediumModalOpen = isOpen;
    });
  }

  loginSection: boolean = true;
  signupSection: boolean = false;
  sOtpSection: boolean = false;
  fpMobileNumberSection: boolean = false;
  fpOtpSection: boolean = false;
  fpNewPswSection: boolean = false;

  closeModalMd() {
    this.modalService.closeModal();
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
  operationSuccessLogin(data:any) {
    console.log('login data from login-signup child', data);
    if (data.verified) {
      this.showLogin();
    } else {
      this.userid=data.userid
      this.mobile=data.mobile
      console.log(this.userid,this.mobile)
      this.showSignupOtp();
    }
  }

  operationSuccessSignupOtp(recievedData:any) {
    if (recievedData.success) {
      this.showLogin();
    }
  }

  operationSuccessFpNumber(recievedData:any) {
    if (recievedData.success) {
      this.mobile = recievedData.mobile;
      this.showForgotPasswordOtp();
    }
  }

  operationSuccessFpOtp(recievedData:any) {
    if (recievedData.success) {
      this.userid = recievedData.userid;
      this.showForgotPasswordNewPassword();
    }
  }

  operationSuccessFpPassword(recievedData:any) {
    if (recievedData.success) {
      this.showLogin();
    }
  }

  operationSuccessSignup(event:any) {
    this.mobile = event.mobile;
    this.userid = event.userid;
    this.showSignupOtp();
  }
}
