import { Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class CookieStorageService {
  constructor(private cookieService: SsrCookieService) {}

  set(key: string, value: string, expires?: any) {
    this.cookieService.set(key, value, expires);
  }

  get(key: string) {
    return this.cookieService.get(key);
  }

  check(key: string) {
    return this.cookieService.check(key);
  }

  remove(key: string) {
    this.cookieService.delete(key);
  }

  removeAll() {
    this.cookieService.deleteAll();
  }
}
