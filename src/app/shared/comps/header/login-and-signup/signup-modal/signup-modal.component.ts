import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../../../signup/signup.component';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [SignupComponent],
  templateUrl: './signup-modal.component.html',
  styleUrl: './signup-modal.component.scss'
})
export class SignupModalComponent {
	modal = inject(NgbActiveModal);



  showLogin(){
    var data = {openLogin: true, signup: false}
    this.modal.close(data);
  }

  operationSuccess(recievedData:any){
    console.log(recievedData);
    if(recievedData.success){

      var data = {openLogin: false, signup: true, mobile: recievedData.mobile, userid: recievedData.userid}
      this.modal.close(data);
    }
  }
}
