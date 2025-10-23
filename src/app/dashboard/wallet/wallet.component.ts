import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { RelativeDatePipe } from '../../shared/pipes/luxondate.pipe';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { FooterSectionComponent } from '../../shared/comp/footer-section/footer-section.component';
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';
import { WalletSocket } from '../../shared/services/wallet-socket/wallet-socket';
import { time } from 'console';
import { Subscription } from 'rxjs';

declare var Razorpay: any;

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    RelativeDatePipe,
    ReactiveFormsModule,
    CustomLoaderComponent,
    RelativeDatePipe,
    FooterSectionComponent,
    DatePipe,
    CommonModule
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent {
  loaderEnable = signal<boolean>(false);
  walletForm: FormGroup | any;
  dBtn: boolean = false;
  walletAdd: number = 10;
  walletAmount: any;
  limit: number = 5;
  loginForm: FormGroup | any;
  subscription: any;
  previousTransactions: any[] = [];
  userData: any;
  invalidAmountError: boolean = false;
  paymentSocketSub!:Subscription
  private cdr = inject(ChangeDetectorRef);
  private userStorage = inject(UserSotrageService);
  currentOrderBal: any;
  totalTransactions: any;
  private destroyRef = inject(DestroyRef);
  constructor(
    private homeService: HomeUserServiceService,
    private walletSocket: WalletSocket,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  processingpaymentStatus:any='inactive'
  ngOnInit() {
    this.walletForm = new FormGroup({
      wallet: new FormControl(null),
    });
    this.loginForm = new FormGroup({
      mobile: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[4|5|6|7|8|9][0-9]{9}$'),
      ]),
      password: new FormControl(null, Validators.required),
    });
    // this.previousTransactions = [
    //   {
    //     _id: "5f16de25335aa94ca596d9c1",
    //     transaction_type: {
    //       credit: true,
    //       debit: false
    //     },
    //     amount: 10,
    //     description: "Added through BringJal Web Aplication",
    //     transaction_date: 1595334181021
    //   },
    //   {
    //     _id: "5f16de25335aa94ca596d9c1",
    //     transaction_type: {
    //       credit: false,
    //       debit: true
    //     },
    //     amount: 100,
    //     description: "Added through BringJal Web Aplication",
    //     transaction_date: 1595335098112
    //   },
    //   {
    //     _id: "5f16de25335aa94ca596d9c1",
    //     transaction_type: {
    //       credit: true,
    //       debit: false
    //     },
    //     amount: 10,
    //     description: "Added through BringJal Web Aplication",
    //     transaction_date: 1795334181021
    //   },
    //   {
    //     _id: "5f16de25335aa94ca596d9c1",
    //     transaction_type: {
    //       credit: false,
    //       debit: true
    //     },
    //     amount: 100,
    //     description: "Added through BringJal Web Aplication",
    //     transaction_date: 1995335098112
    //   }
    // ];
    this.loaderEnable.update(() => true);
    if (isPlatformBrowser(this.platformId)) {
      const subscription = this.homeService
        .fetchUserDetailsUsingId()
        .subscribe({
          next: (data) => {
            this.userData = data.data;
            console.log('this.userData:', this.userData);
            this.subscription = this.homeService
              .getWalletAmount(this.userData._id)
              .subscribe({
                next: (data) => {
                  console.log('wallet ammount data 21', data);
                  this.currentOrderBal = data.current_order_balance;
                  console.log('this.currentOrderBal:', this.currentOrderBal);
                  this.walletAmount = data.result.total_amount_in_wallet;
                  this.homeService.getWalletSummary(this.limit, 0).subscribe({
                    next: (data) => {
                      console.log('wallet summary data', data);
                      this.previousTransactions = data.data;
                      this.totalTransactions = data.totalTransactions;
                      this.loaderEnable.update(() => false);
                    },
                    error: (err) => {
                      console.log(err);
                      this.loaderEnable.update(() => false);
                    },
                  });
                },
                error: (error) => {
                  console.error('Error getting wallet ammount', error);
                  this.loaderEnable.update(() => false);
                },
              });
          },
          error: (error) => {
            this.loaderEnable.update(() => false);
          },
        });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });

     this.paymentSocketSub= this.walletSocket.paymentProcessingStatus$.subscribe((status)=>{
        if(status==='modal-dismiss'||status==='inactive'){
            // this.loaderEnable.update(() => false);
            this.processingpaymentStatus='inactive'

        }
        if(status==='failed'){
            // this.loaderEnable.update(() => false);
               this.processingpaymentStatus=status
        }
        if(status==='success'){
          this.paymentResponseHander()
            // this.loaderEnable.update(() => false);
        }
        if(status==='processing'){
          // this.loaderEnable.update(() => true);
          this.processingpaymentStatus=status
        }
      })

      const userSubscription = this.userStorage.getUser.subscribe({
        next: (user) => {
          if (user) {
            this.userData = user;
            console.log(user)
           this.subscription = this.homeService.getWalletAmount(this.userData._id).subscribe({
        next: (data) => {
          console.log('wallet ammount data', data);
          this.walletAmount = data.result.total_amount_in_wallet;
          this.homeService.getWalletSummary(this.limit, 0).subscribe({
            next: (data) => {
              console.log('wallet summary data', data);
              this.previousTransactions = data.data;
              this.totalTransactions=data.totalTransactions
              this.loaderEnable.update(() => false);
            },
          });
        },
        error: (error) => {
          console.error('Error getting wallet ammount', error);
          this.loaderEnable.update(() => false);
        },
      });
          }
        },
      });
      this.destroyRef.onDestroy(() => {
        this.subscription.unsubscribe();
        userSubscription.unsubscribe();
      });
    }
  }

  showmore() {
    this.loaderEnable.update(() => true);
    this.homeService
      .getWalletSummary(this.limit, this.previousTransactions.length)
      .subscribe({
        next: (data) => {
          console.log('wallet summary data', data);
          var transactions = data.data;
          transactions.forEach((el: any) => {
            this.previousTransactions.push(el);
          });
          this.totalTransactions = data.totalTransactions;
          this.loaderEnable.update(() => false);
        },
      });
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

  ngOnDestroy() {
    
    if (this.paymentSocketSub) {
      this.paymentSocketSub.unsubscribe();
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
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
    this.addMoneyToBringjalWallet();
  }

  getCountDownTimer() {
    let min = Math.floor(this.countdown / 60);
    let sec = this.countdown % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  }

  onCancelPayment() {
    this.processingpaymentStatus = 'inactive';
  }
  addTh() {
    this.walletForm.patchValue({ wallet: 1000 });
    this.cdr.detectChanges();
  }
  addMoneyToBringjalWallet() {
    this.invalidAmountError = false;
    if (this.userData?.PendingAmount > this.walletForm.get('wallet').value) {
      this.invalidAmountError = true;
      return;
    }
    
    this.countdown = 420;
    this.startCountdown();
    // this.processingpaymentStatus='processing'
    console.log('wallet amount submit:', this.walletForm.value.wallet);
    this.walletSocket.connect()
    this.walletSocket.payWithRazorpay(this.walletForm.value.wallet);
    // let options = {
    //   //production mode
    //   //key: "rzp_live_jDtQiASYxPcm8H",
    //   //trial mode
    //   key: 'rzp_test_HYh8S8W65Mux0x',
    //   amount: this.walletForm.value.wallet * 100, //in paise
    //   name: 'Bringjal Innovations Pvt. Ltd.',
    //   description: 'The payment is entitled to add money to Bringjal Wallet',
    //   prefill: {
    //     name: this.userData.name,
    //     email: this.userData.email,
    //     contact: this.userData.mobile,
    //   },
    //   theme: {
    //     color: 'green',
    //   },
    //   handler: (response: any) => this.paymentResponseHander(response),
    //   modal: {
    //     ondismiss: () => {
    //       this.loaderEnable.update(() => false);
    //     },
    //   },
    // };
    // let rzp = new Razorpay(options);
    // rzp.open();
  }

  paymentResponseHander() {
    console.log('in paymentResponseHander');
    // this.loaderEnable.update(() => true);
    //this.showOrHideLoader()
    this.cdr.detectChanges();
    // this.homeService
    //   .addMoneyToBringjalWallet(
    //     response.razorpay_payment_id,
    //     this.walletForm.value.wallet * 100,
    //     this.userData._id
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       console.log('data response:', data);
    //       this.walletForm.reset();
    //       this.walletAmount = data.wallet.total_amount_in_wallet;
    //       this.subscription = this.homeService
    //         .getWalletAmount(this.userData._id)
    //         .subscribe({
    //           next: (data) => {
    //             console.log('wallet ammount data 1', data);
    //             this.walletAmount = data.result.total_amount_in_wallet;
    //               this.currentOrderBal = data.current_order_balance;
    //               console.log('this.currentOrderBal:', this.currentOrderBal);
    //              this.userData=data.Userdata
    //              console.log(this.userData?.PendingAmount)
    //             this.userStorage
    //               .setuserContext(data.token, data.Userdata)
    //               .subscribe((data) => {
    //                 console.log(data);
    //                 this.userData = data;
    //               });
    //             this.homeService.getWalletSummary(this.limit, 0).subscribe({
    //               next: (data) => {
    //                 console.log('wallet summary data', data);
    //                 this.previousTransactions = data.data;
    //                 this.totalTransactions = data.totalTransactions;
    //                 this.loaderEnable.update(() => false);
    //               },
    //             });
    //           },
    //           error: (error) => {
    //             console.error('Error getting wallet ammount', error);
    //             this.loaderEnable.update(() => false);
    //           },
    //         });
    //     },
    //   });
    this.subscription = this.homeService
            .getWalletAmount(this.userData._id)
            .subscribe({
              next: (data) => {
                console.log('wallet ammount data 1', data);
                this.walletAmount = data.result.total_amount_in_wallet;
                  this.currentOrderBal = data.current_order_balance;
                  console.log('this.currentOrderBal:', this.currentOrderBal);
                 this.userData=data.Userdata
                 console.log(this.userData?.PendingAmount)
                this.userStorage
                  .setuserContext(data.token, data.Userdata)
                  .subscribe((data) => {
                    console.log(data);
                    this.userData = data;
                  });
                this.homeService.getWalletSummary(this.limit, 0).subscribe({
                  next: (data) => {
                    console.log('wallet summary data', data);
                    this.previousTransactions = data.data;
                    this.totalTransactions = data.totalTransactions;
                    // this.loaderEnable.update(() => false);
                    this.processingpaymentStatus='inactive'
                  },
                });
              },
              error: (error) => {
                console.error('Error getting wallet ammount', error);
                // this.loaderEnable.update(() => false);
                this.processingpaymentStatus='inactive'
              },
            });
  }
  addFHun() {
    this.walletForm.patchValue({ wallet: 500 });
    this.cdr.detectChanges();
  }
  addHun() {
    this.walletForm.patchValue({ wallet: 100 });
    this.cdr.detectChanges();
  }
  activeSegment: string = 'walletTransactionsHistory'; // Default to 'segment1'

  setActiveSegment(segment: string) {
    this.activeSegment = segment;
  }
}
