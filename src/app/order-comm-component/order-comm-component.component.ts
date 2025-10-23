import { Component, DestroyRef, inject, signal } from '@angular/core';
import { OrderDetailsSectionComponent } from '../shared/comps/order-details-section/order-details-section.component';
import { CustomLoaderComponent } from '../shared/comps/custom-loader/custom-loader.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeUserServiceService } from '../shared/services/backendInteractionServices/home-user-service.service';

@Component({
  selector: 'app-order-comm-component',
  standalone: true,
  imports: [OrderDetailsSectionComponent, CustomLoaderComponent],
  templateUrl: './order-comm-component.component.html',
  styleUrl: './order-comm-component.component.scss'
})
export class OrderCommComponentComponent {
  loaderEnable = signal<boolean>(false);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  userService = inject(HomeUserServiceService);
  orderid: string|any;
  order: any;
  ngOnInit(){
   const routeSubscription = this.route.queryParams.subscribe(params => {
      this.orderid = params['id'];
      this.loaderEnable.update(()=> true);
      this.userService.getOrderDetails(this.orderid).subscribe({
        next: (data) => {
          console.log("data:", data)
          this.order = data.data;
          this.loaderEnable.update(()=> false);
         // this.loaderService.disableLoader().subscribe(()=>{});
        },
        error: (error) => {
          console.log("error:", error);
          this.loaderEnable.update(()=> false);
          //this.loaderService.disableLoader().subscribe(()=>{});
        }
      });
    });

    this.destroyRef.onDestroy(() => {
      routeSubscription.unsubscribe();
    });
  }
}
