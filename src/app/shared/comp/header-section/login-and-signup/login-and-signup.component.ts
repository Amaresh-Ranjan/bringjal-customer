import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserSotrageService } from '../../../services/storageRelated/user-sotrage.service';
import { CustomLoaderComponent } from '../../custom-loader/custom-loader.component';
import { ModalService } from '../../../services/common/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-and-signup',
  standalone: true,
  imports: [CommonModule, CustomLoaderComponent],
  templateUrl: './login-and-signup.component.html',
  styleUrl: './login-and-signup.component.scss',
})
export class LoginAndSignupComponent {
  userLoggedIn: boolean = true;
  userName!: string;
  loaderEnable = signal<boolean>(false);
  constructor(
    private userStorage: UserSotrageService,
    private router: Router,
    private modalService: ModalService
  ) {}
userContextSub!:Subscription
userLoginSub!:Subscription
userData:any
  ngOnInit() {
    this.loaderEnable.update(() => true);
    this.userLoginSub=this.userStorage.getLoggedIn.subscribe((isLoggedIn) => {
      console.log('user logged in..', isLoggedIn);
      this.userLoggedIn = isLoggedIn;
      if (this.userLoggedIn) {
        console.log('user logged in..' + this.userLoggedIn);
      this.userContextSub=  this.userStorage.getUser.subscribe({
          next: (user) => {
            console.log('User Details =========>>>> : ', user);
            if (user) {
              this.userName = user.name;
              this.userData=user
              this.loaderEnable.update(() => false);
            }
          },
        });
      } else {
        this.loaderEnable.update(() => false);
      }
    });
  }

  ngOnDestroy(){
    if(this.userContextSub){
      this.userContextSub.unsubscribe()
    }
    if(this.userLoginSub){
      this.userLoginSub.unsubscribe()
    }
  }

  goToDashboard() {
    this.router.navigate(['india/dashboard']);
  }
  openModalMd() {
    this.modalService.openModal();
  }
  onLogout() {
    this.loaderEnable.update(() => true);
    this.userStorage.logout().subscribe((status) => {
      if (status) {
        this.loaderEnable.update(() => false);
        this.router.navigate(['']);
      }
    });
  }
}
