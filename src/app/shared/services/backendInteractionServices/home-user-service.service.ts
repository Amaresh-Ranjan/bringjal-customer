import { DestroyRef, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { CookieStorageService } from '../storageRelated/cookie-storage.service';
import { Interesteduser } from '../../models/interesteduser.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserSotrageService } from '../storageRelated/user-sotrage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
import { AppConstants } from '../../entities/appconstants';
import { catchError, skipLast, tap, throwError } from 'rxjs';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class HomeUserServiceService {
  httpClient = inject(HttpClient);
  cookieStorage = inject(CookieStorageService);
  userStorageService = inject(UserSotrageService);
  token: any;
  user: any;
  private destroyRef = inject(DestroyRef);
  constructor() {
    const subscription = this.userStorageService.getToken.subscribe(
      (userToken) => {
        console.log('user token: ' + userToken);
        this.token = userToken;
      }
    );
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  addAddressToLocalStorage(
    latitude:any,
    longitude:any,
    primaryAddress:any
  ): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.userStorageService
        .setCordinates(latitude, longitude, primaryAddress)
        .subscribe({
          next: (data) => {
            console.log('addAddressToLocalStorage data:', data);
            observer.next('');
            observer.complete();
          },
          error: (error) => {},
        });
    });
  }

  getLocationData(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.userStorageService.getCordinates().subscribe({
        next: (userCordinates) => {
          if (
            userCordinates.latitude &&
            userCordinates.longitude &&
            userCordinates.primaryAddress
          ) {
            observer.next(userCordinates);
            console.log('getLocationData userCordinates:', userCordinates);
            observer.complete();
          } else {
            observer.next(null);
            observer.complete();
          }
        },
        error: (error) => {},
      });
    });
  }

  // servicableDeliveryAreaWithProducts(coordinates): Observable < any > {
  //   var headers = new HttpHeaders({
  //     'content-Type': 'application/json',
  // });
  // const body = {
  //     'coordinates': coordinates
  // }
  // return new Observable((observer: Observer < any > ) => {

  //   //frontend design sample start
  //   var data = {
  //     result: {
  //       minimum_required_quantity: 2,
  //       _id: 'asdasd',
  //       products: [
  //         {
  //           _id: 'asdasd',
  //           extra_amount: 10,
  //           item_name: 'Bringjal Watercan',
  //           item_base_price: 90,
  //           item_deposit: 150,
  //           item_type: 'Product',
  //           item_cgst: 0,
  //           item_sgst: 0,
  //           item_igst: 0,
  //           item_price: 100,
  //         }
  //       ],
  //       accessories: [
  //         {
  //           item_name: "Bubble Top Dispenser",
  //           item_base_price: 90,
  //           extra_amount: 0,
  //           item_tyoe: "Accessory",
  //           item_cgst: 0,
  //           item_sgst: 0,
  //           item_igst: 0,
  //           item_price: 90,
  //           images: ["https://res.cloudinary.com/dug99qncm/image/upload/c_scale,h_100,q_30/v1585924709/watercans/editedCanSmall.png"]
  //         }
  //       ],
  //       discountPerQuantity: {
  //         oneCan: 0,
  //         twoCans: 15,
  //         threeCans: 20,
  //         fourCans: 25
  //       },
  //       maximum_quantity: 3,
  //       devicePresent: false,
  //       deviceDeposit: 500,
  //       floorChargesPerFloor: 10,
  //       floorCharges: true,
  //       floorLimit: 2,
  //       deliveryChargePresent: true,
  //       deliveryChargePerCan: 10,
  //       DeliveryEstimation: {
  //         eta: {
  //           delivery_time_formatted_date: "",
  //           delivery_time_formatted_day: "",
  //           delivery_time_start_time: "",
  //           delivery_time_end_time: "",
  //           eta_message: "Delivery will be completed between,29-04-2024, Monday, 08:00 AM to 11:30 AM"
  //         }
  //       },
  //       holidays: [
  //         {date: '01-11-2023', message: "ajsgdf jahsgv jashgdja"},
  //         {date: '20-03-2024', message: "ajsgdf jahsgv jashgdja"}
  //       ],
  //       deliveryDays: [
  //           {day: 'Monday', enable: true, slots: [{cutoff: '07:00', deliveryStartTime: '08:00', deliveryEndTime: '11:30', enable: true, available: true}, {cutoff: '14:00', deliveryStartTime: '16:00', deliveryEndTime: '20:30', enable: true, available: true}]},
  //           {day: 'Tuesday', enable: false, slots: []},
  //           {day: 'Wednesday', enable: true, slots: [{cutoff: '07:00', deliveryStartTime: '08:00', deliveryEndTime: '11:30', enable: true, available: true}, {cutoff: '14:00', deliveryStartTime: '16:00', deliveryEndTime: '20:30', enable: false, available: true}]},
  //           {day: 'Thursday', enable: true, slots: [{cutoff: '09:00', deliveryStartTime: '10:00', deliveryEndTime: '14:30', enable: true, available: true}, {cutoff: '16:22', deliveryStartTime: '16:00', deliveryEndTime: '20:30', enable: true, available: true}]},
  //           {day: 'Friday', enable: true, slots: [{cutoff: '13:00', deliveryStartTime: '14:00', deliveryEndTime: '18:30', enable: false, available: true}]},
  //           {day: 'Saturday', enable: true,slots: [{cutoff: '13:40', deliveryStartTime: '14:00', deliveryEndTime: '18:30', enable: false, available: true}, {cutoff: '20:22', deliveryStartTime: '20:00', deliveryEndTime: '23:30', enable: true, available: false}]},
  //           {day: 'Sunday', enable: false, slots: []}
  //       ]
  //      },
  //      pointInsideDeliveryArea: false
  //   }
  //   //frontend design sample end

  //   observer.next(data);
  //   observer.complete();
  // });
  // }

  // Intrested user who is out of delivery area api call

  interestedButOutOfServicAreaeUser(
    interestedUser: Interesteduser
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      name: interestedUser.name,
      email: interestedUser.email,
      mobile: interestedUser.mobile,
      primary_address: interestedUser.primary_address || null,
      longitude: interestedUser.longitude || null,
      latitude: interestedUser.latitude || null,
    };

    console.log('Interested user data:', JSON.stringify(body));

    const url = `${AppConstants.baseapiUrl}${AppConstants.interestedArea}`;
    console.log('Interested user URL:', url);
    console.log('Interested user headers:', headers);
    console.log('Interested user body:', body);
    return this.httpClient.post(url, body, { headers }).pipe(
      tap((data) => {
        console.log('Interested area user data tapped:', data);
        return data;
      }),
      catchError((error) => {
        console.error('Error in interestedButOutOfServicAreaeUser:', error);
        return throwError(
          () => new Error('Failed to submit interested user data')
        );
      })
    );
  }
  // interestedButOutOfServicAreaeUser(
  //   interesteduser: Interesteduser
  // ): Observable<any> {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   var body = {
  //     name: interesteduser.name,
  //     email: interesteduser.email,
  //     mobile: interesteduser.mobile,
  //     primary_address: interesteduser.primary_address,
  //     longitude: interesteduser.longitude,
  //     latitude: interesteduser.latitude,
  //   };
  //   console.log(JSON.stringify(body));
  //   var url =
  //     'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/interested/user/out/of/service/area';
  //   return new Observable((observer: Observer<any>) => {
  //     this.httpClient
  //       .post(url, JSON.stringify(body), options)
  //       .subscribe((data) => {
  //         console.log('This is intrestedArea user data', data);
  //         observer.next(data);
  //         observer.complete();
  //       });
  //   });
  // }

  cartCreationWithUserOptions(
    deliveryAreaId: string,
    package_details: any,
    device_present: boolean,
    deviceDeposit: number,
    accessory_details: any
  ) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    var body = {
      deliveryAreaId: deliveryAreaId,
      package_details: package_details,
      device_present: device_present,
      deviceDeposit: deviceDeposit,
      accessory_details: accessory_details,
    };
    console.log('Cart data:', JSON.stringify(body));
    var url = AppConstants.baseapiUrl2 + AppConstants.cartCreation;

    return new Observable((observer: Observer<any>) => {
      this.httpClient
        .post(url, JSON.stringify(body), options)
        .subscribe((data) => {
          console.log('This is cart data', data);
          observer.next(data);
          observer.complete();
        });
    });
  }

  addWatercanPackageToUser(
    item: any,
    qty: number,
    userLoggedIn: boolean,
    guestId: string,
    userId: string,
    deliveryId: string
  ): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      if (userLoggedIn) {
        var data = {
          userData: 'asdsad',
          userToken: 'asdsadsadsa',
          cart: { cartId: 'asdasd' },
        };
        this.userStorageService
          .setuserContext(data.userToken, data.userData)
          .subscribe(() => {
            observer.next(data.cart);
            observer.complete();
          });
      } else {
        var dataa = {
          userData: null,
          userToken: null,
          cart: { cartId: 'asdasd' },
        };

        observer.next(dataa.cart);
        observer.complete();
      }
    });
  }

  addDeviceToUser(deliveryAreaId: string, cartId: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      var cart = { cartId: 'asdasd' };

      observer.next(cart);
      observer.complete();
    });
  }

  addAccessoryToCart(item: any, cartId: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      var cart = { cartId: 'asdasd' };

      observer.next(cart);
      observer.complete();
    });
  }

  //user signup
  userSignup(user: User): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      var body = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
        whatsup:user.whatsup,
        referral:user?.referral
      };
      console.log(body);
      const url = AppConstants.baseapiUrl + AppConstants.signUp;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          console.log(
            'user from signup @userResidentialService @userSignup',
            data
          );
          var decodedToken = helper.decodeToken(data.token);
          observer.next(decodedToken.user._id);
          observer.complete();
        },
        error: (error: any) => {
          console.log(error)
          observer.error(error);
        },
      });
    });
  }

  // signup otp submit
  signupOtpSubmit(otpcode:any, userid:any, mobile:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const body = {
        otp: otpcode,
        userid: userid,
        mobile: mobile,
      };
      console.log(body);
      const url = AppConstants.baseapiUrl + AppConstants.signUpOTPVreification;
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          console.log(
            'data of @residentialUserService @signupOtpSubmit ',
            data
          );
          var decodedToken = helper.decodeToken(data.token);
          let referralAmount = data.referral_amount_added;
          console.log(decodedToken);
          this.userStorageService
            .setuserContext(data.token, decodedToken.user)
            .subscribe((data) => {
              observer.next(referralAmount);
              observer.complete();
            });
        },
        error: (error: any) => {
          observer.error(error);
        },
      });
    });
  }

  //retry otp
  otpRetry(mobile:any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
     const url = AppConstants.baseapiUrl + AppConstants.retryOTP;
    return new Observable((observer: Observer<any>) => {
      this.httpClient.post(url, {mobile}, options).subscribe({
        next: (data: any) => {
          console.log('@residentialService @otpRetry, data:', data);
          observer.next('');
          observer.complete();
        },
        error: (error: any) => {
          observer.error(error);
        },
      });
    });
  }

  //send otp
  sendOTP(mobile:any){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      mobile: mobile,
    };
    const url = AppConstants.baseapiUrl + AppConstants.sendOTP;
   
    return  this.httpClient.post(url, JSON.stringify(body), options)
  }

  //User login
  userLogin(user: User): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      mobile: user.mobile,
      password: user.password,
    };
    var url = AppConstants.baseapiUrl + AppConstants.login;
    return new Observable((observer: Observer<any>) => {
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          console.log('user data on login', data);
          if (data.verificationDone) {
            var decodedToken = helper.decodeToken(data.token);
            console.log('decoded token', decodedToken, decodedToken.user);
            this.userStorageService
              .setuserContext(data.token, decodedToken.user)
              .subscribe((data) => {
                console.log('login data', data);
                var user = {
                  verification: data.userData.status.verified,
                  subscribed: data.userData.status.subscribed,
                  userid: data.userData._id,
                };
                console.log(user);
                observer.next(user);
                observer.complete();
              });
          } else {
            observer.next({
              verification: false,
              subscribed: false,
              userid: data.userData._id,
            });
            observer.complete();
          }
        },
        error: (error: any) => {
          observer.error(error);
        },
      });
    });
  }

  //Forgot Password Number Submit
  forgetPassNumSubmit(usermobile:any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      mobile: usermobile,
    };
    var url = AppConstants.baseapiUrl + AppConstants.forgetPasswordSendOtp;
    return new Observable((observer: Observer<any>) => {
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          console.log('@residentialService @forgetPassNumSubmit data:', data);
          observer.next(data.mobile);
          observer.complete();
        },
        error: (error: any) => {
          observer.error(error);
        },
      });
    });
  }

  //forget password on otp submit
  forgetPassOtpSubmit(otpcode:any, mobile:any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      mobile: mobile,
      otp: otpcode,
    };
    console.log('body home service file ==========>>>>>>>', body);
    var url = AppConstants.baseapiUrl + AppConstants.forgetPasswordVerifyOtp;
    return new Observable((observer: Observer<any>) => {
      this.httpClient.post(url, body, options).subscribe({
        next: (data: any) => {
          console.log('@residentialService @forgetPassOtpSubmit data:', data);
          var decodedToken = helper.decodeToken(data.token);
          observer.next(data.token);
          observer.complete();
        },
        error: (error: any) => {
          observer.error(error);
        },
      });
    });
  }

  //new password submit
  newPasswordSubmit(updatedPassword:any, token:any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: token,
      }),
    };
    // console.log(token);
    const body = {
      password: updatedPassword,
    };
    // console.log(JSON.stringify(body));
    var url = AppConstants.baseapiUrl + AppConstants.updateUserPassword;
    return new Observable((observer: Observer<any>) => {
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          var decodedToken = helper.decodeToken(data.token);
          console.log('decoded token data from new password', decodedToken);
          this.userStorageService
            .setuserContext(data.token, decodedToken.user)
            .subscribe((data) => {
              console.log('new password updated data from new password', data);
              let userData = {
                verification: false,
                subscribed: data.userData.status.subscribed,
                userid: data.userData._id,
              };
              console.log('from new password sending data.....', userData);
              observer.next(userData);
              observer.complete();
            });
        },
        error: (error: any) => {
          observer.error(error);
        },
      });
    });
  }

  getReferralTransaction(userid:any,skip:any, limitNum:any){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.token,
      }),
    };
    // console.log(token);
    const body = {
      userid,
      limitNum,
      skip
    };
    return this.httpClient.post('https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/api/user/fetch/referral/transList', JSON.stringify(body), options)
  }

  joinDeviceWaitingList(userData:any){
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     token: this.token,
    //   }),
    // };
    // console.log(userData,options,this.token);
    // const body = {
    //  ...userData
    // };
    return this.httpClient.post('https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/user/Device/waitlist/User', JSON.stringify(userData))
  }

  attachAddressToUser(
    place:any,
    latitude:any,
    longitude:any,
    secondaryAddress:any,
    landmark:any,
    floor:any,
    lift:any,
    userid:any
  ): Observable<any> {
    const body = {
      place: place,
      latitude: latitude,
      longitude: longitude,
      secondary: secondaryAddress,
      landmark: landmark,
      floor: floor,
      lift: lift,
      userid
    };
    console.log('body of attach address:', body);
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      const url =
        'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/add/user/address';
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          observer.next(data);
          observer.complete();
        },
        error: (error: any) => {
          observer.error(error);
        },
      });
    });
  }

  removeUserAddress(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          var headers = new HttpHeaders({
            'content-Type': 'application/json',
            token: data.userToken,
          });
        },
      });
    });
  }

  //get user address setails
  // getUserAddressDetails(): Observable < any > {
  //   return new Observable((observer: Observer < any > ) => {
  //     this.userStorageService.getUserContext().subscribe({
  //       next: (data) => {
  //         var headers = new HttpHeaders({
  //           'content-Type': 'application/json',
  //           'token': data.userToken
  //         });
  //         var body={};
  //         var url = AppConstants.baseapiUrl  + AppConstants.getUserAddressDetails;
  //         this.httpClient.get(url, {headers}).subscribe(data => {
  //           console.log("@residentialService @getUserAddressDetails data:", data);
  //           observer.next(data);
  //           observer.complete();
  //         });
  //       }
  //     });

  //   });

  // }

  getUserAddressDetails(userid:any){
    
      console.log('getUserAddressDetails called............');
      console.log('method call to get user');
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      console.log('get userAddress details token', this.token);
     
      const url = AppConstants.baseapiUrl + AppConstants.getUserAddressDetails;
      console.log(url)
      console.log({userid:userid})
      return this.httpClient.post<{userAddressAttached:any,data:any}>(url,{"userid":userid}, options);
    
  }

  //check address on marker change
  addressOnMarkerChange(coordinates:any, oldCoordinates:any,userid:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              token: this.token,
            }),
          };
          var body = {
            coordinates: coordinates,
            oldCoordinates: oldCoordinates,
            userid
          };
          console.log(
            'data from addressOnMarkerChange before call body:',
            body,
            options
          );
          const url =
            'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/on/address/marker/change/of/user';
          this.httpClient.post(url, JSON.stringify(body), options).subscribe({
            next: (data: any) => {
              console.log('from post post data: ', data);
              observer.next(data);
              observer.complete();
            },
            error: (error: any) => {
              observer.error(error);
            },
          });
        },
      });
    });
  }

   addressOnMarkerChangeInstallationOrder(coordinates:any, oldCoordinates:any,userid:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              token: this.token,
            }),
          };
          var body = {
            coordinates: coordinates,
            oldCoordinates: oldCoordinates,
            userid
          };
          console.log(
            'data from addressOnMarkerChange before call body:',
            body
          );
          const url =
            'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/on/Address/On/Marker/Change';
          this.httpClient.post(url, JSON.stringify(body), options).subscribe({
            next: (data: any) => {
              console.log('from post post data: ', data);
              observer.next(data);
              observer.complete();
            },
            error: (error: any) => {
              observer.error(error);
            },
          });
        },
      });
    });
  }

  getWalletAmount(userid:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      console.log('get getWalletAmount details token', this.token);
      const url =
        'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/get/money/info/in/wallet';
      this.httpClient.post(url,{userid}, options).subscribe({
        next: (responseData) => {
          console.log(
            '@residentialService getWalletAmount data:',
            responseData
          );
          observer.next(responseData);
          observer.complete();
        },
        error: (error) => {
          console.log('error from address:', error);
          observer.error(error);
        },
      });
    });
  }

  getWalletSummary(limitNum: number, skip: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };

      const body = {
        limitNum: limitNum,
        skip: skip,
      };
      const url = AppConstants.baseapiUrl + AppConstants.getWalletSummary;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data) => {
          console.log('@residentialService @getWalletSummary data:', data);
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  fetchCustomerTickets(skip: number,userid:number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };

      const body = {
        skip: skip,
        userid
      };
      console.log(body)
      const url = ` https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/api/fetch/customer/tickets/user`;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data) => {
          console.log('@residentialService @fetchCustomerTickets data:', data);
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  codCartToOrder(cartid:any,userid:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };

      const body = {
        cartid: cartid,
        userid:userid
      };
      console.log('cod order placed', body);
      var url = AppConstants.baseapiUrl2 + AppConstants.codCartOrderPlacement;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          console.log('@residentialService @codCartToOrder data:', data);
          observer.next(data);
          observer.complete();
        },
        error: (error: any) => {
          observer.error(error);
          console.log('@codCartToOrder api', error);
        },
      });
    });
  }

  onlineCartToOrder(
    razorpay_payment_id:any,
    final_amount:any,
    cart_id:any,
    final_Payable_amount:any,
    userId:any
  ): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              token: this.token,
            }),
          };

          const body = {
            cartid: cart_id,
            razorpay_payment_id: razorpay_payment_id,
            amount: final_amount,
            userId
          };

          const url =
            'https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/api/user/cart/to/order/and/cart/payment/rzrpay';
          this.httpClient.post(url, JSON.stringify(body), options).subscribe({
            next: (data: any) => {
              console.log(
                '#@#$$@residentialService @onlineCartToOrder data:',
                data
              );
              observer.next(data);
              observer.complete();
            },
            error: (error: any) => {
              observer.error(error);
              console.log(
                '@residentialService @onlineCartToOrder error:',
                error
              );
            },
          });
        },
      });
    });
  }

  applyCoupon(cartid:any, couponCode:any, qtyDiscount:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      const body = {
        cartid: cartid,
        couponCode: couponCode,
        qtyDiscount: qtyDiscount,
      };
      console.log('apply code ', body);
      const url =
        'https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/api/user/apply/coupon/code/to/cart';
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          console.log('#@#$$@residentialService @applyCoupon data:', data);
          observer.next(data);
          observer.complete();
        },
        error: (error: any) => {
          observer.error(error);
          console.log('@residentialService @applyCoupon error:', error);
        },
      });
    });
  }

  removeCoupon(cartid:any, couponCode:any, qtyDiscount:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      const body = {
        cartid: cartid,
        couponCode: couponCode,
        qtyDiscount: qtyDiscount,
      };
      console.log('remove code ', body);
      const url =
        ' https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/api/user/remove/coupon/code/from/cart';
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          console.log('#$$$@residentialService @removeCoupon data:', data);
          observer.next(data);
          observer.complete();
        },
        error: (error: any) => {
          observer.error(error);
          console.log('@residentialService @removeCoupon error:', error);
        },
      });
    });
  }

  

  addMoneyToBringjalWallet(
    razorpay_payment_id: string,
    amount: number,
    userid:any
  ): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      const body = {
        razorpay_payment_id: razorpay_payment_id,
        amount: amount,
        userid
      };
      console.log('add money ', body);
      const url =
        'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/user/addmoney/to/wallet';
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          console.log(
            '#@#$$@residentialService @addMoneyToBringjalWallet data:',
            data
          );
          observer.next(data);
          observer.complete();
        },
        error: (error: any) => {
          observer.error(error);
          console.log('@residentialService @applyCoupon error:', error);
        },
      });
    });
  }

  fetchUserDetailsUsingId(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };

      const url =
        'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/user/find/user/details/when/id/given';
      this.httpClient.post<any>(url, null, options).subscribe({
        next: (data) => {
          console.log(
            '@residentialService @editQuantityModifyPackage data:',
            data
          );
          this.userStorageService.setuserContext(data.token, data.data).subscribe(() => {})
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  changeQuantityModifyPackage(quantity: any,userid:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      const body = {
        quantity: quantity,
        userid
      };
      const url =
        AppConstants.baseapiUrl + AppConstants.editQuantityModifyPackage;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data) => {
          console.log(
            '@residentialService @editQuantityModifyPackage data:',
            data
          );
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  getOrderDetails(id: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      const body = {
        id: id,
      };
      const url =
        'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/watercan/project/user/get/order/info';
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (responseData) => {
          console.log('service @getOrderDetails data:', responseData);
          observer.next(responseData);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  getOrderDetailsByShortid(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          var headers = new HttpHeaders({
            'content-Type': 'application/json',
            token: data.userToken,
          });
        },
      });
    });
  }

  editEmail(email: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      const body = {
        email: email,
      };
      const url = AppConstants.baseapiUrl + AppConstants.editEmail;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (responseData) => {
          console.log('service @editemail data:', responseData);
          observer.next(responseData);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  editMobile(mobile: any,userid:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      var body = {
        mobile: mobile,
        userid
      };
      var url = AppConstants.baseapiUrl + AppConstants.updateMobileSendOTP;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data) => {
          console.log('Retrived data from @editMobileNumber data:', data);
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          console.log(error);
        },
      });
    });
  }

  updateMobile(mobile: any, otp: any,userid:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      var body = {
        mobile: mobile,
        otp: otp,
        userid
      };
      console.log('recived data', body);
      var url = AppConstants.baseapiUrl + AppConstants.editMobileNumber;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data) => {
          console.log('Retrived data from @editMobileNumber data:', data);
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          console.log(error);
        },
      });
    });
  }

  retryOtpMobileUpdate(mobile: any,userid:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          var headers = new HttpHeaders({
            'content-Type': 'application/json',
            token: data.userToken,
          });
          var body = {
            mobile: mobile,
            userid
          };
          var url = AppConstants.baseapiUrl + AppConstants.retryOtpMobileUpdate;
          this.httpClient
            .post(url, JSON.stringify(body), { headers })
            .subscribe({
              next: (responseData) => {
                console.log(responseData);
                observer.next(responseData);
                observer.complete();
              },
              error: (error) => {
                observer.error(error);
              },
            });
        },
        error(error) {
          observer.error(error);
          console.log('retryOtpMobileUpdate storage error', error);
        },
      });
    });
  }

  editName(name: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      var body = {
        name: name,
      };
      var url = AppConstants.baseapiUrl + AppConstants.editName;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (responseData) => {
          console.log(responseData);
          observer.next(responseData);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  getDeposits() {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          // console.log(data.userToken);
          const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              token: data.userToken,
            }),
          };
          const url = AppConstants.baseapiUrl + AppConstants.getDeposits;
          this.httpClient.get(url, options).subscribe({
            next: (responseData) => {
              console.log('Retiveted from getDeposits method:', responseData);
              observer.next(responseData);
              observer.complete();
            },
            error: (error) => {
              observer.error(error);
            },
          });
        },
        error: (error) => {
          observer.error(error);
          console.log('getDeposits storage error', error);
        },
      });
    });
  }

  getDepositTransactions(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          var headers = new HttpHeaders({
            'content-Type': 'application/json',
            token: data.userToken,
          });
          const url =
            AppConstants.baseapiUrl + AppConstants.getDepositTransactions;
          this.httpClient.get(url, { headers }).subscribe({
            next: (responseData) => {
              console.log(
                'Retiveted from getDepositTransactions method:',
                responseData
              );
              observer.next(responseData);
              observer.complete();
            },
            error: (error) => {
              observer.error(error);
              console.log(error);
            },
          });
        },
        error: (error) => {
          observer.error(error);
          console.log('getDepositTransactions storage error', error);
        },
      });
    });
  }

  generateTicket(
    name: string,
    email: string,
    mobile: string,
    description: string,
    images_array: any,
    subject: string,
    userid:any
  ): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      const body = {
        name: name,
        email: email,
        mobile: mobile,
        subject: subject,
        description: description,
        images_array: images_array,
        userid
      };
      console.log('Sending data to api', body);
      const url = AppConstants.baseapiUrl + AppConstants.generateTicket;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (responseData) => {
          console.log('Retiveted from generateTicket method:', responseData);
          observer.next(responseData);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  uploadImageGenerateTicket(file: File, folderName: string): Observable<any> {
    // const options = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //   })
    // };

    const headers = new HttpHeaders({});

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('folderName', folderName);

    console.log(
      'FormData entries:',
      formData.getAll('file'),
      formData.get('folderName')
    );
    console.log('FormData', formData);
    const url = AppConstants.uploadFiles;
    return new Observable((observer: Observer<any>) => {
      this.httpClient.post(url, formData, { headers }).subscribe({
        next: (data: any) => {
          console.log('Received data from uploadImage API method', data);
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          console.error('Error in uploadImageGenerateTicket', error);
          observer.error(error);
        },
      });
    });
  }

  getSupportTickets(skip: number): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          var headers = new HttpHeaders({
            'content-Type': 'application/json',
            token: data.userToken,
          });
        },
      });
    });
  }

  getPreviousOrders(skip:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      const body = {
        skip: skip,
      };
      console.log('get previous orders request', this.token);
      var url = AppConstants.baseapiUrl + AppConstants.getpreviousorders;
      this.httpClient.post(url, JSON.stringify(body), options).subscribe({
        next: (data: any) => {
          console.log('Get pervious orders data', data);
          observer.next(data);
          observer.complete();
        },
        error(err) {
          observer.error(err);
          console.log('Error in getPreviousOrders', err);
        },
      });
    });
  }

  placeOrderThroughApp(id:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      const url =
        'https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/api/user/place/order/according/to/package/through/webapp';
      this.httpClient.post(url, {userid:id}, options).subscribe({
        next: (responseData) => {
          console.log('Retiveted from placeorder:', responseData);
          observer.next(responseData);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }
  unsubscribePackage(id:any,Reason:any,currentlocation:boolean,availabilityDate:any) {
  
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
     const body={
      customer_id:id,
      Reason,
      currentlocation,
      availabilityDate
      }
      const url =
        'https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/api/user/add/Unsubscription/Request';
     return this.httpClient.post<any>(url, body, options)
    
  }

  cancelOrder(orderid:any,userid:any) {
     
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: this.token,
        }),
      };
      console.log(options)
      const url =
        `https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/user/cancel/order/on/a/click`;
        return  this.httpClient.post(url, {orderid,userid}, options)
    
  }

  fetchDataForOrderPlacementInDashboard(userid:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userStorageService.getUserContext().subscribe({
        next: (data) => {
          const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              token: this.token,
            }),
          };
          var url =
            'https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/api/user/get/min/and/maximum/quantity/wrt/del/area';
          this.httpClient.post(url, {userid}, options).subscribe({
            next: (data: any) => {
              console.log('fetchDataForOrderPlacementInDashboard data', data);
              if(data?.success===true){
                 observer.next(data);
              observer.complete();
              }else{
                observer.error(data);
              }
             
            },
            error(err) {
              observer.error(err);
              console.log('Error in getPreviousOrders', err);
            },
          });
        },
      });
    });
  }

  // Servicable Delivery Area Products api call
  servicableDeliveryAreaWithProducts(coordinates:any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    var body = {
      coordinates: coordinates,
    };
    console.log(
      'servicableDeliveryAreaWithProducts coordinates:',
      JSON.stringify(body)
    );
    var url =
      AppConstants.baseapiUrl + AppConstants.servicableDelAreaWithProducts;

    return new Observable<any>((observer: Observer<any>) => {
      this.httpClient
        .post(url, JSON.stringify(body), options)
        .subscribe((data) => {
          console.log(
            'Retived data from servicableDelAreaWithProducts api method ====>>',
            data
          );
          observer.next(data);
          observer.complete();
        });
    });
  }

  // uploadImageGenerateTicket(file: File, folderName: string):Observable<any> {
  //   const options = {
  //     headers: new HttpHeaders({
  //     })
  //   };

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('folderName', folderName);

  //   console.log('FormData entries:', formData.getAll('file'), formData.get('folderName'));

  //   console.log('data passing to api', formData.get)

  //   const url = AppConstants.baseapiUrl + AppConstants.uploadFiles;
  //   return new Observable((observer: Observer<any>)=>{
  //     this.httpClient.post(url, formData, options).subscribe({
  //       next: (data: any) => {
  //         console.log('Retived data from uploadImage api method', data);
  //         observer.next(data);
  //         observer.complete();
  //       },
  //       error: (error) => {
  //         observer.error(error);
  //         console.log('Error in uploadImageGenerateTicket', error);
  //       }
  //     })
  //   })
  // }
}

