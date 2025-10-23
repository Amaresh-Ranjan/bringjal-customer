import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { resolve } from 'path';
import { rejects } from 'assert';
import { AppConstants } from '../../shared/entities/appconstants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { WalletSocket } from '../../shared/services/wallet-socket/wallet-socket';
import { OrderSocket } from '../../shared/services/order-socket/order-socket';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  cod: boolean = true;
  online: boolean = false;
  ERRORPAYMENT:string|any;
  dBtnOrder: boolean|any;
  secondaryAddress: string|any;
  primaryAddress: string|any;
  landmark: string|any;
  floor: number|any;
  lift: boolean|any;
  qtyDiscount: number = 0;
  coupon: string|any;
  couponForm: FormGroup|any;
  subscription:any
  addressSubscription:any
  httpClient=inject(HttpClient)
  paymentSocketSub!:Subscription
  @Input() cart: any;
  @Input() user: any;
  @Output() loaderToggle = new EventEmitter<boolean>();
  @Output() operationSuccess = new EventEmitter<any>();
  @Output() editAddressEmit = new EventEmitter<boolean>();
  @Output() cartUpdated = new EventEmitter<any>();
  processingpaymentStatus:any='inactive'

  couponApplied: boolean|any;
  couponSuc: string|any;
  couponErr: string|any;
  couponSuccess: boolean|any;

  cartId: any;

  final_amount: number|any;
  order_total: number|any;
  bringjalCash: number|any;
  private destroyRef = inject(DestroyRef);
  private _ResidentialUserService = inject(HomeUserServiceService);
  private cdr = inject(ChangeDetectorRef);
  private cookieStorage = inject(SsrCookieService);
  private userStorage = inject(UserSotrageService);
  constructor(
     private orderSocket: OrderSocket,
  ){}

 async ngOnInit() {
    this.couponForm = new FormGroup({
      coupon: new FormControl(null),
    });
    console.log('checkin the cart data', this.cart);
    console.log('checkin the user data', this.user);
    this.cartId = this.cart?._id;
    console.log('cart id ...', this.cartId);
    this.order_total = this.cart?.final_Payable_amount;
    this.showOrHideLoader();
   try{
    await this.getAddressData()
    await this.getWalletData()
   }catch(err){
    console.log(err)
   }finally{
    this.HideLoader()
    console.log("*******", "hideloader")
   }


    this.paymentSocketSub= this.orderSocket.paymentProcessingStatus$.subscribe((status)=>{
        if(status==='modal-dismiss'||status==='inactive'){
            // this.loaderEnable.update(() => false);
            this.processingpaymentStatus='inactive'

        }
        if(status==='failed'){
            // this.loaderEnable.update(() => false);
               this.processingpaymentStatus=status
        }
        if(status==='success'){
          // this.paymentResponseHander()
          
           
            // this.loaderEnable.update(() => false);
        }
        if(status==='processing'){
          // this.loaderEnable.update(() => true);
          this.processingpaymentStatus=status
        }
      })
   
        this.orderSocket.userSocketMessage$.subscribe((res)=>{
            console.log(res)
             this.operationSuccess.emit(res);
          })
   
  }
  userinfo:any
