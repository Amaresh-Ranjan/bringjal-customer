import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, Inject, inject, Input, NgZone, Output, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { globalErrorHandler } from '../../shared/services/common/error-handler';
import { SearchBarComponent } from '../../shared/comps/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { FooterSectionComponent } from "../../shared/comp/footer-section/footer-section.component";
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
		<div class="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-t-lg flex justify-between items-center capitalize">
  <h4 class="text-xl font-bold text-white">Hi there!</h4>
  <button 
    type="button" 
    class="text-cyan-100 hover:text-white text-2xl font-semibold leading-none" 
    (click)="activeModal.dismiss('Cross click')" 
    aria-label="Close"
  >
    &times;
  </button>
</div>

<div class="p-6 bg-cyan-50">
  <div class="space-y-6">
    <div class="text-center">
      <h3 class="text-cyan-800 text-lg font-medium">
        Location is changed to different delivery area, you are going to be redirected to edit profile page please restart the process.
      </h3>
    </div>
    
    <div class="flex justify-center space-x-4 pt-2">
      <button 
        (click)="confirmAddressChange()" 
        type="button"
        class="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      >
        OK
      </button>
    </div>
  </div>
</div>
	`,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);

  @Input() name: any;

  confirmAddressChange() {
    var data = { agree: true }
    this.activeModal.close(data);
  }

}

 
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    GoogleMap,
    MapMarker,
    CustomLoaderComponent,
    SearchBarComponent,
    FooterSectionComponent
],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  loaderEnable = signal<boolean>(false);
  loader: boolean = false;
  emailForm: FormGroup;
  mobileForm: FormGroup;
  otpForm: FormGroup;
  nameForm: FormGroup;
  addressForm: FormGroup;
  userSubscribed: boolean=false;
  mainSection: boolean=false;
  emailSection: boolean=false;
  mobileSection: boolean=false;
  otpSection: boolean=false;
  nameSection: boolean=false;
  addressSection: boolean=false;
  userStorage = inject(UserSotrageService);
  router = inject(Router);
  cdr=inject(ChangeDetectorRef)

  searchAddressSection:boolean = true;
  mapSection: boolean = false;
  disableBtn: boolean = false;
  searchAddressError:any
  dBtnEmail: boolean=false;
  userData: any;
  userAddress: any;
  searchAddress: any;

  errFOtp: any;
  timeLeft: number = 30;
  interval: any;
  retry = false;
  dBtnFpOtp:boolean = false;
  dBtnretry:boolean = false;
  @Output() operationSuccess = new EventEmitter < any > ();
  @Input() mobile: any;
  otp: any;
  primaryAddress: any;
  private _ngZone = inject(NgZone)
  emailError: any;
  nameError: any;
  mobileError: any;
  adddressError:any
  errorMessageOtp:any
  // map related properties
  product: any;

  minimum_required_quantity: any;
  maximum_quantity: any;
  deliveryDays: any;
  eta: any;
  deviceDeposit: any;
  floorChargesPerFloor: any;
  floorCharges: boolean=false;
  floorLimit: any;
  deliveryChargePresent: boolean=false;
  deliveryChargePerCan: any;
  discountPerQuantity: any;
  deliveryId: any;
  deliveryarea: any;
  inside = signal<boolean>(true);

  priceOneCan: number = 0;
  priceTwoCans: number = 0;
  priceThreeCans: number = 0;
  priceFourCans: number = 0;

  deposit: number = 0;

  package_product_id: any;
  package_qty: any;

  productMatch: boolean = false;
  productQtyRequirementSatisfied: boolean = false;
  searchCondition: boolean = false;
  private destroyRef = inject(DestroyRef);
  @ViewChild(GoogleMap, {
    static: false
  }) set map(m: GoogleMap) {
    if (m) {

    }
  }
  center: google.maps.LatLngLiteral = {
    lat: 12.977717,
    lng: 77.676492
  };
  markerOptions: google.maps.MarkerOptions = {
    draggable: true
  };
  zoom = 14;
  markerPosition: google.maps.LatLngLiteral = {
    lat: 12.977717,
    lng: 77.676492
  };
  latLng: google.maps.LatLngLiteral|any;
  
  // map related properties end
  showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false })
  ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "43px",
      height: "37px",
    },
  };


  constructor(
    private fb: FormBuilder,
    private _globalErrorHandler: globalErrorHandler,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object,
    config: NgbModalConfig,
    private homeSevice : HomeUserServiceService,
    private storageService: UserSotrageService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    // Form Groups initialization
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.mobileForm = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[6-9]\\d{9}$')],
      ],
    });

    this.nameForm = this.fb.group({
      username: ['', Validators.required],
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      SecondaryAddress: ['', Validators.required],
      LandMark: ['', Validators.required],
      Floor: ['', Validators.required],
      Lift: [false, Validators.required]
    });
  }

  userAddressAttached:boolean=true

  ngOnInit(): void {
  
    this.loaderEnable.update(()=> true);
    this.homeSevice.fetchUserDetailsUsingId().subscribe({
      next: (data: any) => {
        this.userData = data.data;
        console.log('userdata from the storage',this.userData);
         if (isPlatformBrowser(this.platformId)) {
      const subscription = this.homeSevice.getUserAddressDetails(this.userData._id).subscribe({
        next: (data: any) => {
          console.log(data)
          if(!data?.userAddressAttached){
            this.userAddressAttached=data?.userAddressAttached
             this.loaderEnable.update(()=> false);
            return
          }
          this.userAddress = data.data;
          this.userData = data.data.user;
          this.package_product_id = this.userData.package_subscription.id;
          this.package_qty = this.userData.package_subscription.quantity;
          this.center = {
            lat: data.data.latitude,
            lng: data.data.longitude
          };
          this.markerPosition = {
            lat: data.data.latitude,
            lng: data.data.longitude
          };
  
          console.log(this.center);
          console.log('userdata from the server',this.userData);
          this.nameForm.setValue({username:this.userData.name})
          this.mobileForm.setValue({mobileNumber:this.userData.mobile})
          this.emailForm.setValue({email:this.userData.email})
          this.addressForm.patchValue({
            SecondaryAddress: data.data.secondary_address,
            LandMark: data.data.landmark,
            Floor: data.data.floor,
            Lift: data.data.lift

          });
          console.log('user info check',this.userAddress);
          this.loaderEnable.update(()=> false);
        },
        error: (error) => {
          console.error('Error getting user details', error);
          this.loaderEnable.update(()=> false);
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
  
      this.userSubscribed = true;
      this.mainSection = true;
    }
    
        
      },
      error: (error) => {
        console.error('Error getting user details', error);
      }
    })
   
  }

  onOtpChange(value: string): void {
    console.log(value, typeof(value));
    if (/^\d{4}$/.test(value)) {
      console.log('Input value is valid.');
      this.otp = value;
    } else {
      console.log('Input value is not valid.');
    }
  }

  // Map drag funcontion
  markerDragEnd(e:any) {
    this.adddressError=''
    this.loaderEnable.update(()=> true);
    var oldCoordinates = [this.markerPosition.lng, this.markerPosition.lat];
    console.log("map drag event Lat, Lng:", e.latLng.lat(), e.latLng.lng());
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    this.latLng = {
      lat: lat,
      lng: lng
    }
    this._ngZone.run(() => {
      var coordinates = [lng,lat];
      this.homeSevice.addressOnMarkerChange(coordinates, oldCoordinates,this.userData._id).subscribe({
        next: (data) => {
          console.log("data: ",data);
          this.loaderEnable.update(()=> false);
          if (data?.result?.delivery_area_match||data?.delivery_area_match) {
            //this.storageService.removeCoordinates();
            let geocoder = new google.maps.Geocoder;
            geocoder.geocode({
              'location': this.latLng
            }, (results:any, status) => {
              this._ngZone.run(() => {
                console.log("address from coordinates:", results);
                this.primaryAddress = results[0].formatted_address;

                if (results[0] === undefined || results[0] === null) {
                  return;
                }
                //this.storageService.setCordinates(lat, lng, this.primaryAddress);
              });
            });
          } else {
            const modalRef = this.modalService.open(NgbdModalContent, { centered: true });
            modalRef.result.then((data) => {
              this.storageService.removeCoordinates();
              let geocoder = new google.maps.Geocoder;
              geocoder.geocode({
                'location': this.latLng
              }, (results:any, status) => {
                this._ngZone.run(() => {
                  console.log("address from coordinates:", results);
                  this.primaryAddress = results[0].formatted_address;

                  if (results[0] === undefined || results[0] === null) {
                    return;
                  }
                  //this.storageService.setCordinates(lat, lng, this.primaryAddress);
                  // this.router.navigate(['/book-bringjal-watercan']);
                  this.backToProfileSection();
                });
              });
            });
          }
        },
        error:(err)=> {
          this.adddressError=err.error.message
        },
      });

    });
  }

  // Main Section Functions
  backToMainSection() {
    this.nameForm.setValue({username:this.userData.name})
          this.mobileForm.setValue({mobileNumber:this.userData.mobile})
          this.emailForm.setValue({email:this.userData.email})
          this.addressForm.patchValue({
            SecondaryAddress: this.userAddress.secondary_address,
            LandMark: this.userAddress.landmark,
            Floor: this.userAddress.floor,
            Lift: this.userAddress.lift

          });
          this.otpForm.reset()
          this.errorMessageOtp=""
          this.mobileError=""
          this.emailError=""
          this.nameError=""
          this.adddressError=""
          this.searchAddressError=""
          this.errFOtp=""
          this.searchCondition=false
          this.productMatch=false
          this.productQtyRequirementSatisfied=false
          this.inside.update(()=> true);
         
    this.mainSection = true;
    this.emailSection = false;
    this.mobileSection = false;
    this.nameSection = false;
    this.addressSection = false;
    this.otpSection = false;
    this.searchAddressSection = false;
    this.mapSection = false;
    
  }

  backToProfileSection(){
    this.mainSection = true;
    this.emailSection = false;
    this.mobileSection = false;
    this.nameSection = false;
    this.addressSection = false;
    this.otpSection = false;
    this.searchAddressSection = true;
    this.searchAddressError=""
    this.mapSection = false;
    this.searchCondition=false
          this.productMatch=false
          this.productQtyRequirementSatisfied=false
          this.inside.update(()=> true);
     this.otpForm.reset()
          this.errorMessageOtp=""
  }

  // For Edit Profile Section
  // Name Section Function
  editName() {
    this.nameSection = true;
    this.mainSection = false;
    this.emailSection = false;
    this.mobileSection = false;
    this.addressSection = false;
    this.otpSection = false;

  }

 

  // Email Section Function
  editEmail() {
    this.emailSection = true;
    this.mainSection = false;
    this.nameSection = false;
    this.mobileSection = false;
    this.addressSection = false;
    this.otpSection = false;

  }

  // Mobile Section Function
  editMobile() {
    this.mobileSection = true;
    this.mainSection = false;
    this.emailSection = false;
    this.nameSection = false;
    this.addressSection = false;
    this.otpSection = false;

  }

  // Address Section Function
  editAddress() {
    this.addressSection = true;
    this.mainSection = false;
    this.emailSection = false;
    this.mobileSection = false;
    this.nameSection = false;
    this.otpSection = false;
    this.searchAddressSection = true;
    this.mapSection = false;

  }

  updateMobileNumber(){
    this.startTimer()
    this.mobileSection = false;
    this.otpSection = true;
    this.mainSection = false;
    this.emailSection = false;
    this.nameSection = false;
    this.addressSection = false;
  }

  saveEmail() {
    this.emailError=''
    this.loaderEnable.update(()=> true);

    console.log("Saving username" + this.emailForm.value.email);
    if(this.emailForm.valid){
      this.homeSevice.editEmail(this.emailForm.value.email).subscribe({
        next: (data:any) => {
          console.log(data);
              console.log('updated..',data);
              if(data.success){
                this.userStorage.setuserContext(data.token , data.data ).subscribe(()=>{
                  this.userData = data.data;
                  this.backToMainSection();
                  this.loaderEnable.update(()=> false);
                });
              }else{
                this.emailError = data.message;
                this.loaderEnable.update(()=> false);
              }
        },
        error: (error) => {
          console.log(error);
          this.emailError=error.error.message
          this.loaderEnable.update(()=> false);

        }
      });
    }
    
  }
  saveMobileNumber() {
    this.mobileError=''
    this.loaderEnable.update(()=> true);

    if (this.mobileForm.valid) {
      console.log({mobile:this.mobileForm.value.mobileNumber,userid:this.userData._id})
      this.homeSevice.editMobile(this.mobileForm.value.mobileNumber,this.userData._id).subscribe({
        next: (data:any) => {
          console.log(data);
          this.updateMobileNumber();

          this.loaderEnable.update(()=> false);

        },
        error: (error) => {
          console.log(error);
           this.mobileError=error.error.message
           console.log(this.mobileError)
          this.loaderEnable.update(()=> false);

        }
      });
    }
  }

  updateMobilenumberOTP(){
    this.errorMessageOtp=""
    this.loaderEnable.update(()=> true);
    this.homeSevice.updateMobile(this.mobileForm.value.mobileNumber, this.otpForm.get('otp')?.value,this.userData._id).subscribe({
      next: (data:any) => {
        console.log(data);
        if(data.success){
          this.otpForm.reset()
          this.userStorage.setuserContext(data.token, data.data).subscribe(()=>{
            this.userData = data.data;
            this.backToMainSection();
            this.loaderEnable.update(()=> false);
          });
        }

      },
      error: (error) => {
        console.log(error);
        this.errorMessageOtp=error.error.message

          console.log(this.errorMessageOtp);
        this.loaderEnable.update(()=> false);
      }
    })
    // this.updateMobileNumber();

  }

  saveUsername() {
    this.nameError=''
    this.loaderEnable.update(()=> true);
    console.log("Saving username" + this.nameForm.value.username);
    if(this.nameForm.valid){
      this.homeSevice.editName(this.nameForm.value.username).subscribe({
        next: (data:any) => {
          console.log(data);
          this.userStorage.setuserContext(data.token , data.data ).subscribe(()=>{
            this.userData = data.data;
            this.backToMainSection();
            this.loaderEnable.update(()=> false);
          });
        },
        error: (error) => {
          console.log(error);
           this.nameError=error.error.message
          this.loaderEnable.update(()=> false);
        }
      });
    }
  }

  saveAddress() {
    this.adddressError=''
    this.loaderEnable.update(()=> true);
    this.homeSevice.attachAddressToUser(this.primaryAddress,
      this.latLng.lat,
      this.latLng.lng,
      this.addressForm.value.SecondaryAddress,
      this.addressForm.value.LandMark, this.addressForm.value.Floor, this.addressForm.value.Lift,this.userData._id).subscribe({
        next: (data) => {
          console.log("data from added address:", data);
          if(data?.success){
            this.userStorage.setuserContext(data?.result?.token , data?.result?.user ).subscribe(()=>{
              this.userAddress = data?.result?.userAddress;
              this.userData = data?.result?.user;
              console.log("userData",this.userData)
              this.package_product_id = this.userData?.package_subscription?.id;
              this.package_qty = this.userData?.package_subscription?.quantity;
              this.backToMainSection();
              this.loaderEnable.update(()=> false);
            });
            

          }
          
        },
        error: (error) => {
          this.adddressError=error.error.message
          this.loaderEnable.update(()=> false);
        }
      });
  }


  // otp retry
  otpRetry() {
    this.loaderEnable.update(()=> true);
    this.dBtnretry = true;
    this.loader = true;
    //this.stopTimer();
    this.startTimer();
    this.homeSevice.retryOtpMobileUpdate(this.mobile,this.userData._id).subscribe({
      next: () => {
        this.dBtnretry = false;
        this.loader = false;
        this.loaderEnable.update(()=> false);
      },
      error: (error) => {
        this.dBtnretry = false;
        this.loader = false;
        if (error?.status === 403 || error?.status === 500) {
          this.loader = false;
          this.errFOtp = error?.error?.error?.message;
        
        }else{
          this.loader = false;
          this.errFOtp = error?.error?.error?.message;
         
        }
         this.loaderEnable.update(()=> false);
      }
    });
  }

  startTimer() { 
    this.retry = false;
    this.timeLeft = 30;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
         this.stopTimer()
        this.retry = true;
        this.timeLeft = 30;
        return;
      }
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.interval);
    this.timeLeft = 0;
  }


  //********edit address section */

  handleSearchDataRecieved(data:any) {
    this.searchAddressError=''
    this.searchCondition=false
    console.log('searchData Triggered')
    this.loaderEnable.update(()=> true);
    this.searchAddress = data.searchAddr;
    this.primaryAddress = data.searchAddr;
    this.latLng = data.coordinates;
    this.disableBtn = true;
    var coordinates = [this.latLng.lng, this.latLng.lat];
    this.homeSevice.servicableDeliveryAreaWithProducts(coordinates).subscribe({
      next: (data) => {
        console.log("data from serviceable products:", data);

        this.inside.update(()=> data.pointInsideDeliveryArea);
        this.searchCondition=true
        if(this.inside()){
          console.log("inside delivery area:", data.data.result);
          if(data.data.result){
            this.deliveryarea = data.data.result.deliveryarea;
            this.minimum_required_quantity = this.deliveryarea.minimumRequiredQuantity;
            this.maximum_quantity = this.deliveryarea.maximumQuantity;
            this.product = data.data.result.products[0];
            console.log('cheking product data', this.product);
            this.deliveryDays = this.deliveryarea.deliveryDays;
            this.floorCharges = this.deliveryarea.extraCharges.floorCharges;
            // console.log('floorCharges', this.floorCharges);
            this.floorChargesPerFloor = this.deliveryarea.extraCharges.floorChargesPerFloor;
            // console.log('floorChargesPerFloor', this.floorChargesPerFloor);
            this.floorLimit = this.deliveryarea.extraCharges.floorLimit;
            // console.log('floorLimit', this.floorLimit);
            this.deliveryChargePresent = this.deliveryarea.extraCharges.deliveryChargePresent;
            // console.log('deliveryChargePresent', this.deliveryChargePresent);
            this.deliveryChargePerCan = this.deliveryarea.deliveryChargePerCan;
            // console.log('deliveryChargePerCan', this.deliveryChargePerCan);
            this.discountPerQuantity = this.deliveryarea.discountPerQuantity; 
            this.deliveryId = this.deliveryarea._id;
            console.log('delivery area id', this.deliveryId);
           

            this.priceOneCan =  Math.round((this.product.item_details.base_price + this.product.item_extra_amount - this.discountPerQuantity.oneCan) * (1 + (this.product.item_details.GST.CGST + this.product.item_details.GST.SGST + this.product.item_details.GST.IGST))) ;
            // console.log('price of  one can will  be updated', this.priceOneCan);
            this.priceTwoCans =  Math.round((this.product.item_details.base_price + this.product.item_extra_amount - this.discountPerQuantity.twoCans) * (1 + (this.product.item_details.GST.CGST + this.product.item_details.GST.SGST + this.product.item_details.GST.IGST))) ;
            this.priceThreeCans =  Math.round((this.product.item_details.base_price + this.product.item_extra_amount - this.discountPerQuantity.threeCans) * (1 + (this.product.item_details.GST.CGST + this.product.item_details.GST.SGST + this.product.item_details.GST.IGST))) ;
            this.priceFourCans =  Math.round((this.product.item_details.base_price + this.product.item_extra_amount - this.discountPerQuantity.fourCans) * (1 + (this.product.item_details.GST.CGST + this.product.item_details.GST.SGST + this.product.item_details.GST.IGST))) ;
            this.deposit = this.product.item_details.deposit;
            let condition1=false
            let condition2=false
            console.log("price",this.priceOneCan,this.priceTwoCans,this.priceThreeCans,this.priceFourCans,this.deposit )
            if(this.product.item_id == this.package_product_id){
             this.productMatch = true;
             condition1=true
            }
            if(this.minimum_required_quantity <= this.package_qty){
              if(this.package_qty <= this.maximum_quantity ){
                this.markerPosition = {
                  lat: this.latLng.lat,
                  lng: this.latLng.lng
                }
                this.center = {
                  lat: this.latLng.lat,
                  lng: this.latLng.lng
                }
                this.productQtyRequirementSatisfied = true;
                condition2=true
              } 
            }
            if(condition1&&condition2){
              this.searchCondition=false
              this.mapSection = true;
              this.searchAddressSection = false;
            }
           console.log( this.mapSection , this.productMatch , this.inside() ,
            this.productQtyRequirementSatisfied,this.searchAddressSection)
            console.log(this.searchCondition)
            
          }
          this.loaderEnable.update(()=> false);
        }else{
          this.loaderEnable.update(()=> false);
          this.searchAddressError=data.message
        }
      },
      error: (error) => {
        this.searchAddressError=error.error.message
        //console.log("from servicable area or not:", error);
        this._globalErrorHandler.handleError(error);

        
      }
    });
  }

  takeToCustomerSupportSection(){
    this.router.navigate(['/india/dashboard/customer-support']);
  }

  callLoaderSearchBar(ev:any){
    console.log("trigger,loader")
    this.loaderEnable.update(()=> ev);
  }


}
