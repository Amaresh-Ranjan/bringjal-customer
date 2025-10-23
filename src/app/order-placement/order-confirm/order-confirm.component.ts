import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { OrderDetailsSectionComponent } from '../../shared/comps/order-details-section/order-details-section.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [LottieComponent, OrderDetailsSectionComponent,CommonModule],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent {
  @Input() orderDetails: any;
  @Output() loaderToggle = new EventEmitter < boolean > ();

  options: AnimationOptions = {
    path: '/assets/animations/orderConfirmation.json',
  };


  constructor(
    private router: Router
  ){
    
  }
  ngOnInit(){
    console.log("this.orderDetails:", this.orderDetails)

  }

  showOrHideLoader(){
    this.loaderToggle.emit(true);
  }

  cancelOrder(){

  }

  goToDashboard(){
    console.log("go to dashboard called");
    this.router.navigate(['/india/dashboard/place-order']);
  }
}
