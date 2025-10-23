import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { HomeUserServiceService } from '../../../../services/backendInteractionServices/home-user-service.service';
import { CookieStorageService } from '../../../../services/storageRelated/cookie-storage.service';
import { UserSotrageService } from '../../../../services/storageRelated/user-sotrage.service';
import { ModalService } from '../../../../services/common/modal.service';
import { CustomLoaderComponent } from '../../../custom-loader/custom-loader.component';
import { LoaderService } from '../../../../services/common/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CustomLoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private modal = inject(ModalService);
  errLogin!: string;
  loaderEnable:boolean=false
  loginForm!: FormGroup;
  dBtnLogin: boolean = false;
  loader!: boolean;
  userMobile!: string;
  userData: any;
  @Output() operationSuccess = new EventEmitter<any>();

  _ResidentialUserService = inject(HomeUserServiceService);
  cookieStorage = inject(CookieStorageService);
  loaderService = inject(LoaderService);
  userStorage = inject(UserSotrageService);
  router = inject(Router);
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      mobile: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[4|5|6|7|8|9][0-9]{9}$'),
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  onLoginSubmit() {
    this.dBtnLogin = true;
    this.loaderEnable=true
   this.loaderService.enableLoader()
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
          this.modal.closeModal();
          
          var outputData = {
            success: true,
            verified: true,
            mobile: this.loginForm.value.mobile,
            userid: data.userid,
          };
          console.log('outputData', outputData);
          this.loginForm.reset()
          if (data.subscribed) {
            this.modal.closeModal();
            this.router.navigate(['/india/dashboard']);
            this.operationSuccess.emit(outputData);
           
          } else {
            this.operationSuccess.emit(outputData);
            this.modal.closeModal();
          }
        } else {
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
        this.loaderEnable=false
        this.loaderService.disableLoader()
      },
      error: (error) => {
        this.loaderService.disableLoader()
        this.loaderEnable=false
        this.errLogin = error.error.message;
        this.dBtnLogin = false;

      }
    });

  }

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
}
