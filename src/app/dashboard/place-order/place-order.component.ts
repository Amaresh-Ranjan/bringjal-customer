import {
  Component,
  DestroyRef,
  Inject,
  inject,
  NgZone,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { DateTime } from 'luxon';
import { OrderDetailsSectionComponent } from '../../shared/comps/order-details-section/order-details-section.component';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FooterSectionComponent } from '../../shared/comp/footer-section/footer-section.component';
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare var Razorpay: any;

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    OrderDetailsSectionComponent,
    CustomLoaderComponent,
    FooterSectionComponent,
    DatePipe,
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent {
  loaderEnable = signal<boolean>(false);
  bringjalCash: number = 10;
  finalPayableAmount: number = 30;
  orderActive: boolean = false;
  order: any;
  userService = inject(HomeUserServiceService);
  userStorage = inject(UserSotrageService);
  private zone = inject(NgZone);
  userData: any;
  amountToBeAdded: number | any;
  minQty: number | any;
  maxQty: number | any;
  products: any;
  couponCodeDiscountAmount: number = 0;
  package_subscription_id: string | any;
  package_subscription_qty: number | any;
  discountPerQuantity: any;
  perItemPriceAfterDiscountsChargesAndTaxes: number | any;
  selectedProduct: any;
  eta: string | any;
  selectedDiscountAmount: number | any;
  private destroyRef = inject(DestroyRef);
  orderStatus: any = {
    delivery_boy_assigned: 'Delivery Staff Assigned',
    out_for_delivery: 'Out For Delivery',
    order_sent_for_reassignment: 'Order Sent For Reassignment',
    order_sent_for_assignment: 'Order Sent For Assignment',
    order_marked_pending: 'Order Marked Pending',
    delivery_boy_enroute_delivery: 'Delivery Staff Enroute Delivery',
    delivery_boy_at_drop_location: 'Delivery Staff At Drop Location',
    Watercan_Qty_update:''
  };
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    this.loaderEnable.update(() => true);
    if (isPlatformBrowser(this.platformId)) {
      const subscription = this.userService
        .fetchUserDetailsUsingId()
        .subscribe({
          next: (data) => {
            //this.loaderService.disableLoader().subscribe(()=>{});
            this.userData = data.data;
            console.log('this.userData:', this.userData);
            this.orderActive = this.userData.order_placed;
            if (this.orderActive) {
              this.userService.getOrderDetails(this.userData.order).subscribe({
                next: (data) => {
                  console.log('data:', data);
                  this.order = data.data;
                  this.loaderEnable.update(() => false);
                },
                error: (error) => {
                  console.log('error:', error);
                  this.loaderEnable.update(() => false);
                },
              });
            } else {
              this.userService
                .fetchDataForOrderPlacementInDashboard(this.userData._id)
                .subscribe({
                  next: (data) => {
                    var dataResult = data.data.result;
                    console.log('data from place order:', dataResult);
                    this.bringjalCash = dataResult.walletBalance;
                    this.minQty = dataResult.minimum_required_quantity;
                    this.maxQty = dataResult.maximum_quantity;
                    this.products = dataResult.products;
                    this.discountPerQuantity =
                      dataResult.deliveryarea.discountPerQuantity;
                    this.eta = dataResult.DeliveryEstimation.message;
                    this.package_subscription_id =
                      this.userData.package_subscription.id;
                    this.package_subscription_qty =
                      +this.userData.package_subscription.quantity;

                    if (this.userData?.coupon_code) {
                      if (this.userData?.coupon_code?.expiry) {
                        var couponValid = this.checkCouponExpiry(
                          this.userData.coupon_code.expiry
                        );
                        if (couponValid) {
                          console.log(
                            'selected couponCode:',
                            this.userData.coupon_code.percentage_or_amount
                          );

                          this.couponCodeDiscountAmount =
                            this.userData.coupon_code.percentage_or_amount;
                        }
                      }
                    }

                    this.selectedProduct = this.products.find(
                      (p: any) => p.item_id === this.package_subscription_id
                    );
                    this.selectedDiscountAmount = this.getDiscountAmount(
                      this.discountPerQuantity,
                      this.package_subscription_qty
                    );
                    console.log('selectedProduct:', this.selectedProduct);
                    this.perItemPriceAfterDiscountsChargesAndTaxes = Math.round(
                      (this.selectedProduct.item_details.base_price +
                        this.selectedProduct.item_extra_amount -
                        this.selectedDiscountAmount -
                        this.couponCodeDiscountAmount) *
                        (1 +
                          (this.selectedProduct.item_details.GST.CGST +
                            this.selectedProduct.item_details.GST.IGST +
                            this.selectedProduct.item_details.GST.SGST))
                    );
                    console.log(
                      'selected perItemPriceAfterDiscountsChargesAndTaxes:',
                      this.perItemPriceAfterDiscountsChargesAndTaxes
                    );
                    this.loaderEnable.update(() => false);

                    // this.waterQty = data.watercan_qty;
                    // this.finalPayableAmount = data.final_Payable_amount;
                    // if(this.bringjalCash - this.finalPayableAmount >= 0){
                    //   this.amountToBeAdded = 0;
                    // }else{
                    //   this.amountToBeAdded = this.finalPayableAmount - this.bringjalCash;
                    // }
                  },
                  error: (error) => {
                    this.loaderEnable.update(() => false);
                  },
                });
            }
          },
          error: (error) => {
            this.loaderEnable.update(() => false);
          },
        });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  getDiscountAmount(discountPerQuantity: any, userQty: any) {
    if (userQty >= 4) {
      return discountPerQuantity.fourCans;
    } else {
      if (userQty == 3) {
        return discountPerQuantity.threeCans;
      } else {
        if (userQty == 2) {
          return discountPerQuantity.twoCans;
        } else {
          if (userQty == 1) {
            return discountPerQuantity.oneCan;
          }
        }
      }
    }
  }

  goToProductSelectionPage() {
    this.router.navigate(['/india/book-bringjal-watercan']);
  }

  checkCouponExpiry(couponExpiryDate: any) {
    // Parse the expiry date string into a DateTime object
    const expiryDate = DateTime.fromFormat(couponExpiryDate, 'dd/MM/yyyy');

    // Get the current date
    const currentDate = DateTime.now();

    // Check if the coupon is expired
    if (expiryDate < currentDate) {
      console.log('Coupon is expired');
      return false;
    } else {
      console.log('Coupon is still valid');
      return true;
    }
  }
  cancelorderUserContext!:Subscription
  cancelOrder() {
    this.loaderEnable.update(() => true);
  this.cancelorderUserContext=  this.userService.cancelOrder(this.order._id, this.userData._id).subscribe({
      next: (resData) => {
        console.log('data post order placement:', resData);
        this.userService
          .fetchDataForOrderPlacementInDashboard(this.userData._id)
          .subscribe({
            next: (data) => {
              console.log(data)
              var dataResult = data.data.result;
              this.userData=data.userdata
               this.userStorage.setuserContext(data.token, data.userdata).subscribe(() => {
          this.zone.run(() => {
            this.orderActive = true;
            this.order = data.order;
          });
        });
        if(this.userData.status.subscribed){
              console.log('data from place order:', dataResult);
              this.bringjalCash = dataResult?.walletBalance;
              this.minQty = dataResult?.minimum_required_quantity;
              this.maxQty = dataResult?.maximum_quantity;
              this.products = dataResult?.products;
              this.discountPerQuantity =
                dataResult?.deliveryarea?.discountPerWatercan;
              this.eta = dataResult?.DeliveryEstimation?.message;
              this.package_subscription_id =
                this.userData?.package_subscription?.id;
              this.package_subscription_qty =
                +this.userData?.package_subscription?.quantity;
              console.log('8*******************');
              if (this.userData?.coupon_code) {
                if (this.userData?.coupon_code?.expiry) {
                  var couponValid = this.checkCouponExpiry(
                    this.userData.coupon_code.expiry
                  );
                  if (couponValid) {
                    console.log(
                      'selected couponCode:',
                      this.userData.coupon_code.percentage_or_amount
                    );

                    this.couponCodeDiscountAmount =
                      this.userData.coupon_code.percentage_or_amount;
                  }
                }
              }
              this.selectedProduct = this.products.find(
                (p: any) => p.item_id === this.package_subscription_id
              );
              this.selectedDiscountAmount = this.getDiscountAmount(
                this.discountPerQuantity,
                this.package_subscription_qty
              );
              console.log('selectedProduct:', this.selectedProduct);
              this.perItemPriceAfterDiscountsChargesAndTaxes = Math.round(
                (this.selectedProduct.item_details.base_price +
                  this.selectedProduct.item_extra_amount -
                  this.selectedDiscountAmount -
                  this.couponCodeDiscountAmount) *
                  (1 +
                    (this.selectedProduct.item_details.GST.CGST +
                      this.selectedProduct.item_details.GST.IGST +
                      this.selectedProduct.item_details.GST.SGST))
              );
              console.log(
                'selected perItemPriceAfterDiscountsChargesAndTaxes:',
                this.perItemPriceAfterDiscountsChargesAndTaxes
              );
             
            }
             this.orderActive = false;
              console.log("orderActive",this.orderActive)
              this.loaderEnable.update(() => false);

              // this.waterQty = data.watercan_qty;
              // this.finalPayableAmount = data.final_Payable_amount;
              // if(this.bringjalCash - this.finalPayableAmount >= 0){
              //   this.amountToBeAdded = 0;
              // }else{
              //   this.amountToBeAdded = this.finalPayableAmount - this.bringjalCash;
              // }
            },
            error: (error) => {
              this.loaderEnable.update(() => false);
            },
          });

        // this.loaderEnable.update(() => false);
      },
      error: (error) => {
        console.log(error);
        this.loaderEnable.update(() => false);
      },
    });
  }
  ngOnDestroy(){
    if(this.cancelorderUserContext){
      this.cancelorderUserContext.unsubscribe()
    }
    if(this.placeorderUserContext){
      this.placeorderUserContext.unsubscribe()
    }
  }
  placeorderUserContext!:Subscription
  placeOrderAndPayLater() {
    this.loaderEnable.update(() => true);
    this.userService.placeOrderThroughApp(this.userData._id).subscribe({
      next: (data) => {
        console.log('data post order placement:', data);

       this.placeorderUserContext= this.userStorage.setuserContext(data.token, data.data).subscribe(() => {
          this.zone.run(() => {
            this.orderActive = true;
            this.order = data.order;
          });
        });
        this.loaderEnable.update(() => false);
      },
      error: (error) => {
        console.log(error);
        this.loaderEnable.update(() => false);
      },
    });
  }
}
