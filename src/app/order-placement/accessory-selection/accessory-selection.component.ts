import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accessory-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessory-selection.component.html',
  styleUrl: './accessory-selection.component.scss',
})
export class AccessorySelectionComponent {
  @Output() loaderToggle = new EventEmitter<boolean>();
  @Input() accessories: any;
  @Output() accessoryAdded = new EventEmitter<any>();
  cart_accessory:any[] = [];
  showOrHideLoader() {
    this.loaderToggle.emit(true);
  }
  private _residentialService = inject(HomeUserServiceService);

  
  skipAddingAccessory() {
    this.cart_accessory = [];
    this.accessoryAdded.emit(this.cart_accessory);
  }
  productQty: number = 1;
  accessoryTotalAmount:number|any
  ngOnInit() {
    console.log('accessory parent component', this.accessories);
    const totalgst=(this.accessories[0].item_details.base_price+this.accessories[0].item_extra_amount)*(this.accessories[0].item_details.GST.CGST+this.accessories[0].item_details.GST.IGST+this.accessories[0].item_details.GST.SGST)
    this.accessoryTotalAmount=(this.accessories[0].item_details.base_price+this.accessories[0].item_extra_amount+totalgst)*this.productQty
  }
  addQty() {
    this.productQty = this.productQty + 1;
    const totalgst=(this.accessories[0].item_details.base_price+this.accessories[0].item_extra_amount)*(this.accessories[0].item_details.GST.CGST+this.accessories[0].item_details.GST.IGST+this.accessories[0].item_details.GST.SGST)
    this.accessoryTotalAmount=(this.accessories[0].item_details.base_price+this.accessories[0].item_extra_amount+totalgst)*this.productQty
  }
  subQty() {
    if (this.productQty > 1) {
      this.productQty = this.productQty - 1;
     const totalgst=(this.accessories[0].item_details.base_price+this.accessories[0].item_extra_amount)*(this.accessories[0].item_details.GST.CGST+this.accessories[0].item_details.GST.IGST+this.accessories[0].item_details.GST.SGST)
    this.accessoryTotalAmount=(this.accessories[0].item_details.base_price+this.accessories[0].item_extra_amount+totalgst)*this.productQty
    }
  }
  addAccessoryToCart(item: any) {
    this.showOrHideLoader();
    this.cart_accessory = [];
    this.cart_accessory.push({
        product_id: item.item_id,
        product_name: item.item_name,
        product_qty: this.productQty,
      })
    this.showOrHideLoader();
    this.accessoryAdded.emit(this.cart_accessory);
    console.log('accessory child component', this.cart_accessory);
  }
}
