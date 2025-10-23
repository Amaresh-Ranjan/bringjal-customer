import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { OrderDetailsSectionComponent } from '../../shared/comp/order-details-section/order-details-section.component';
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [OrderDetailsSectionComponent, CustomLoaderComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  loaderEnable = signal<boolean>(false);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  userService = inject(HomeUserServiceService);
  orderid: string|any;
  order: any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.orderid = params['id'];
      this.loaderEnable.update(() => true);
      this.userService.getOrderDetails(this.orderid).subscribe({
        next: (data) => {
          console.log('data:', data);
          this.order = data.data;
          this.loaderEnable.update(() => false);
          // this.loaderService.disableLoader().subscribe(()=>{});
        },
        error: (error) => {
          console.log('error:', error);
          this.loaderEnable.update(() => false);
          //this.loaderService.disableLoader().subscribe(()=>{});
        },
      });
    });
  }

  backToMainSection() {
    this.router.navigate(['/india/dashboard/previous-orders']);
  }
}
