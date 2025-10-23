import { CanActivateFn, Router, Routes } from '@angular/router';
import { CustomerSupportComponent } from './dashboard/customer-support/customer-support.component';
import { DepositsComponent } from './dashboard/deposits/deposits.component';
import { EditProfileComponent } from './dashboard/edit-profile/edit-profile.component';
import { ModifyPackageComponent } from './dashboard/modify-package/modify-package.component';
import { OrderDetailsComponent } from './dashboard/order-details/order-details.component';
import { PlaceOrderComponent } from './dashboard/place-order/place-order.component';
import { PreviousOrdersComponent } from './dashboard/previous-orders/previous-orders.component';
import { ReferComponent } from './dashboard/refer/refer.component';
import { WalletComponent } from './dashboard/wallet/wallet.component';
import { OrderPlacementComponent } from './order-placement/order-placement.component';
import { TrialComponentComponent } from './trial-component/trial-component.component';
import { IndiaComponent } from './india/india.component';
import { BlogsMainComponent } from './blogs-main/blogs-main.component';
import { BlogMenuComponent } from './blogs-main/blog-menu/blog-menu.component';
import { TheUltimateGuideToWaterIntakeComponent } from './blogs-main/the-ultimate-guide-to-water-intake/the-ultimate-guide-to-water-intake.component';
import { WaterCanQualityLandingPageComponent } from './water-can-quality-landing-page/water-can-quality-landing-page.component';
import { WaterCanDroppyOrderComponent } from './water-can-droppy-order/water-can-droppy-order.component';
import { EnterpriseLandingComponent } from './enterprise-landing/enterprise-landing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CreateUserPasswordComponent } from './create-user-password/create-user-password.component';
import { UserSotrageService } from './shared/services/storageRelated/user-sotrage.service';
import { inject } from '@angular/core';
import { OrderCommComponentComponent } from './order-comm-component/order-comm-component.component';
import { canDeactivateGuard } from './shared/services/can-deactivate.guard';
import { HomeSectionComponent } from './home-section/home-section.component';
import { InterestedUserComponent } from './order-placement/interested-user/interested-user.component';
import { UnsubscriptionOrderComponent } from './dashboard/unsubscription-order/unsubscription-order.component';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

// const checkLogin :CanActivateFn= () => {
//     var cookieStorage = inject(SsrCookieService);
//     var router=inject(Router)
//     var loggedIn=cookieStorage.get('__bringjal_user_token')
//       if (loggedIn) {
//         console.log('logged in');
//         return true;
//       } 
//       console.log('not logged in');
//       // router.navigate(['']);
//         return false
// };

const checkLogin: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieStorage = inject(SsrCookieService);

  return new Promise<boolean>((resolve) => {
    const loggedIn = cookieStorage.get('__bringjal_user_token');
    if (loggedIn) {
      resolve(true);
    } else {
      router.navigate(['/']);
      resolve(false);
    }
  });
};


export const routes: Routes = [
  { path: '', component: HomeSectionComponent },
  { path: 'home', component: InterestedUserComponent },
  { path: 'buy-water-can', component: WaterCanQualityLandingPageComponent },
  { path: 'buy-water-can-droppy', component: WaterCanDroppyOrderComponent },
  { path: 'enterprise', component: EnterpriseLandingComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'newPassword', component: CreateUserPasswordComponent },
  { path: 'o', component: OrderCommComponentComponent },

  {
    path: 'india',
    component: IndiaComponent,
    children: [
      { path: '', redirectTo: '/india/location', pathMatch: 'full' },
      { path: 'trial', component: TrialComponentComponent },
      {
        path: 'book-bringjal-watercan',
        canDeactivate: [canDeactivateGuard],
        component: OrderPlacementComponent,
      },
      {
        path: 'blog',
        component: BlogsMainComponent,
        children: [
          { path: '', redirectTo: '/india/blog/blog-menu', pathMatch: 'full' },
          { path: 'blog-menu', component: BlogMenuComponent },
          {
            path: 'the-ultimate-guide-to-water-intake',
            component: TheUltimateGuideToWaterIntakeComponent,
          },
        ],
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [checkLogin],
        children: [
          {
            path: '',
            redirectTo: '/india/dashboard/place-order',
            pathMatch: 'full',
          },
          { path: 'place-order', component: PlaceOrderComponent },
          { path: 'edit-profile', component: EditProfileComponent },
          { path: 'modify-package', component: ModifyPackageComponent },
          { path: 'previous-orders', component: PreviousOrdersComponent },
          { path: 'order-details/:id', component: OrderDetailsComponent },
          { path: 'deposits', component: DepositsComponent },
          { path: 'wallet', component: WalletComponent },
          { path: 'refer', component: ReferComponent },
          { path: 'customer-support', component: CustomerSupportComponent },
          { path: 'unsubscribe-package', component: UnsubscriptionOrderComponent },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

