import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { HomeUserServiceService } from '../../services/backendInteractionServices/home-user-service.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  dBtnSignup: boolean = false;
  errSignup!: string;
  showReferral: boolean = false;
  loader!: boolean;
  mobile!: string;
  userid!: string;
  @Output() operationSuccess = new EventEmitter<any>();





  constructor(private residentialUserService: HomeUserServiceService,

  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'password': new FormControl(null, Validators.required),
      'mobile': new FormControl(null, [Validators.required, Validators.pattern('^[4|5|6|7|8|9][0-9]{9}$')]),
      'referral': new FormControl(null)
    });
  }
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }


  onSignupSubmit() {
    this.dBtnSignup = true;
    this.loader = true;
    this.errSignup = '';
    this.mobile = this.signupForm.value.mobile;
    const user = new User(
      this.signupForm.value.mobile,
      this.signupForm.value.password,
      this.signupForm.value.name,
      this.signupForm.value.email,
      this.signupForm.value.referral
    );
    console.log('signupForm data received', user);
    this.residentialUserService.userSignup(user).subscribe({
      next: (data: any) => {
        this.dBtnSignup = false;
        this.userid = data;
        this.loader = false;
        this.signupForm.reset();
        var outputData = {
          userid: this.userid,
          mobile: this.mobile,
          success: true
        }
        this.operationSuccess.emit(outputData);
      },
      error: (error) => {
        console.log("error in @component:", error);
        this.dBtnSignup = false;
        this.loader = false;
        if (error.status === 403) {
          this.errSignup = error.error.error.message;
        }
        if (error.status === 500) {
          this.errSignup = error.error.error.message;
        } else {
          this.errSignup = error.error.error.message;
        }
      }
    });

  }
}
