import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Interesteduser } from '../../shared/models/interesteduser.model';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { globalErrorHandler } from '../../shared/services/common/error-handler';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Component({
  selector: 'app-device-waiting-list',
  standalone: true,
  imports: [ReactiveFormsModule, LottieComponent, CommonModule],
  templateUrl: './device-waiting-list.component.html',
  styleUrl: './device-waiting-list.component.scss',
})
export class DeviceWaitingListComponent {
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

  @Output()  droppyWaitlist = new EventEmitter<boolean>();
  @Output()  skipAddingDroppy = new EventEmitter<boolean>();
  @Output() loaderToggleA = new EventEmitter<boolean>();
  @Output() interestSubmitted = new EventEmitter<boolean>();
  errArea: string|any;
  isBrowser:any
  constructor(
    private router: Router,
    private _homeUserService: HomeUserServiceService,
    private _globalErrorHandler: globalErrorHandler,
    private ssrCookieService: SsrCookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit() {
    this.interestedUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[4|5|6|7|8|9][0-9]{9}$'),
      ]),
      primary_address: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(10),
      ]),
      latitude: new FormControl('', [
        Validators.required,
      ]),
      longitude: new FormControl('', [
        Validators.required,
      ]),
    });
  if(this.isBrowser){
    const latitude= this.ssrCookieService.get('lat');
    const longitude= this.ssrCookieService.get('lng');
    const primary_address= this.ssrCookieService.get('str');
    console.log('latitude',latitude,'longitude',longitude,'primary_address',primary_address);
    this.interestedUserForm.patchValue({latitude: +latitude, longitude: +longitude, primary_address: primary_address});
  }
    
    // setTimeout(() => {
    //   this.showOrHideLoader();
    // }, 2000);
    // setTimeout(() => {
    //   this.showOrHideLoader();
    // }, 5000);
  }

 

  droppyWait(){
    if(this.interestedUserForm.invalid){
      this.errArea='Please fill all the required fields';
      return
    }
    console.log(this.interestedUserForm.value);
    this.showLoader()
    console.log(this.interestedUserForm.value);
    this._homeUserService.joinDeviceWaitingList(this.interestedUserForm.value).subscribe({
      next: (data) => {
        console.log('data',data);
        this.droppyWaitlist.emit(true);
        this.hideLoader()
      },
      error: (error) => {
        console.log('error',error);
        this._globalErrorHandler.handleError(error);
        this.hideLoader()
      },  
    })
  }

  skipAddDroppy(){
    this.skipAddingDroppy.emit(true);
  }

  showLoader() {
    
    this.loaderToggleA.emit(true);
  }
 hideLoader() {
    this.loaderToggleA.emit(false);
  }
}
