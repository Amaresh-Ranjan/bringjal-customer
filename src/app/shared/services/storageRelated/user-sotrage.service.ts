import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class UserSotrageService {
  private userDetailsSubject = new BehaviorSubject<any>(null);
  public getUser = this.userDetailsSubject.asObservable();

  private userLoggedIn = new BehaviorSubject<boolean>(false);
  public getLoggedIn = this.userLoggedIn.asObservable();

  private tokenSubject = new BehaviorSubject<string|null>(null);
  public getToken = this.tokenSubject.asObservable();

  constructor(private cookieStorage: SsrCookieService) {}

  setuserContext(token:any, userData:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      console.log('setuserContext called');
      this.cookieStorage.set('__bringjal_user_token', token,{
        expires: 1652,
        sameSite: 'Lax',
        path: '/',
      });
      this.cookieStorage.set('userData', JSON.stringify(userData),{
        expires: 1652,
        sameSite: 'Lax',
        path: '/',
      });
      this.userLoggedIn.next(true);
      this.tokenSubject.next(token);
      this.userDetailsSubject.next(userData);
      var user = {
        userToken: token,
        userData: userData,
      };
      observer.next(user);
      observer.complete();
    });
  }

  getUserContext(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.userLoggedIn.next(false);
      var userData = this.cookieStorage.get('userData');
      var userToken = this.cookieStorage.get('__bringjal_user_token');
      // console.log('hjk',userData, userToken);
      if (userToken) {
        let user = {
          userToken: userToken,
          userData: userData,
        };
        this.userLoggedIn.next(true);
        this.tokenSubject.next(userToken);
        this.userDetailsSubject.next(JSON.parse(userData));
        observer.next(user);
        observer.complete();
      } else {
        this.cookieStorage.delete('userData', '/');
        this.cookieStorage.delete('__bringjal_user_token', '/');
        this.userLoggedIn.next(false);
        this.tokenSubject.next(null);
        this.userDetailsSubject.next(null);
        observer.next(null);
        observer.complete();
      }
    });
  }

  logout(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.cookieStorage.delete('userData', '/');
      this.cookieStorage.delete('__bringjal_user_token', '/');
      this.userLoggedIn.next(false);
      this.tokenSubject.next(null);
      this.userDetailsSubject.next(null);
      observer.next(true);
      observer.complete();
    });
  }

  setCordinates(latitude:any, longitude:any, primaryAddress:any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      console.log(
        'latitude, longitude, primaryAddress:',
        latitude,
        longitude,
        primaryAddress
      );
      var userCordinates = {
        latitude: this.cookieStorage.set('lat', latitude,{
        sameSite: 'Lax',
        path: '/',
      }),
        longitude: this.cookieStorage.set('lng', longitude,{
        sameSite: 'Lax',
        path: '/',
      }),
        primaryAddress: this.cookieStorage.set(
          'str',
          primaryAddress,
         {
        sameSite: 'Lax',
        path: '/',
      }
        ),
      };
      observer.next(userCordinates);
      observer.complete();
    });
  }

  getCordinates(): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      var userCordinates = {
        latitude: this.cookieStorage.get('lat'),
        longitude: this.cookieStorage.get('lng'),
        primaryAddress: this.cookieStorage.get('str'),
      };
      observer.next(userCordinates);
      observer.complete();
    });
  }

  removeCoordinates() {
    new Promise(async (resolve, reject) => {
      console.log(
        'inside of removeCoordinates',
        this.cookieStorage.get('lat'),
        this.cookieStorage.get('lng'),
        this.cookieStorage.get('str')
      );
      if (this.cookieStorage.get('lat') !== null) {
        await this.cookieStorage.delete('lat', '/');
      }
      if (this.cookieStorage.get('lng') !== null) {
        await this.cookieStorage.delete('lng', '/');
      }
      if (this.cookieStorage.get('str') !== null) {
        await this.cookieStorage.delete('str', '/');
      }
      resolve(true);
    });
  }
}
