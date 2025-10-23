import {
  Component,
  DestroyRef,
  inject,
  NgZone,
  signal,
} from '@angular/core';
import { PackageComponent } from './package/package.component';
import { AccessorySelectionComponent } from './accessory-selection/accessory-selection.component';
import { DeviceSelectionComponent } from './device-selection/device-selection.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { Router } from '@angular/router';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { CartComponent } from './cart/cart.component';
import { InterestedUserComponent } from './interested-user/interested-user.component';
import { CommonModule } from '@angular/common';
import { HomeUserServiceService } from '../shared/services/backendInteractionServices/home-user-service.service';
import { globalErrorHandler } from '../shared/services/common/error-handler';
import { UserSotrageService } from '../shared/services/storageRelated/user-sotrage.service';
import { CanComponentDeactivate } from '../shared/services/can-deactivate.guard';
import { CustomLoaderComponent } from '../shared/comp/custom-loader/custom-loader.component';
import { SearchBarSectionComponent } from '../shared/comp/search-bar-section/search-bar-section.component';
import { ModalService } from '../shared/services/common/modal.service';
import { MediumScreenModalComponent } from '../shared/modal-comp/medium-screen-modal/medium-screen-modal.component';
import { DeleiveryScheduleSectionComponent } from '../shared/comp/deleivery-schedule-section/deleivery-schedule-section.component';
import { LoaderService } from '../shared/services/common/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-placement',
  standalone: true,
  imports: [
    PackageComponent,
    AccessorySelectionComponent,
    DeviceSelectionComponent,
    LoginSignupComponent,
    AddressComponent,
    PaymentComponent,
    OrderConfirmComponent,
    InterestedUserComponent,
    CustomLoaderComponent,
    CommonModule,
    SearchBarSectionComponent,
    MediumScreenModalComponent,
    DeleiveryScheduleSectionComponent,
    CartComponent
  ],
  templateUrl: './order-placement.component.html',
  styleUrl: './order-placement.component.scss',
})
export class OrderPlacementComponent implements CanComponentDeactivate {
  isMediumModalOpen: boolean = false;
  userId: any;
  latitude: number | any;
  longitude: number | any;
  primaryAddress: string | any;
  searchAddress: string | any;
  latLng: any;
  disableBtn: boolean | any;
  userLoggedIn: boolean | any;
  userSubscribed: boolean | any;

  //DOM page selection condition blocks
  userData: any;
  orderPlaced = signal<boolean>(false);
  loaderEnable = signal<boolean>(true);
  searchAddressPresent = signal<boolean>(true);
  inside = signal<boolean>(true);
  watercanPackageSection = signal<boolean>(false);
  deviceSection = signal<boolean>(false);
  accessorySection = signal<boolean>(false);
  userDetailsSection = signal<boolean>(false);
  addressSection = signal<boolean>(false);
  paymentSection = signal<boolean>(false);

  str: string | any;
  oMobile: string | any;
  oName: string | any;
  oEmail: string | any;
  devicePresent: boolean = false;
  devicestock: boolean = true;

  product: any;
  accessories = [];

  minimum_required_quantity: number | any;
  maximum_quantity: number | any;
  deliveryDay: any;
  eta: string | any;
  etaMsg: string | any;
  deviceDeposit: number | any;
  floorChargesPerFloor: number | any;
  floorCharges: boolean | any;
  floorLimit: number | any;
  deliveryChargePresent: boolean | any;
  deliveryChargePerCan: number | any;
  discountPerQuantity: any;
  deliveryId: string | any;
  cart: any;
  orderDetails: any;
  isDirty: boolean = true;
  cart_product: any;
  droppyWaitlist: boolean = false;
  droppyAdded: boolean = false;
  droppyDeposit: number | any;
  cart_accessory: any;

