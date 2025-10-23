import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { HomeUserServiceService } from '../../services/backendInteractionServices/home-user-service.service';
@Component({
  selector: 'app-forgotpassword-number',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpassword-number.component.html',
  styleUrl: './forgotpassword-number.component.scss'
})
export class ForgotpasswordNumberComponent {
  dBtnFpNum:boolean = false;
  errFPassNum!: string;
  fPasswordMobileForm!: FormGroup;
  loader!: boolean;
  @Output() operationSuccess = new EventEmitter < any > ();
  _ResidentialUserService = inject(HomeUserServiceService)

  ngOnInit(): void {
    this.fPasswordMobileForm = new FormGroup({
      'mobile': new FormControl(null, [Validators.required, Validators.pattern('^[4|5|6|7|8|9][0-9]{9}$')]),
    });
  }

  onNumFPSubmit(){
    this.dBtnFpNum = true;
    this.loader = true; 
    this._ResidentialUserService.forgetPassNumSubmit(this.fPasswordMobileForm.value.mobile).subscribe({
      next: () => {
        this.dBtnFpNum = false;
        var outputData = {
          success: true,
          mobile: this.fPasswordMobileForm.value.mobile
        }
        this.operationSuccess.emit(outputData);
      },
      error: (error) => {
        this.dBtnFpNum = false;
        this.loader = false;
        this.errFPassNum = error.error.message;
      }
    });
  }
}
