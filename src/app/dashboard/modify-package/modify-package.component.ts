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
import { DateTime } from 'luxon';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { FooterSectionComponent } from '../../shared/comp/footer-section/footer-section.component';
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-package',
  standalone: true,
  imports: [CommonModule, CustomLoaderComponent, FooterSectionComponent],
  templateUrl: './modify-package.component.html',
  styleUrl: './modify-package.component.scss',
})
export class ModifyPackageComponent {
  userService = inject(HomeUserServiceService);
  loaderEnable = signal<boolean>(false);
  packageDiscountAmount: number|any;
  userData: any;
  minQty: number|any;
  maxQty: number|any;
  package_subscription_qty: number|any;
  selectedValue: number = 2;
  selectionPrice: number = 65;
  userStorage = inject(UserSotrageService);
  private destroyRef = inject(DestroyRef);
  options = [
    { value: 4, label: '4 Water cans per delivery' },
    { value: 3, label: '3 Water cans per delivery' },
    { value: 2, label: '2 Water cans per delivery' },
    { value: 1, label: '1 Water can per delivery' },
  ];

  filteredOptions:any[] = [];

  message: boolean|any;

  loader: boolean|any;
  can_price: number|any;
  base_price: number|any;
  membership: any;
  membershipActive: boolean|any; //add the package subscribed by user
  minimum_required_quantity: number|any;
  products: any;
  discountPerQuantity: any;
  package_subscription_id: string|any;
  couponCodeDiscountAmount: number|any;
  selectedProduct: any;
  perCanDeposit: number|any;
  selectedDiscountAmount: number|any;
  perItemPriceAfterDiscountsChargesAndTaxes: number|any;
  perItemPriceAfterDiscountsChargesAndTaxesForSelected: number = 0;
  constructor(
    private homeService: HomeUserServiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
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
              console.log(this.userData)
            this.userService.fetchDataForOrderPlacementInDashboard(this.userData._id).subscribe({
              next: (data) => {
                var dataResult = data.data.result;
                console.log('data from place order:', dataResult);
                this.minQty = dataResult.minimum_required_quantity;
                this.maxQty = dataResult.maximum_quantity;
                this.package_subscription_qty =
                  +this.userData.package_subscription.quantity;
                this.package_subscription_id =
                  this.userData.package_subscription.id;

                this.products = dataResult.products;
              
                this.discountPerQuantity =
                  dataResult.deliveryarea.discountPerQuantity;
                  console.log(this.discountPerQuantity)
                  this.options=[]
                  for(let i=this.minQty;i<=this.maxQty;i++){
                   this.options.push( { value: i, label: `${i} Water cans per delivery` })
                  }
                this.filteredOptions = this.getFilteredOptions();
                console.log('filteredOption:', this.filteredOptions);
                if (this.userData?.coupon_code) {
                  if(this.userData?.coupon_code.expiry){
                  var couponValid = this.checkCouponExpiry(
                    this.userData?.coupon_code.expiry
                  );
                   if (couponValid) {
                    console.log(
                      'selected couponCode:',
                      this.userData?.coupon_code?.percentage_or_amount
                    );

                    this.couponCodeDiscountAmount =
                      this.userData?.coupon_code?.percentage_or_amount;
                  }
                }
                 
                }
                console.log('***************',this.products)
                this.selectedProduct = this.products.find(
                  (p:any) => p.item_id === this.package_subscription_id
                );
                
                this.perCanDeposit = this.selectedProduct.item_details.deposit;
                this.packageDiscountAmount = this.getDiscountAmount(
                  this.discountPerQuantity,
                  this.package_subscription_qty
                );
                console.log('selectedProduct:', this.selectedProduct);
                if(this.couponCodeDiscountAmount){
                this.perItemPriceAfterDiscountsChargesAndTaxes = Math.round(
                  (this.selectedProduct.item_details.base_price +
                    this.selectedProduct.item_extra_amount -
                    this.packageDiscountAmount -
                    this.couponCodeDiscountAmount) *
                    (1 +
                      (this.selectedProduct.item_details.GST.CGST +
                        this.selectedProduct.item_details.GST.IGST +
                        this.selectedProduct.item_details.GST.SGST))
                );
              }else{
                this.perItemPriceAfterDiscountsChargesAndTaxes = Math.round(
                  (this.selectedProduct.item_details.base_price +
                    this.selectedProduct.item_extra_amount -
                    this.packageDiscountAmount) *
                    (1 +
                      (this.selectedProduct.item_details.GST.CGST +
                        this.selectedProduct.item_details.GST.IGST +
                        this.selectedProduct.item_details.GST.SGST))
                );
              }
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
          },
          error: (error) => {
            console.log('error:', error);
            this.loaderEnable.update(() => false);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  getFilteredOptions() {
    return this.options.filter(
      (option) =>
        option.value >= this.minQty && // Greater than or equal to minQty
        option.value <= this.maxQty && // Less than or equal to maxQty
        option.value !== this.package_subscription_qty // Exclude the selected value
    );
  }

  checkCouponExpiry(couponExpiryDate:any) {
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

  getDiscountAmount(discountPerQuantity:any, userQty:any) {
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

  // Method to handle selection change
  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = Number(target.value);
    this.getSelectionProductPrice(this.selectedValue);
  }

  getSelectionProductPrice(selectedValue:any) {
    this.selectedDiscountAmount = this.getDiscountAmount(
      this.discountPerQuantity,
      selectedValue
    );
    if(this.couponCodeDiscountAmount){
    this.perItemPriceAfterDiscountsChargesAndTaxesForSelected = Math.round(
      (this.selectedProduct.item_details.base_price +
        this.selectedProduct.item_extra_amount -
        this.selectedDiscountAmount -
        this.couponCodeDiscountAmount) *
        (1 +
          (this.selectedProduct.item_details.GST.CGST +
            this.selectedProduct.item_details.GST.IGST +
            this.selectedProduct.item_details.GST.SGST))
    );
  }else{
    this.perItemPriceAfterDiscountsChargesAndTaxesForSelected = Math.round(
      (this.selectedProduct.item_details.base_price +
        this.selectedProduct.item_extra_amount -
        this.selectedDiscountAmount) *
        (1 +
          (this.selectedProduct.item_details.GST.CGST +
            this.selectedProduct.item_details.GST.IGST +
            this.selectedProduct.item_details.GST.SGST))
    );
  }
  }
  setUserContextSub!:Subscription
  changePackageQuantity() {
    this.loaderEnable.update(() => true);
    this.homeService.changeQuantityModifyPackage(this.selectedValue,this.userData._id).subscribe({
      next: (data: any) => {
        console.log('change package quantity', data);
        this.setUserContextSub=this.userStorage.setuserContext(data.token, data.data).subscribe(() => {
          console.log('***************************************************')
          this.userData = data.data;
          this.package_subscription_qty =
            +this.userData.package_subscription.quantity;
          this.packageDiscountAmount = this.getDiscountAmount(
            this.discountPerQuantity,
            this.package_subscription_qty
          );
          if (this.userData?.coupon_code) {
            if(this.userData?.coupon_code?.expiry){
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
          if(this.couponCodeDiscountAmount){
          this.perItemPriceAfterDiscountsChargesAndTaxes = Math.round(
            (this.selectedProduct.item_details.base_price +
              this.selectedProduct.item_extra_amount -
              this.packageDiscountAmount -
              this.couponCodeDiscountAmount) *
              (1 +
                (this.selectedProduct.item_details.GST.CGST +
                  this.selectedProduct.item_details.GST.IGST +
                  this.selectedProduct.item_details.GST.SGST))
          );
        }else{
          this.perItemPriceAfterDiscountsChargesAndTaxes = Math.round(
            (this.selectedProduct.item_details.base_price +
              this.selectedProduct.item_extra_amount -
              this.packageDiscountAmount) *
              (1 +
                (this.selectedProduct.item_details.GST.CGST +
                  this.selectedProduct.item_details.GST.IGST +
                  this.selectedProduct.item_details.GST.SGST))
          );
        }
          this.filteredOptions = this.getFilteredOptions();

          this.loaderEnable.update(() => false);
        });
        // this.loader = false;
        // this.can_price = data.can_price;
        // this.base_price = data.base_price;
        // this.membership = data.membership;
        // this.membershipActive = data.membership_active;
        // this.minimum_required_quantity = data.minimum_required_quantity;
      },
      error: (error) => {
        // this.loader = false;
        this.loaderEnable.update(() => false);
        console.error('Error fetching modify package details:', error);
      },
    });
  }

    goToProductSelectionPage() {
    this.router.navigate(['/india/book-bringjal-watercan']);
  }

  ngOnDestroy(){
    if(this.setUserContextSub){
      this.setUserContextSub.unsubscribe()
    }
  }
}
