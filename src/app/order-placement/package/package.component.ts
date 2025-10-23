import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';

@Component({
  selector: 'app-package',
  standalone: true,
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss',
  imports: [FormsModule, LottieComponent],
})
export class PackageComponent {
  @Output() loaderToggle = new EventEmitter<boolean>();
  @Output() productAdded = new EventEmitter<any>();
  @Input() product: any;
  @Input() userLoggedIn: boolean|any;
  @Input() userId: any;
  @Input() guestId: any;
  disableBtn: boolean|any;
  searchAddress: string|any;
  latLng: any;
  @Input() minimum_required_quantity: number|any;
  @Input() maximum_quantity: number|any;
  @Input() deliveryChargePresent: boolean|any;
  @Input() deliveryChargePerCan: number|any;
  @Input() discountPerQuantity: any;
  @Input() deliveryId: string|any;

  priceOneCan: number = 0;
  priceTwoCans: number = 0;
  priceThreeCans: number = 0;
  priceFourCans: number = 0;
  totalGSTFraction:number|any
  quantities:any=[]
  deposit: number = 0;

  cart_product: any;

  waterPurificationOptions: AnimationOptions = {
    path: '/assets/animations/waterPurification.json',
  };
  labTechnicianOptions: AnimationOptions = {
    path: '/assets/animations/labTechnician.json',
  };
  watercansOptions: AnimationOptions = {
    path: '/assets/animations/watercans.json',
  };

  private _residentialService = inject(HomeUserServiceService);

  ngOnInit() {
    console.log('product data loaded in package component', this.product);
    this.quantities = [];
for (let i = this.minimum_required_quantity; i <= this.maximum_quantity; i++) {
  this.quantities.push(i);
}
this.totalGSTFraction=(this.product.item_details.GST.CGST +
  this.product.item_details.GST.SGST +
  this.product.item_details.GST.IGST)
    // console.log('product base price: ', this.product.item_details.base_price + this.product.item_extra_amount);
    // console.log('product gst prices:', this.discountPerQuantity.oneCan )
    // console.log('log for one can pirce', ((this.product.item_details.base_price + this.product.item_extra_amount) * (1 + (this.product.item_details.GST.CGST + this.product.item_details.GST.SGST + this.product.item_details.GST.IGST)))- this.discountPerQuantity.oneCan);
    this.priceOneCan = Math.round(
      (this.product.item_details.base_price +
        this.product.item_extra_amount -
        this.discountPerQuantity.oneCan) *
        (1 +
          (this.product.item_details.GST.CGST +
            this.product.item_details.GST.SGST +
            this.product.item_details.GST.IGST))
    );
    // console.log('price of  one can will  be updated', this.priceOneCan);
    this.priceTwoCans = Math.round(
      (this.product.item_details.base_price +
        this.product.item_extra_amount -
        this.discountPerQuantity.twoCans) *
        (1 +
          (this.product.item_details.GST.CGST +
            this.product.item_details.GST.SGST +
            this.product.item_details.GST.IGST))
    );
    this.priceThreeCans = Math.round(
      (this.product.item_details.base_price +
        this.product.item_extra_amount -
        this.discountPerQuantity.threeCans) *
        (1 +
          (this.product.item_details.GST.CGST +
            this.product.item_details.GST.SGST +
            this.product.item_details.GST.IGST))
    );
    this.priceFourCans = Math.round(
      (this.product.item_details.base_price +
        this.product.item_extra_amount -
        this.discountPerQuantity.fourCans) *
        (1 +
          (this.product.item_details.GST.CGST +
            this.product.item_details.GST.SGST +
            this.product.item_details.GST.IGST))
    );

    this.deposit = this.product.item_details.deposit;
  }

  addWatercan() {
    console.log('two');
  }

  waterCanSelected(qty: number) {
    this.showOrHideLoader();
    this.cart_product = {
      product_id: this.product.item_id,
      product_name: this.product.item_name,
      product_qty: qty,
      item_extra_amount: this.product.item_extra_amount,
    };
    this.showOrHideLoader();

    this.productAdded.emit(this.cart_product);
  }

  showOrHideLoader() {
    this.loaderToggle.emit(true);
  }
}
