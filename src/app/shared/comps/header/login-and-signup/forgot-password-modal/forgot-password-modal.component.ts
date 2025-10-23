import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotpasswordNewPasswordComponent } from '../../../forgotpassword-new-password/forgotpassword-new-password.component';
import { ForgotpasswordNumberComponent } from '../../../forgotpassword-number/forgotpassword-number.component';
import { ForgotpasswordOtpComponent } from '../../../forgotpassword-otp/forgotpassword-otp.component';

@Component({
  selector: 'app-forgot-password-modal',
  standalone: true,
  imports: [ForgotpasswordNewPasswordComponent, ForgotpasswordNumberComponent, ForgotpasswordOtpComponent],
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.scss'
})
export class ForgotPasswordModalComponent {
  modal = inject(NgbActiveModal);

  mobileSection: boolean = true;
  otpSection: boolean = false;
  newPasswordSection: boolean = false;
  mobile!: string;
  userid!: string;

  showLogin(){
    var data = {openLogin: true, forgotPassword: false}
    this.modal.close(data);
  }

  operationSuccess(recievedData:any){
    if(recievedData.success){
      this.mobileSection = false;
      this.otpSection = true;
      this.mobile = recievedData.mobile;
    } 
  }

  operationSuccessOtpVerified(recievedData:any){
    if(recievedData.success){
      this.mobileSection = false;
      this.otpSection = false;
      this.newPasswordSection = true;
      this.userid = recievedData.userid;
    }
  }

  operationSuccessPasswordChanged(recievedData:any){
    if(recievedData.success){
      var data = {openLogin: false, forgotPassword: true}
    this.modal.close(data);
    }
  }



}
