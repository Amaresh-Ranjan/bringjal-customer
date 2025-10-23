import { Component, Output, EventEmitter, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { User } from '../models/user.model';
import { HomeUserServiceService } from '../../services/backendInteractionServices/home-user-service.service';
import { CookieStorageService } from '../../services/storageRelated/cookie-storage.service';
import { UserSotrageService } from '../../services/storageRelated/user-sotrage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errLogin!: string;
  loginForm!: FormGroup;
  dBtnLogin: boolean = false;
  loader!: boolean;
  userMobile!: string;
  userData: any;
  @Output() operationSuccess = new EventEmitter < any > ();

  _ResidentialUserService = inject(HomeUserServiceService);
  cookieStorage = inject(CookieStorageService);
  userStorage = inject(UserSotrageService);
  router = inject(Router);
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'mobile': new FormControl(null, [Validators.required, Validators.pattern('^[4|5|6|7|8|9][0-9]{9}$')]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onLoginSubmit() {
    this.dBtnLogin = true;
    this.loader = true;
    this.errLogin = '';
    const user = new User(
      this.loginForm.value.mobile,
      this.loginForm.value.password
    );
    console.log('User logged details in @login component', user);
    this._ResidentialUserService.userLogin(user).subscribe({
      next: (data) => {
        this.dBtnLogin = false;
        this.userMobile = this.loginForm.value.mobile;
        console.log('User login successful data', data);
        if (data.verification) {
          var outputData = {
            success: true,
            verified: true,
            mobile: this.loginForm.value.mobile,
            userid: data.userid,
          };
          console.log('outputData',outputData);
          if(data.subscribed){
            this.operationSuccess.emit(outputData);
            this.router.navigate(['/india/dashboard']);
          }else{
            this.operationSuccess.emit(outputData);
          }
        }else{
          var outputData = {
            success: true,
            verified: false,
            mobile: this.loginForm.value.mobile,
            userid: data.userid
          }
          this._ResidentialUserService.sendOTP(this.userMobile).subscribe(data => {
            this.operationSuccess.emit(outputData);
          });
        }
      },
      error: (error) => {
        this.dBtnLogin = false;
        this.loader = false;
        this.errLogin = error.error.message;
      }
    });

    this.loader = false;

  }

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

}
