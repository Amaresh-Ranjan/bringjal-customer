import { inject, Injectable } from '@angular/core';
import { UserSotrageService } from '../storageRelated/user-sotrage.service';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletSocket {
   httpClient = inject(HttpClient);
  baseUrl = 'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev';
  baseUrl1 = 'http://localhost:3000/dev';
  token: any;
  headers: any;
  isPaymentVerifiedThroughWebhook: boolean = false;
  paymentProcessingStatusSubject = new BehaviorSubject<
    'inactive' | 'processing' | 'failed'|'modal-dismiss'|'success'|'initial'
  >('initial');
  paymentProcessingStatus$ = this.paymentProcessingStatusSubject.asObservable();
  destroyRef: any;
  userInfo: any;


  

  constructor(
    private router: Router,
    private userStorageService:UserSotrageService
  ) {
   const subscription = combineLatest([
      this.userStorageService.getToken,
       this.userStorageService.getUser
    ]).subscribe(([userToken,userInfo]) => {
      console.log('user token: ' + userToken);
      console.log('user info: ' + userInfo);
        this.token = userToken;
        this.headers=new HttpHeaders({
          'content-type':'application/json',
          'token':this.token
        })
        // console.log(JSON.stringify(userInfo))
      this.userInfo = userInfo
    })
     
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  private socket!: WebSocket;
  private userSocketMessageSubject = new BehaviorSubject<any>(null);
  private isConnected = false; // Track connection state
  userSocketMessage$ = this.userSocketMessageSubject.asObservable();

  connect() {
    if (typeof window === 'undefined') {
      console.error(
        'WebSocket cannot be initialized in a non-browser environment',
      );
      return;
    }

    if (this.isConnected) {
      console.warn('WebSocket already connected, skipping...');
      return;
    }

    this.socket = new WebSocket(
      `wss://b8ynbtpx0m.execute-api.ap-south-1.amazonaws.com/production?userId=${this.userInfo._id}`,
    );
    this.isConnected = true; // Prevent duplicate connections

    this.socket.onopen = () => {
      console.log('✅ WebSocket Connected');
    };

    this.socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      console.log(receivedData);
      
      if (receivedData?.method === 'Wallet-confirmation') {
        
        this.isPaymentVerifiedThroughWebhook = true;
        this.userSocketMessageSubject.next(receivedData); // Emit received messages
        this.paymentProcessingStatusSubject.next('success');
        
      }
      // this.socket.close()
    };

    this.socket.onerror = (error) => {
      console.error('⚠️ WebSocket Error:', error);
    };

    this.socket.onclose = () => {
      console.log('❌ WebSocket Disconnected');
      this.isConnected = false; // Reset flag on disconnect
      // setTimeout(()=>{
      //   this.connect()
      // },1000)
    };
  }

  disconnect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
      console.log('🔌 WebSocket Manually Disconnected');
    }
  }


  paymentResponseHandler(
    response: any,
    payamount:any
  ) {
    // this.loaderService.removeLoaderState('payment-service2');
    // this.paymentProcessingStatusSubject.next('processing')
    console.log(response,payamount)
    const interval = setTimeout(() => {
      if (!this.isPaymentVerifiedThroughWebhook) {
        this.paymentVerificationHandler(
          response,
          payamount,
        );
      }
      clearInterval(interval);
    }, 30000);
  }
  paymentVerificationHandler(
    response: any,
    payamount: number,
  ) {
    const headers = this.headers;
    // this.loaderService.setLoaderState({}).subscribe(async (loader) => {
    console.log(response,payamount)
    this.httpClient
      .post<{ status: any; result: any }>(
        `${this.baseUrl}/api/user/money/to/bringjalwallet`,
        {
          razorpay_payment_id: response.razorpay_payment_id,
          amount: payamount*100,
          userid: this.userInfo._id
        },
        { headers },
      )
      .subscribe({
        next: (data:any) => {
          console.log(data)
          if (data.success === true) {
            this.paymentProcessingStatusSubject.next('success');
           
          
          } else {
            this.paymentProcessingStatusSubject.next('failed');
         
          }
        },
        error: (err) => {
          this.paymentProcessingStatusSubject.next('failed');
          console.error('Error:', err);
        },
      });
  
  }

  handlePaymentCancelled() {
    this.disconnect();
    this.paymentProcessingStatusSubject.next('inactive');
  }

  payWithRazorpay(
    payamount: number,
  ) {
    this.paymentProcessingStatusSubject.next('processing')
    let options = {
      //production mode
      //key: "rzp_live_jDtQiASYxPcm8H",
      //trial mode
      key: 'rzp_test_HYh8S8W65Mux0x',
      amount: payamount * 100, //in paise
      name: 'Bringjal Innovations Pvt. Ltd.',
      description: 'The payment is entitled to add money to Bringjal Wallet',
      prefill: {
        name: this.userInfo.name,
        email: this.userInfo.email,
        contact: this.userInfo.mobile,
      },
      notes:{userId:this.userInfo._id,'webhook-type':'customer-app-wallet'},
      theme: {
        color: 'green',
      },
      handler: (response: any) => this.paymentResponseHandler(response,payamount),
      modal: {
        ondismiss: () => {
           this.paymentProcessingStatusSubject.next('modal-dismiss');
        },
      },
    };
  
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }
}
