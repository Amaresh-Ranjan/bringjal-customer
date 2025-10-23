import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeUserServiceService } from '../../../../services/backendInteractionServices/home-user-service.service';
import { User } from '../../../../models/user.model';
import { CustomLoaderComponent } from '../../../custom-loader/custom-loader.component';
import { LoaderService } from '../../../../services/common/loader.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomLoaderComponent,
    FormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup;
  dBtnSignup: boolean = false;
  errSignup!: string;
  showReferral: boolean = false;
  mobile!: string;
  userid!: string;
  loaderEnable: boolean = false;
  whatsup: boolean = true;
  @Output() operationSuccess = new EventEmitter<any>();

  constructor(
    private residentialUserService: HomeUserServiceService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      password: new FormControl(null, Validators.required),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[4|5|6|7|8|9][0-9]{9}$'),
      ]),
      whatsup: new FormControl(true),
      referral: new FormControl(null),
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

  toggleWhatsapp() {
    this.whatsup = !this.whatsup;
    this.signupForm.patchValue({ whatsup: this.whatsup });
    console.log('#################################', this.whatsup);
  }

  onSignupSubmit() {
    this.dBtnSignup = true;
    this.loaderEnable = true;
    this.loaderService.enableLoader();
    this.errSignup = '';
    this.mobile = this.signupForm.value.mobile;

    let user: any = {
      mobile: this.signupForm.value.mobile,
      password: this.signupForm.value.password,
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      referral: this.signupForm.value.referral,
      whatsup: this.signupForm.value.whatsup,
    };

    if (!this.signupForm.value.referral) {
      user = {
        mobile: this.signupForm.value.mobile,
        password: this.signupForm.value.password,
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        whatsup: this.signupForm.value.whatsup,
      };
    }

    console.log('signupForm data received', user);
    this.residentialUserService.userSignup(user).subscribe({
      next: (data: any) => {
        this.dBtnSignup = false;
        this.userid = data;

        this.signupForm.reset();
        var outputData = {
          userid: this.userid,
          mobile: this.mobile,
          success: true,
        };
        // this.residentialUserService.sendOTP(this.mobile).subscribe({
        //   next:(data) =>{

        //   },
        //   error:(err)=> {
        //     console.log(err)
        //     this.errSignup = err.error.error.message;
        //   },
        // })

        this.operationSuccess.emit(outputData);
        this.loaderEnable = false;
        this.loaderService.disableLoader();
      },
      error: (error: any) => {
        this.loaderService.disableLoader();
        this.loaderEnable = false;
        // this.errSignup = error?.error?.error?.message;
        // this.errSignup = error?.error?.message;
        if (error?.error?.error?.message) {
          this.errSignup = error?.error?.error?.message;
        }
        if (error?.error?.message) {
          this.errSignup = error?.error?.message;
        }
        // this.dBtnSignup = false;
        console.log('error in @component:', error);
      },
    });
  }
}
