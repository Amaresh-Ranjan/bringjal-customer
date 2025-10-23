import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../login/login.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
	modal = inject(NgbActiveModal);
  @Input() name!: string;

  ngOnInit(){
    console.log("name:", this.name);
  }

  showForgotPassword(){
    var data = {openSignup: false, login: false, openForgotPassword: true, verified: false}
    this.modal.close(data);
  }

  showSignup(){
    var data = {openSignup: true, login: false, openForgotPassword: false, verified: false}
    this.modal.close(data);
  }

  operationSuccess(recievedData:any){
    console.log('dataa recived', recievedData)
    if(recievedData.success){
      var data = {openSignup: false, login: true, openForgotPassword: false, verified: recievedData.verified, 
        mobile: recievedData.mobile, userid: recievedData.userid  }
      this.modal.close(data);
    }
  }
}
