import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import { Interesteduser } from '../../shared/models/interesteduser.model';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { globalErrorHandler } from '../../shared/services/common/error-handler';

@Component({
  selector: 'app-interested-user',
  standalone: true,
  imports: [ReactiveFormsModule, LottieComponent, CommonModule],
  templateUrl: './interested-user.component.html',
  styleUrl: './interested-user.component.scss',
})
export class InterestedUserComponent {
  // latitude: number|any;
  // longitude: number|any;

  interestedUserForm: FormGroup|any;
  dBtnOutOfdelivery: boolean|any;
  options: AnimationOptions = {
    path: '/assets/animations/notAvailable.json',
  };
  @Input() oMobile: string|any;
  @Input() oName: string|any;
  @Input() oEmail: string|any;
  @Input() latitude: number|any;
  @Input() longitude: number|any;
  @Input() primary_address: string|any;
  @Input() userId: string|any;
  @Output() loaderToggle = new EventEmitter<boolean>();
  @Output() interestSubmitted = new EventEmitter<boolean>();
  errArea: string|any;
  constructor(
    private router: Router,
    private _homeUserService: HomeUserServiceService,
    private _globalErrorHandler: globalErrorHandler
  ) {}
  ngOnInit() {
    this.interestedUserForm = new FormGroup({
      name: new FormControl(this.oName, [Validators.required]),
      email: new FormControl(this.oEmail, [
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      mobile: new FormControl(this.oMobile, [
        Validators.required,
        Validators.pattern('^[4|5|6|7|8|9][0-9]{9}$'),
      ]),
      primaryAddress: new FormControl(this.primary_address, [
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(10),
      ]),
    });
    // setTimeout(() => {
    //   this.showOrHideLoader();
    // }, 2000);
    // setTimeout(() => {
    //   this.showOrHideLoader();
    // }, 5000);
  }

  getDataLocationFromInterestedUser() {
    // this.loader = true;
    this.showOrHideLoader();
    this.dBtnOutOfdelivery = true;
    var interesteduser = new Interesteduser(
      this.interestedUserForm.value.name,
      this.interestedUserForm.value.email,
      this.interestedUserForm.value.mobile,
      this.latitude,
      this.longitude,
      this.primary_address
    );
    console.log('intrested data', interesteduser);
    // console.log("in add-sum, @getDataLocationFromInterestedUser before service call");
    this._homeUserService
      .interestedButOutOfServicAreaeUser(interesteduser)
      .subscribe({
        next: (data) => {
          console.log(
            'in add-sum, @getDataLocationFromInterestedUser before service call, data:',
            data
          );
          this.loaderToggle.emit();
          this.dBtnOutOfdelivery = false;
          this.interestedUserForm.reset();
          this.interestSubmitted.emit(true);
          this.showOrHideLoader();
        },
        error: (error) => {
          this.dBtnOutOfdelivery = false;
          this._globalErrorHandler.handleError(error);
        },
      });
  }

  showOrHideLoader() {
    this.loaderToggle.emit(true);
  }
}
