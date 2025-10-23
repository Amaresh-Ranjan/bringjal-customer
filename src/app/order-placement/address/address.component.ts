import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  NgbActiveModal,
  NgbDropdownModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { AppConstants } from '../../shared/entities/appconstants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
    </div>
    <div class="modal-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h3 class="text-center red-text">
              Location is changed to different delivery area, you are going to
              be redirected to watercan selection page.
            </h3>
          </div>
          <div class="col-12 my-2">
            <div class="d-grid gap-2">
              <button
                class="btn btn-danger"
                (click)="confirmAddressChange()"
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);
  @Input() name: string | any;

  confirmAddressChange() {
    var data = { agree: true };
    this.activeModal.close(data);
  }
}

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleMap,
    MapMarker,
    NgbDropdownModule,
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Output() operationSuccess = new EventEmitter<any>();
  @Output() loaderToggle = new EventEmitter<boolean>();
  @Output() mapMarkerDifferentLocation = new EventEmitter<boolean>();

  @ViewChild(GoogleMap, {
    static: false,
  })
  set map(m: GoogleMap) {
    if (m) {
    }
  }
  center: google.maps.LatLngLiteral = {
    lat: 12.977717,
    lng: 77.676492,
  };
  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
  };
  loadingInProgress: boolean = false;
  zoom = 14;
  markerPosition: google.maps.LatLngLiteral = {
    lat: 12.977717,
    lng: 77.676492,
  };
  latLng: google.maps.LatLngLiteral | any;
  backupMarkerPosition: google.maps.LatLngLiteral | any;
  @Input() primaryAddress: string | any;
  @Input() latitude: number | any;
  @Input() longitude: number | any;
  @Output() searchDataRecieved = new EventEmitter();
  userInfo: any;

  sStr: string | any;
  lStr: string | any;
  floorAddr: number = 0;
  liftAddr: boolean | any;
  addAddressForm: FormGroup | any;
  secondaryAddress: FormControl | any;
  landmark: FormControl | any;
  floor: FormControl | any;
  lift: FormControl | any;
  dBtn: boolean = false;
  closeResult: string | any;
  private destroyRef = inject(DestroyRef);
  private _ResidentialUserService = inject(HomeUserServiceService);
  private _ngZone = inject(NgZone);
  private modalService = inject(NgbModal);
  private router = inject(Router);
  private userStorage = inject(UserSotrageService);
  private httpClient = inject(HttpClient);
  private cookieStorage = inject(SsrCookieService);
  userContextSub!: Subscription;
  ngOnInit(): void {
    // console.log(this.latitude, this.longitude, this.primaryAddress)
    // this.center = {
    //   lat: +this.latitude,
    //   lng: +this.longitude
    // };
    // this.markerPosition = {
    //   lat: +this.latitude,
    //   lng: +this.longitude
    // };
    // this.secondaryAddress = new FormControl(null, [Validators.required, Validators.maxLength(30)]);
    // this.landmark = new FormControl(null, [Validators.maxLength(30)]);
    // this.floor = new FormControl(this.floorAddr, [Validators.required]);
    // this.lift = new FormControl(false);
    //   console.log('this.markerPosition:', this.markerPosition);
    // this.addAddressForm = new FormGroup({
    //   secondaryAddress: this.secondaryAddress,
    //   landmark: this.landmark,
    //   floor: this.floor,
    //   lift: this.lift
    // });
    this.userContextSub = this.userStorage.getUser.subscribe((user) => {
      console.log(user);
      this.userInfo = user;
    });
    console.log('before:');
    this.showOrHideLoader();
    this.addAddressForm = new FormGroup({
      secondaryAddress: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      landmark: new FormControl('', [Validators.maxLength(30)]),
      floor: new FormControl(0),
      lift: new FormControl(false),
    });

    var userToken = this.cookieStorage.get('__bringjal_user_token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: userToken,
      }),
    };
 
    const url =
      'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/user/get/user/address/details';
    console.log(url);
    var subscription = this.httpClient
      .post<{ userAddressAttached: any; data: any }>(url, { userid: this.userInfo._id }, options)
      .subscribe({
        next: (data) => {
          console.log('user address details received from server', data);
          if (data.userAddressAttached) {
            if (data.data != null) {
              this.sStr = data.data.secondary_address;
              this.lStr = data.data.landmark;
              this.liftAddr = data.data.lift;
              this.floorAddr = data.data.floor;
              this.primaryAddress = data.data.primary_address;
              this.latitude = data.data.latitude;
              this.longitude = data.data.longitude;
              this.center = {
                lat: this.latitude,
                lng: this.longitude,
              };
              this.markerPosition = {
                lat: this.latitude,
                lng: this.longitude,
              };
              // this.secondaryAddress = new FormControl(this.sStr, [
              //   Validators.required,
              //   Validators.maxLength(30),
              // ]);
              // this.landmark = new FormControl(this.lStr, [
              //   Validators.maxLength(30),
              // ]);
              // this.floor = new FormControl(this.floorAddr, [
              //   Validators.required,
              // ]);
              // this.lift = new FormControl(data.data.lift);
              this.addAddressForm.patchValue({
                secondaryAddress: this.sStr,
                landmark: this.lStr,
                floor: this.floorAddr,
                lift: this.liftAddr,
              });
            }
          } else {
            console.log(this.latitude, this.longitude, this.primaryAddress);
            this.center = {
              lat: +this.latitude,
              lng: +this.longitude,
            };
            this.markerPosition = {
              lat: +this.latitude,
              lng: +this.longitude,
            };
            // this.secondaryAddress = new FormControl(null, [
            //   Validators.required,
            //   Validators.maxLength(30),
            // ]);
            // this.landmark = new FormControl(null, [Validators.maxLength(30)]);
            // this.floor = new FormControl(this.floorAddr, [Validators.required]);
            // this.lift = new FormControl(false);
            console.log('this.markerPosition:', this.markerPosition);
            this.addAddressForm.patchValue({
              secondaryAddress: this.sStr,
              landmark: this.lStr,
              floor: this.floor,
              lift: this.lift,
            });
            console.log('before:');
          }
          this.HideLoader();
        },
        error: (err) => {
          console.log(err);
          this.HideLoader();
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnDestroy() {
    if (this.userContextSub) {
      this.userContextSub.unsubscribe();
    }
  }

  markerDragEnd(e: any) {
    this.showOrHideLoader();
    var oldCoordinates = [this.longitude, this.latitude];
    console.log('map drag event Lat, Lng:', e.latLng.lat(), e.latLng.lng());
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    this.latLng = {
      lat: lat,
      lng: lng,
    };
    var coordinates = [lng, lat];

    this._ResidentialUserService
      .addressOnMarkerChangeInstallationOrder(
        coordinates,
        oldCoordinates,
        this.userInfo._id
      )
      .subscribe({
        next: (sameArea) => {
          console.log('data inside component:', sameArea);
          if (sameArea.delivery_area_match) {
            this.markerPosition = this.latLng;
            this.center = this.latLng;
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode(
              {
                location: this.latLng,
              },
              (results: any, status) => {
                console.log(
                  'address from coordinates:',
                  results[0].formatted_address
                );
                this.primaryAddress = results[0].formatted_address;

                if (results[0] === undefined || results[0] === null) {
                  return;
                }
                this.showOrHideLoader();
              }
            );
          } else {
            const modalRef = this.modalService.open(NgbdModalContent, {
              centered: true,
            });
            modalRef.result.then(async (data) => {
              this.mapMarkerDifferentLocation.emit(true);
              this.showOrHideLoader();
            });
          }
        },
        error: (err) => {
          this.HideLoader();
        },
      });
  }

  showOrHideLoader() {
    // console.log('show or hide loader called');
    // this.loadingInProgress = !this.loadingInProgress;
    this.loaderToggle.emit(true);
  }
  HideLoader() {
    // console.log('show or hide loader called');
    // this.loadingInProgress = !this.loadingInProgress;
    this.loaderToggle.emit(false);
  }

  selectLiftStatus(status: boolean) {
    console.log('lift status called:', status);
    this.liftAddr = status;
  }

  onNext() {
    console.log('on next is beign called', this.addAddressForm.value.lift);
    this.dBtn = true;
    if (this.addAddressForm.invalid) {
      Object.values(this.addAddressForm.controls).forEach((control: any) => {
        control.markAllAsTouched();
      });
      return;
    }
    this.showOrHideLoader();
    this._ResidentialUserService
      .attachAddressToUser(
        this.primaryAddress,
        this.latitude,
        this.longitude,
        this.addAddressForm.value.secondaryAddress,
        this.addAddressForm.value.landmark,
        this.addAddressForm.value.floor,
        this.addAddressForm.value.lift,
        this.userInfo._id
      )
      .subscribe({
        next: (data) => {
          console.log('data from added address:', data);
          this.dBtn = false;
          this.searchDataRecieved.emit({
            searchAddr: data.result.userAddress.primary_address,
            coordinates: {
              lat: data.result.userAddress.latitude,
              lng: data.result.userAddress.longitude,
            },
          });
          this.showOrHideLoader();
          this.operationSuccess.emit(true);
        },
        error: (error) => {
          this.dBtn = false;
        },
      });
  }
}
