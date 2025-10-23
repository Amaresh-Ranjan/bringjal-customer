import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';




@Injectable({
    providedIn: 'root'
  })
export class LoaderService {
    public loaderSubject = new BehaviorSubject < boolean > (false);
    public getLoaderDetails$ = this.loaderSubject.asObservable();

    enableLoader(){
      console.log('loader enable')
      this.loaderSubject.next(true);
    }

    disableLoader(){
      console.log('loader disable')
      this.loaderSubject.next(false);
      
    }
}