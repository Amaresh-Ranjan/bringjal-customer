import { Component, Input, inject } from '@angular/core';
import { SignupOtpComponent } from '../../../signup-otp/signup-otp.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup-otp-modal',
  standalone: true,
  imports: [SignupOtpComponent],
  templateUrl: './signup-otp-modal.component.html',
  styleUrl: './signup-otp-modal.component.scss'
})
export class SignupOtpModalComponent {
  @Input() mobile!: string;
  @Input() userid!: string;
	modal = inject(NgbActiveModal);

  showLogin(){
    var data = {openLogin: true, signup: false}
    this.modal.close(data);
  }

  operationSuccessSignupOtp(recievedData:any){
    if(recievedData.success){
      var data = {openLogin: false, signup: true}
      this.modal.close(data);
    }
  }
}
