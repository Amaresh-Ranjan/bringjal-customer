import {
  Component,
  DestroyRef,
  Inject,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RelativeDatePipe } from '../../shared/pipes/luxondate.pipe';
import { Router } from '@angular/router';
import { FooterSectionComponent } from "../../shared/comp/footer-section/footer-section.component";
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';

@Component({
  selector: 'app-previous-orders',
  standalone: true,
  imports: [
    CustomLoaderComponent,
    CommonModule,
    RelativeDatePipe,
    FooterSectionComponent
],
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.scss',
})
export class PreviousOrdersComponent {
  loaderEnable = signal<boolean>(false);
  previousOrders:any = [];
  totalOrders:any
  private destroyRef = inject(DestroyRef);
  homeService = inject(HomeUserServiceService);
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loaderEnable.update(() => true);

    if (isPlatformBrowser(this.platformId)) {
      const subscription = this.homeService.getPreviousOrders(0).subscribe({
        next: (data: any) => {
          console.log('previous orders data : ', data);

          this.previousOrders = data.data;
          this.totalOrders=data.totalOrders
          this.loaderEnable.update(() => false);
        },
        error(err) {
          console.error('Error in fetching previous orders : ', err);
        },
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    //});
  }

  ngOnInit() {
    //this.loaderService.loaderSubject.next(true);
    // afterNextRender(() => {
    //   console.log("after next renderer")
    //});
  }

  openOrderDetails(id:any) {
    this.router.navigate(['india/dashboard/order-details', id]);
  }
    getDelTime(order_footprints:any){
    for(let type of order_footprints){
                  if(type.footprint_type==="delivery_complete"){
                   return type.timestamp
                  }
                }
                return 
  }

  showmore() {
    this.loaderEnable.update(() => true);
    this.homeService.getPreviousOrders(this.previousOrders.length).subscribe({
      next: (data: any) => {
        console.log('previous orders data : ', data);
        var fetched = data.data;
        fetched.forEach((el:any) => {
          this.previousOrders.push(el);
        });
        this.totalOrders=data.totalOrders
        this.loaderEnable.update(() => false);
      },
      error(err) {
        console.error('Error in fetching previous orders : ', err);
      },
    });
  }
}
