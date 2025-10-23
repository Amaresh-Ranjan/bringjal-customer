import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FooterSectionComponent } from '../../shared/comp/footer-section/footer-section.component';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
import { HomeUserServiceService } from '../../shared/services/backendInteractionServices/home-user-service.service';
import { CustomLoaderComponent } from '../../shared/comp/custom-loader/custom-loader.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unsubscription-order',
  standalone: true,
  imports: [FooterSectionComponent,CustomLoaderComponent,CommonModule,FormsModule],
  templateUrl: './unsubscription-order.component.html',
  styleUrl: './unsubscription-order.component.scss'
})
export class UnsubscriptionOrderComponent {

  loaderEnable=signal(false)
  userData:any
  Reason:any
  message:any
  availabilityDate:any
  currentlocation:boolean=true
  private destroyRef = inject(DestroyRef);
  constructor(
    private userStorage:UserSotrageService,
    private router:Router,
    private homeUserServiceService:HomeUserServiceService,
  ){}

  ngOnInit(){
     this.loaderEnable.update(() => true);
    const subscription = this.userStorage.getUser.subscribe({
            next: (user) => {
              if (user) {
                this.userData = user;
                console.log('userdata:', this.userData);
               this.loaderEnable.update(() => false);
              }
            },
            error:(err) =>{
              console.log(err)
              this.loaderEnable.update(() => false);
            },
          });

         this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      }); 
      
  }

  goToProductSelectionPage() {
    this.router.navigate(['/india/book-bringjal-watercan']);
  }

  unsubscribePackage(){
    this.message=null
     this.loaderEnable.update(() => true);
   this.homeUserServiceService.unsubscribePackage(this.userData._id,this.Reason,this.currentlocation,this.availabilityDate).subscribe({
            next: (data) => {
              console.log(data)
              this.Reason=undefined
              this.message=data.message
             
              this.availabilityDate=undefined
              this.loaderEnable.update(() => false);
            },
            error:(err) =>{
              console.log(err)
              this.loaderEnable.update(() => false);
            },
          });
  }
}