  deliveryarea: any;
  private destroyRef = inject(DestroyRef);
  // private modalService = inject(NgbModal);
  private modal = inject(ModalService);
  private zone = inject(NgZone);
  constructor(
    private residentialUserService: HomeUserServiceService,
    private router: Router,
    private _globalErrorHandler: globalErrorHandler,
    private userStorage: UserSotrageService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.getLoaderDetails$.subscribe(
      (data) => {
        console.log(data)
        this.loaderEnable.update(() => data);
      })
    this.loaderEnable.update(() => true);

    //console.log(this.cookieStorageService.get('sampeCookie'));
    console.log('sample log:', this.orderPlaced());
    const subscription = this.userStorage.getUserContext().subscribe((data) => {
      console.log('data from user storage!@#$%^:', data);
      if (data !== null) {
        this.userLoggedIn = true;
        this.userData = JSON.parse(data.userData);
        this.userId = this.userData._id;
        if (this.userData.status.subscribed) {
          this.loaderEnable.update(() => false);
          this.isDirty = false;
          this.router.navigate(['india/dashboard']);
        } else {
          this.initialisePlacementSection();
        }
      } else {
        this.initialisePlacementSection();
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    // this.userStorage.getLoggedIn.subscribe({
    //   next: (isLoggedIn)=> {
    //     console.log('isLoggeIn checking..',isLoggedIn);
    //     this.userLoggedIn = isLoggedIn;
    //     if(this.userLoggedIn){
    //       this.userStorage.getUser.subscribe({
    //         next: (user)=> {
    //           console.log('User: ', user);
    //           if(user){
    //             this.userData = user;
    //             this.userId = user._id;
    //             console.log('User: ', this.userId);
    //             this.userSubscribed = user.status.subscribed;
    //             if(this.userSubscribed){
    //               this.loaderEnable = false;
    //               this.router.navigate(['india/dashboard']);
    //             }
    //           }
    //         },
    //         error: (error) => {
    //           this._globalErrorHandler.handleError(error);
    //             setTimeout(() => {
    //               this.loaderEnable = false;
    //             }, 1000);
    //         }
    //       });
    //     }else{
    //       //this.initialisePlacementSection();
    //       console.log("Asked for login");
    //       this.loaderEnable = false;
    //       // this.openUserDetailsSection();
    //     }
    //   },
    //   error: (error) => {
    //     this._globalErrorHandler.handleError(error);
    //       setTimeout(() => {
    //         this.loaderEnable = false;
    //       }, 1000);
    //   }
    // })
    this.modal.modalState$.subscribe((isOpen) => {
      console.log('isOpen State', isOpen);
      this.isMediumModalOpen = isOpen;
    });
    console.log('cart from orderplacement:', this.cart);
  }

  canDeactivate(): boolean {
    if (this.isDirty) {
      return confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
    }
    return true;
  }

  initialisePlacementSection() {
    // this.loaderEnable.update(() => false);
    new Promise((resolve) => {
      this.residentialUserService.getLocationData().subscribe({
        next: (data) => {
          console.log('location  Data:', data);
          if (data) {
            this.searchAddressPresent.update(() => true);
            this.latitude = +data.latitude;
            this.longitude = +data.longitude;
            this.primaryAddress = data.primaryAddress;
            console.log('initial order placement primary', this.primaryAddress);
            this.str = data.primaryAddress.substring(0, 30) + ' ...';
            var value = {
              lat: +data.latitude,
              lng: +data.longitude,
            };
            resolve(value);
            //this.loaderEnable = false;
          } else {
            this.searchAddressPresent.update(() => false);
            this.loaderEnable.update(() => false);
          }
        },
        error: (error) => {
          console.log('in error');
          this.loaderEnable.update(() => false);
        },
      });
    }).then((value: any) => {
      var coordinates = [value.lng, value.lat];
      this.residentialUserService
        .servicableDeliveryAreaWithProducts(coordinates)
        .subscribe({
          next: (data) => {
            console.log('data:', data);
            console.log('conforming response', data?.data?.result);
            this.inside.update(() => data.pointInsideDeliveryArea);
            if (this.inside()) {
              if (data.data.result) {
                this.deliveryarea = data.data.result.deliveryarea;
                console.log('delivery area data...', this.deliveryarea);
                this.minimum_required_quantity =
                  this.deliveryarea.minimumRequiredQuantity;
                this.maximum_quantity = this.deliveryarea.maximumQuantity;
                this.devicePresent = this.deliveryarea.devicePresent;
                this.devicestock = this.deliveryarea?.devicestock;
                this.deviceDeposit = this.deliveryarea.deviceDeposit;
                this.product = data.data.result.products[0];
                console.log('cheking product data', this.product);
                // for(let item of this.product ) {
                //    item.extra_amount
                // }
                this.accessories = data.data.result.accessories;
                // console.log('from data ',this.accessories);
                this.deliveryDay = this.deliveryarea.deliveryDays;
                console.log('delivery day =============>>>>', this.deliveryDay);
                // ETA Delivery
                this.etaMsg = data.data.result.DeliveryEstimation;
                console.log('eta', this.etaMsg);
                // // this.eta = data.data.result.DeliveryEstimation.eta.eta_message;
                this.floorCharges = this.deliveryarea.extraCharges.floorCharges;
                // console.log('floorCharges', this.floorCharges);
                this.floorChargesPerFloor =
                  this.deliveryarea.extraCharges.floorChargesPerFloor;
                // console.log('floorChargesPerFloor', this.floorChargesPerFloor);
                this.floorLimit = this.deliveryarea.extraCharges.floorLimit;
                // console.log('floorLimit', this.floorLimit);
                this.deliveryChargePresent =
                  this.deliveryarea.extraCharges.deliveryChargePresent;
                // console.log('deliveryChargePresent', this.deliveryChargePresent);
                this.deliveryChargePerCan =
                  this.deliveryarea.deliveryChargePerCan;
                // console.log('deliveryChargePerCan', this.deliveryChargePerCan);
                this.discountPerQuantity =
                  this.deliveryarea.discountPerQuantity;
                this.deliveryId = this.deliveryarea._id;
                console.log('delivery area id', this.deliveryId);
                this.openPackageSection();
                this.loaderEnable.update(() => false);
              }
            } else {
              this.loaderEnable.update(() => false);
            }
          },
          error: (error) => {

            //console.log("from servicable area or not:", error);
            this._globalErrorHandler.handleError(error);
            this.loaderEnable.update(() => false);
          },
        });
    });
  }

  searchDataRecieved(data: any) {
    // this.loaderEnable.update(() => false);
    console.log('data recieved from child component:', data);
    this.searchAddress = data.searchAddr;
    this.latLng = data.coordinates;
    this.disableBtn = true;
    console.log('in search bar @ngOnInIt of location page before service call');
    this.residentialUserService
      .addAddressToLocalStorage(
        this.latLng.lat,
        this.latLng.lng,
        this.searchAddress
      )
      .subscribe((data) => {
        this.disableBtn = false;
        //this.loaderEnable = false;
        this.searchAddressPresent.update(() => true);
        this.initialisePlacementSection();
      });
  }

  updateAddressDataRecieved(data: any) {
    // this.loaderEnable.update(() => false);
    console.log('data recieved from child component:', data);
    this.searchAddress = data.searchAddr;
    this.latLng = data.coordinates;
    this.disableBtn = true;
    console.log('in search bar @ngOnInIt of location page before service call');
    this.residentialUserService
      .addAddressToLocalStorage(
        this.latLng.lat,
        this.latLng.lng,
        this.searchAddress
      )
      .subscribe((data) => {
        console.log(data)
        this.latitude = +this.latLng.lat;
        this.longitude = +this.latLng.lng;
        this.primaryAddress = this.searchAddress;

        this.str = this.primaryAddress.substring(0, 30) + ' ...';

      });
  }

  callLoaderSearchBar(ev: any) {
    this.loaderEnable.update(() => ev);
  }

  ngOnDestroy(){
    if(this.userContextSubs){
    this.userContextSubs.unsubscribe()
    }
  }

  openPackageSection() {
    console.log('pakage section called');
    this.watercanPackageSection.update(() => true);
    this.deviceSection.update(() => false);
    this.accessorySection.update(() => false);
    this.userDetailsSection.update(() => false);
    this.addressSection.update(() => false);
    this.paymentSection.update(() => false);
  }

  openDeviceSection() {
    console.log('device section called');

    this.watercanPackageSection.update(() => false);
    this.deviceSection.update(() => true);
    this.accessorySection.update(() => false);
    this.userDetailsSection.update(() => false);
    this.addressSection.update(() => false);
    this.paymentSection.update(() => false);
  }

  openAccessorySection() {
    if (this.accessories.length > 0) {
      console.log('accessory section called');
      this.watercanPackageSection.update(() => false);
      this.deviceSection.update(() => false);
      this.accessorySection.update(() => true);
      this.userDetailsSection.update(() => false);
      this.addressSection.update(() => false);
      this.paymentSection.update(() => false);
    } else {
      console.log('accessory section called');
      this.openUserDetailsSection();
    }
  }

  openUserDetailsSection() {
    console.log('user details section called for cheking', this.userLoggedIn);
    if (this.userLoggedIn) {
      console.log('user details section skipped because already logged in');
      this.residentialUserService.getUserAddressDetails(this.userId).subscribe({
        next: (data) => {
          console.log('user address details received from server', data);
          if (data.userAddressAttached) {
            this.openPaymentSection();
            this.loaderEnable.update(() => false);
          } else {
            this.openAddressSection();
            this.loaderEnable.update(() => false);
          }
        },
      });
    } else {
      console.log('user details section called');
      this.watercanPackageSection.update(() => false);
      this.deviceSection.update(() => false);
      this.accessorySection.update(() => false);
      this.userDetailsSection.update(() => true);
      this.addressSection.update(() => false);
      this.paymentSection.update(() => false);
      this.loaderEnable.update(() => false);
    }
  }

  openAddressSection() {
    console.log(
      'address section called lat, lng, primary:',
      this.latitude,
      this.longitude,
      this.primaryAddress
    );

    this.watercanPackageSection.update(() => false);
    this.deviceSection.update(() => false);
    this.accessorySection.update(() => false);
    this.userDetailsSection.update(() => false);
    this.addressSection.update(() => true);
    this.paymentSection.update(() => false);
  }

  openPaymentSection() {
    console.log('payment section called');

    this.watercanPackageSection.update(() => false);
    this.deviceSection.update(() => false);
    this.accessorySection.update(() => false);
    this.userDetailsSection.update(() => false);
    this.addressSection.update(() => false);
    this.paymentSection.update(() => true);
  }
  getTitle(): string {
    return `<i class="bi bi-cart4 mr-2"></i> Bringjal Cart`;
  }
  isCartModalOpen = false;
  openCart() {
    this.isCartModalOpen = true;
  }
  closeCartModal() {
    this.isCartModalOpen = false;
  }

  openModalMd() {
    this.isMediumModalOpen = true;
  }
  closeModalMd() {
    this.isMediumModalOpen = false;
  }

  cartUpdated(cart: any) {
    console.log('cart from orderplacement:', cart);
    this.cart = cart;
  }

  loaderToggle() {
    this.zone.run(() => {
      this.loaderEnable.update(() => {
        return !this.loaderEnable();
      });
    });
  }

  viewDeliverySchedule() { }

  productAdded(cart: any) {
    this.cart_product = cart;
    console.log('product added', cart);
    if(this.devicePresent){
      this.openDeviceSection();
    }
    else{
      this.openAccessorySection();
    }


  }

  async editAddressCalled() {
    await this.userStorage.removeCoordinates();
    this.disableBtn = false
    this.openAddressSection();
  }

  joinDroppyWaitlist() {
    this.droppyWaitlist = true;
    if (this.accessories.length > 0) {
      this.openAccessorySection();
    } else {
      this.cartCreationWithUserOptions();
    }
  }

  interestSubmitted(ev: any) {
    this.isDirty = false;
    this.router.navigate(['/']);
  }

  skipDroppy() {

    if (this.accessories.length > 0) {
      this.openAccessorySection();
    } else {
      this.cartCreationWithUserOptions();
    }
  }

  deviceAdded() {
    this.droppyAdded = true;
    if (this.accessories.length > 0) {
      this.openAccessorySection();
    } else {
      this.cartCreationWithUserOptions();
    }

  }

  accessoryAdded(cart: any) {
    this.cart_accessory = cart;
    console.log('accessory selected', cart);
    this.cartCreationWithUserOptions();
    // this.openPaymentSection()
  }

  //backend call for creating cart with user selected options
  cartCreationWithUserOptions() {
    this.loaderEnable.update(() => true);
    this.residentialUserService
      .cartCreationWithUserOptions(
        this.deliveryId,
        this.cart_product,
        this.droppyAdded,
        this.deviceDeposit,
        this.cart_accessory
      )
      .subscribe({
        next: (cart) => {
          this.cart = cart.data;
          console.log('final cart from orderplacement:', this.cart);

          this.openUserDetailsSection();
        },
        error: (error) => {
          console.log('in error');
          this.loaderEnable.update(() => false);
        },
      });
  }
  userContextSubs!:Subscription
  userAuthenticationComplete(userData: any) {
    console.log('user data from login-signup from orderplacement:', userData);
    this.userContextSubs=this.userStorage.getUserContext().subscribe((data) => {
      console.log('data from user storage!@#$%^:', data);
      if (data !== null) {
        this.userLoggedIn = true;
        this.userData = JSON.parse(data.userData);
        console.log(userData)
         this.userId = this.userData._id;
         console.log(this.userData._id,this.userId)
        if (userData.status.subscribed === true) {
          this.router.navigate(['/india/dashboard']);
        }
       
      }
    });
    if (userData.success) {
      this.openAddressSection();
    }
  }

  addressSubmited(status: any) {
    console.log('addressSubmited', status);
    if (status) {
      this.openPaymentSection();
    }
  }

  orderPlacedByPayment(response: any) {
    console.log('order placed by payment called', response.order);
    if (response.paymentDone) {
      this.userStorage
        .setuserContext(response.token, response.data)
        .subscribe(() => {
          this.zone.run(() => {
            this.orderPlaced.update(() => true);
            console.log('inside payment done:', this.orderPlaced());
            this.orderDetails = response.order;
          });
        });
    }
  }

  async editAddress() {
    console.log('editAddress called');
    await this.userStorage.removeCoordinates();
    this.searchAddressPresent.update(() => false);
  }

  async mapMarkerDifferentLocation(event: any) {
    await this.userStorage.removeCoordinates();
    this.searchAddressPresent.update(() => false);
  }
}