userContextSub!:Subscription
  getWalletData():Promise<void>{
return new Promise((resolve,reject)=>{
  this.userContextSub=this.userStorage.getUser.subscribe((user)=>{
   this.userinfo=user
   this.subscription = this._ResidentialUserService
  .getWalletAmount(this.userinfo._id)
  .subscribe({
    next: (data) => {
      console.log('wallet amount', data);
      this.bringjalCash = data.result.total_amount_in_wallet;
      console.log('bringjal cash', this.bringjalCash);
     
      if (this.order_total - this.bringjalCash >= 0) {
        this.final_amount = this.order_total - this.bringjalCash;
        console.log('final_amount', this.final_amount);
      } else {
        this.final_amount = 0;
      }
      
     resolve()
    },
    error:(err) =>{
      console.log(err)
     reject(err)
    },
  });
  })
  
})
  }

  ngOnDestroy(){
    if(this.userContextSub){
      this.userContextSub.unsubscribe()
    }
      if (this.paymentSocketSub) {
      this.paymentSocketSub.unsubscribe();
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
  getAddressData():Promise<void>{
    return new Promise((resolve,reject)=>{
      var userToken = this.cookieStorage.get('__bringjal_user_token');
       const options = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                token: userToken,
              }),
            };
      const url ="https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/user/get/user/address/details";
           console.log(url)
           console.log({"userid":this.user._id})
           return this.httpClient.post<{userAddressAttached:any,data:any}>(url,{"userid":this.user._id}, options).subscribe({
        next: (data) => {
          console.log(data)
          this.primaryAddress = data.data.primary_address;
          this.secondaryAddress = data.data.secondary_address;
          this.landmark = data.data.landmark;
          this.floor = data.data.floor;
          this.lift = data.data.lift;
          resolve()
        },
        error:(err) =>{
          reject(err)
        },
      });
    })
      }

  editAddress() {
    console.log('edit address emit called');
    this.editAddressEmit.emit(true);
  }

  ChangeBlockToCOD() {
    this.cod = true;
    this.online = false;
  }
  ChangeBlockToOnline() {
    this.cod = false;
    this.online = true;
  }

  confirmCodOrder() {
    this.ERRORPAYMENT=""
    this.dBtnOrder = false;
    this.showOrHideLoader();
    this._ResidentialUserService.codCartToOrder(this.cartId,this.user._id).subscribe({
      next: (data:any) => {
        console.log('Cash on delivery order place', data);
        var res = {
          paymentDone: true,
          editAddress: false,
          accessoryAddedOrRemoved: false,
          order: data.order,
          user: data.data,
          token: data.token,
        };
        this.cdr.detectChanges();
        console.log('response:', res);
        this.HideLoader();
        this.cdr.detectChanges();
        this.operationSuccess.emit(res);
      },
      error:(err:any)=> {
        console.log(err)
        this.ERRORPAYMENT=err.error.message
        this.HideLoader();
      },
    });
  }

  confirmOnlineOrder() {
      this.countdown = 420;
    this.startCountdown();
    // this.processingpaymentStatus='processing'

    this.orderSocket.connect()
    this.orderSocket.payWithRazorpay(this.final_amount,this.cartId)
    // console.log('payment online clicked')
    // let options = {
    //   //production mode
    //   //key: "rzp_live_jDtQiASYxPcm8H",
    //   //trial mode
    //   key: 'rzp_test_HYh8S8W65Mux0x',
    //   amount: this.final_amount * 100, //in paise
    //   name: 'Bringjal Innovations Pvt. Ltd.',
    //   description: 'The payment is entitled to BringJal for providing service',
    //   prefill: {
    //     name: this.user?.name,
    //     email: this.user?.email,
    //     contact: this.user?.mobile,
    //   },
    //   theme: {
    //     color: 'green',
    //   },
    //   handler: this.paymentResponseHander.bind(this),
    // };
    // console.log(options)
    // const rzp = new (window as any).Razorpay(options);
    // rzp.open();
    
  }

  // paymentResponseHander(response: any) {
  //   this.ERRORPAYMENT=""
  //   this.showOrHideLoader();
  //   this.cdr.detectChanges();
  //   this._ResidentialUserService
  //     .onlineCartToOrder(
  //       response.razorpay_payment_id,
  //       this.final_amount * 100,
  //       this.cart._id,
  //       this.cart.final_Payable_amount,
  //       this.userinfo._id
  //     )
  //     .subscribe({
  //       next: (data) => {
  //         var res = {
  //           paymentDone: true,
  //           editAddress: false,
  //           accessoryAddedOrRemoved: false,
  //           order: data.order,
  //           user: data.data,
  //           token: data.token,
  //         };
  //         this.cdr.detectChanges();
  //         console.log('response:', res);
  //         this.HideLoader();
  //         this.cdr.detectChanges();
  //         this.operationSuccess.emit(res);
  //       },
  //       error:(err:any) =>{
  //         console.log(err)
  //         this.ERRORPAYMENT=err.error.message
  //         this.HideLoader();
  //       },
  //     });
  // }
  
  applyCoupon() {
    this.couponErr=null
    this.showOrHideLoader();
    var x = this.couponForm.value.coupon;
    this.coupon = x
    console.log('coupon code:', this.coupon);
    this.cart.items.forEach((el:any) => {
      if (el.item_type == 'Product') {
        this.qtyDiscount = el.per_item_discount;
      }
    });
    this._ResidentialUserService
      .applyCoupon(this.cartId, this.coupon, this.qtyDiscount)
      .subscribe({
        next: (data) => {
          this.cart = data.cart;
          this.cartUpdated.emit(this.cart);
          console.log('apply coupon data', this.cart);
          this.couponApplied = true;
          this.couponForm.reset();
          this.order_total = data.cart.final_Payable_amount;
          console.log(
            'order total amount to apply coupon',
            this.order_total,
            this.coupon
          );
          if (this.order_total - this.bringjalCash >= 0) {
            this.final_amount = this.order_total - this.bringjalCash;
            console.log('final_amount', this.final_amount);
          } else {
            this.final_amount = 0;
          }
          this.HideLoader();
        },
        error: (err:any) => {
          console.log('Error in applying coupon', err);
          // alert(err?.error?.message)
          this.couponErr = err?.error?.message
          this.couponApplied = false;
          this.HideLoader();
        },
      });
  }

  removeCoupon() {
    this.couponErr=null
    console.log('coupon code:', this.coupon);
    this.showOrHideLoader();
    this._ResidentialUserService
      .removeCoupon(this.cartId, this.coupon, this.qtyDiscount)
      .subscribe({
        next: (data) => {
          this.cart = data.cart.result;
          this.cartUpdated.emit(this.cart);
          console.log('remove coupon data', this.cart);
          this.order_total = this.cart.final_Payable_amount;
          console.log('order total', this.order_total);
          if (this.order_total - this.bringjalCash >= 0) {
            this.final_amount = this.order_total - this.bringjalCash;
            console.log('final_amount', this.final_amount);
          } else {
            this.final_amount = 0;
          }
          this.couponApplied = false;
          this.HideLoader();
        },
        error: (err:any) => {
          console.log('Error in remove coupon', err);
          this.couponErr = err?.error?.message
          this.HideLoader();
        },
      });
  }

  showOrHideLoader() {
    this.loaderToggle.emit(true);
  }
  HideLoader() {
    this.loaderToggle.emit(false);
  }

  
  countdown: number = 300;
  private countdownInterval: any;
  onContinue() {
    return;
  }

   startCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      // const countdownElement = document.getElementById('countdown');
      // if (countdownElement) {
      //   countdownElement.textContent = `${this.countdown}s`;
      // }

      if (this.countdown <= 0) {
        this.completePayment();
      }
    }, 1000);
  }

  


  isProcessing = true;

  // Update completePayment method
  completePayment() {
    clearInterval(this.countdownInterval);
    this.processingpaymentStatus = 'inactive';
    this.isProcessing = false;
  }

  // Add these new methods
  onRetryPayment() {
    this.confirmOnlineOrder()
    // this.addMoneyToBringjalWallet();
  }

  getCountDownTimer() {
    let min = Math.floor(this.countdown / 60);
    let sec = this.countdown % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  }

  onCancelPayment() {
    this.processingpaymentStatus = 'inactive';
  }

}