// post request sample

// const options = {
//   headers: new HttpHeaders({
//     "Content-Type": "application/json"
//   })
// };
// const body = ({
//   'mobile': mobile
// });
// var url="";
// return new Observable((observer: Observer < any > ) => {
//   this.httpClient.post(url,JSON.stringify(body),options).subscribe({
//     next: (data: any)=>{

//     },
//     error: (error: any) => {
//       observer.error(error);
//     }
//   });
// });

// put request sample

// const options = {
//   headers: new HttpHeaders({
//     "Content-Type": "application/json"
//   })
// };
// const body = ({
//   'mobile': mobile
// });
// var url="";
// return new Observable((observer: Observer < any > ) => {
//   this.httpClient.put(url,JSON.stringify(body),options).subscribe({
//     next: (data: any)=>{

//     },
//     error: (error: any) => {
//       observer.error(error);
//     }
//   });
// });

// get request sample

// const options = {
//   headers: new HttpHeaders({
//     "Content-Type": "application/json"
//   })
// };

// var url="";
// return new Observable((observer: Observer < any > ) => {
//   this.httpClient.get(url,options).subscribe({
//     next: (data: any)=>{

//     },
//     error: (error: any) => {
//       observer.error(error);
//     }
//   });
// });

// delete request sample

// const options = {
//   headers: new HttpHeaders({
//     "Content-Type": "application/json"
//   })
// };

// var url="";
// return new Observable((observer: Observer < any > ) => {
//   this.httpClient.delete(url,options).subscribe({
//     next: (data: any)=>{

//     },
//     error: (error: any) => {
//       observer.error(error);
//     }
//   });
// });
