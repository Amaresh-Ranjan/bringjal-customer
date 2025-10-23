import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeUserServiceService } from '../../../../services/backendInteractionServices/home-user-service.service';
import { CustomLoaderComponent } from '../../../custom-loader/custom-loader.component';
@Component({
  selector: 'app-forgotpassword-number',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CustomLoaderComponent],
  templateUrl: './forgotpassword-number.component.html',
  styleUrl: './forgotpassword-number.component.scss',
})
export class ForgotpasswordNumberComponent {
  dBtnFpNum: boolean = false;
  errFPassNum!: string;
  fPasswordMobileForm!: FormGroup;
  loaderEnable:boolean=false
  loader!: boolean;
  @Output() operationSuccess = new EventEmitter<any>();
  _ResidentialUserService = inject(HomeUserServiceService);

  ngOnInit(): void {
    this.fPasswordMobileForm = new FormGroup({
      mobile: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[4|5|6|7|8|9][0-9]{9}$'),
      ]),
    });
  }

  onNumFPSubmit() {
    this.dBtnFpNum = true;
    this.loaderEnable=true
    this.loader = true;
    this._ResidentialUserService
      .forgetPassNumSubmit(this.fPasswordMobileForm.value.mobile)
      .subscribe({
        next: () => {
          this.dBtnFpNum = false;
          var outputData = {
            success: true,
            mobile: this.fPasswordMobileForm.value.mobile,
          };
          this.loaderEnable=false
          this.fPasswordMobileForm.reset()
          this.operationSuccess.emit(outputData);
          console.log('forgot password number outputData', outputData);
        },
        error: (error) => {
          this.dBtnFpNum = false;
          this.loader = false;
          this.loaderEnable=false
          this.errFPassNum = error.error.message;
          console.log('in error forgot password number', error);
        },
      });
  }
}
