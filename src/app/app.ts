import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSotrageService } from './shared/services/storageRelated/user-sotrage.service';
import { DataLayerService } from './shared/services/common/data-layer.service';
import { Subscription } from 'rxjs';
import { CustomLoaderComponent } from './shared/comp/custom-loader/custom-loader.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,NgbModule,CustomLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isBrowser:any
  protected readonly title = signal('bringjalWebsite2025');
  constructor(private userStorage: UserSotrageService,
  private _router:Router, 
  private _dataLayerService: DataLayerService,
  @Inject(PLATFORM_ID) private platformId: Object
){
  this.isBrowser=isPlatformBrowser(this.platformId)
  afterNextRender(() => {
    this._router.events.subscribe(event=> { // subscribe to router events
      if (event instanceof NavigationEnd) //if our event is of our interest
      {
          console.log("page url:", event);
          this._dataLayerService.logPageView(event.url) //call our dataLayer service's page view method to ping home with the url value.
      }
    });
  });
  
}
userContextSubs!:Subscription
ngOnInit(){
  this.userContextSubs=  this.userStorage.getUserContext().subscribe({
      next: (user)=> {
        console.log("userDetails: ", user);
      }
    })
  

}

ngOnDestroy(){
  if(this.userContextSubs){
    this.userContextSubs.unsubscribe()
  }
}
}
