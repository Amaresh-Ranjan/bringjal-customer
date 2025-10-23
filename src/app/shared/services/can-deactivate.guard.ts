import { Observable } from 'rxjs';
import { OrderPlacementComponent } from '../../order-placement/order-placement.component';
import { CanDeactivateFn } from '@angular/router';

// Define an interface for components that need deactivation protection
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const canDeactivateGuard:any| CanDeactivateFn<CanComponentDeactivate> = (
  component: OrderPlacementComponent
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};