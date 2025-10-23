import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieStorageService } from '../../services/storageRelated/cookie-storage.service';
import { HomeUserServiceService } from '../../services/backendInteractionServices/home-user-service.service';

@Component({
  selector: 'app-forgotpassword-new-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpassword-new-password.component.html',
  styleUrl: './forgotpassword-new-password.component.scss'
})
export class ForgotpasswordNewPasswordComponent {
  newPasswordForm!: FormGroup;
  errNewPassSubmit!: string;
  dBtnFpNewPsw:boolean = false;
  loader!: boolean;
  @Output() operationSuccess = new EventEmitter < any > ();
  @Input() mobile!: string;
  @Input() userid!: string;
  @Input() token!: string;
  _ResidentialUserService = inject(HomeUserServiceService);
  cookieStorage = inject(CookieStorageService);
  ngOnInit(): void {
    this.newPasswordForm = new FormGroup({
      'password': new FormControl(null, Validators.required)
    });
  }

  onNewPasswordSubmit(){
    this.dBtnFpNewPsw = true;
    this.loader = true;
    console.log("onNewPassword token", this.token);
    this._ResidentialUserService.newPasswordSubmit(this.newPasswordForm.value.password, this.userid).subscribe({
      next: (data) => {
        if(data.subscribed){

        }else{
          this.dBtnFpNewPsw = false;
          this.newPasswordForm.reset();
          var outputData = {
            success: true,
          }
          this.operationSuccess.emit(outputData);
        }
        
      },
      error: (error) => {
        this.dBtnFpNewPsw = false;
        this.loader = false;
        this.errNewPassSubmit = error.error.message;
      }
    });
  }

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

}
