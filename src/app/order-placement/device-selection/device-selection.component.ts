import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { DeviceWaitingListComponent } from '../device-waiting-list/device-waiting-list.component';
@Component({
  selector: 'app-device-selection',
  standalone: true,
  imports: [LottieComponent,DeviceWaitingListComponent],
  templateUrl: './device-selection.component.html',
  styleUrl: './device-selection.component.scss'
})
export class DeviceSelectionComponent {
  @Output() loaderToggle = new EventEmitter < boolean > ();
  @Output() joinDroppyWaitlist = new EventEmitter < boolean > ();
  @Output() skipDroppy = new EventEmitter < boolean > ();
  @Output() deviceAdded = new EventEmitter < any > ();

  @Input() devicePresent: boolean|any;
  @Input() devicestock: boolean|any;
  @Input() deviceDeposit: number|any;
  wifiOptions: AnimationOptions = {
    path: '/assets/animations/droppyWifi.json',
  };
  deliveryOptions: AnimationOptions = {
    path: '/assets/animations/delivery.json',
  };

  private _residentialService = inject(HomeUserServiceService);
  ngOnInit() {
    console.log("devicePresent",this.devicePresent,"devicestock",this.devicestock);
  }

  
  showOrHideLoader(data:any){
   
    this.loaderToggle.emit(data);
  }

  droppyWaitlist(){
    this.joinDroppyWaitlist.emit(true);
  }

  skipAddingDroppy(){
    this.skipDroppy.emit(true);
  }

  droppyAdded(){
     
      this.deviceAdded.emit();
    
  }
}
