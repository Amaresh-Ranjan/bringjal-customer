import {
  ErrorHandler,
  Injectable,
  Inject,
  Injector,
  PLATFORM_ID
} from '@angular/core';
import {
  HttpErrorResponse
} from '@angular/common/http';
import { GlobalService } from './global.service';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class globalErrorHandler implements ErrorHandler {
 


  constructor(@Inject(Injector) private injector: Injector, private notificationService: GlobalService, @Inject(PLATFORM_ID) private platformId: Object) {}
 
  //Handle all the errors from the application
  handleError(error: Error | HttpErrorResponse) {
    //console.log("I am in error handler");
    if (error instanceof HttpErrorResponse) {
      //server or connection error happened
      //console.log("in error instance of http error");
        if (isPlatformBrowser(this.platformId)) {
          if (!navigator.onLine) {
            //handler offline error
            this.notificationService.showDangerToast({ data: { text: 'You are not connected to internet'}, autohide: true });
            console.error("You are not connected to internet");
          } else {
            //handle http error
            if (error.error instanceof Error) {
              //console.log("I am an http error");
              this.notificationService.showDangerToast({ data: { text: 'You are not connected to internet'}, autohide: true });
              //console.log('An error occured : ', error.error.message);
            } else {
              if (error.status === 0) {
                this.notificationService.showDangerToast({ data: { text: 'Connection with server is lost'}, autohide: true });
                //console.log("Connection with server is lost");
              }
              if(error.status === 403) {
                this.notificationService.showDangerToast( { data: { text: error.error.message}, autohide: true });
                //console.log("server gives error 403 : ",error.error.message);
              }
              if(error.status === 500) {
                this.notificationService.showDangerToast( { data: { text: error.error.message}, autohide: true });
                //console.log("server gives error 500 : ",error.error.message);
              }
              if(error.status === 400) {
                this.notificationService.showDangerToast( { data: { text: error.error.message}, autohide: true });
                //console.log("server gives error 400 : ",error.error.message);
              }
              if(error.status === 404) {
                this.notificationService.showDangerToast({ data: { text: error.error.message}, autohide: true});
                //console.log("server gives error 404 : ",error.error.message);
              }
              //console.log('Backend returned status code : ', error.status);
              //console.log('Response Body', error.error);
            }
          }
        }
      
      

    } else {
      this.notificationService.showDangerToast({ data: { text: error.message}, autohide: true});

      //Handle client error
      //console.log("client error",error);
    }
  }

}
