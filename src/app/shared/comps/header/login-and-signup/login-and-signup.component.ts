import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupOtpModalComponent } from './signup-otp-modal/signup-otp-modal.component';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { UserSotrageService } from '../../../services/storageRelated/user-sotrage.service';
import { CustomLoaderComponent } from '../../custom-loader/custom-loader.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-and-signup',
  standalone: true,
  imports: [CommonModule, CustomLoaderComponent],
  templateUrl: './login-and-signup.component.html',
  styleUrl: './login-and-signup.component.scss'
})
export class LoginAndSignupComponent {
  userLoggedIn: boolean = true;
  userName!: string;
  loaderEnable = signal<boolean>(false);
  private modalService = inject(NgbModal);
  constructor(private userStorage: UserSotrageService,
    private router: Router){

  }
  userContextSub!:Subscription
  userLoginSub!:Subscription

  ngOnInit(){
    this.loaderEnable.update(()=> true);
    this.userLoginSub=this.userStorage.getLoggedIn.subscribe((isLoggedIn)=> {
        console.log('user logged in..',isLoggedIn)
        this.userLoggedIn = isLoggedIn;
        if(this.userLoggedIn){
        this.userContextSub=  this.userStorage.getUser.subscribe({
            next: (user)=> {
              console.log('User: ', user);
              if(user){
                this.userName = user.name;
                this.loaderEnable.update(()=> false);
              }
            }
          });
        }else{
          this.loaderEnable.update(()=> false);
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

  openModalLogin(){
    const modalRef = this.modalService.open(LoginModalComponent, { centered: true });
    modalRef.componentInstance.name = 'world sample word';
    modalRef.result.then((data)=>{
      console.log("data:", data);
      if(data.openSignup){
        this.openModalSignup();
      }
      if(data.openForgotPassword){
        this.openModalForgotPassword();
      }
      if(data.login){
        this.postLoginSuccess(data);
        console.log('postloginSuccess data...',data);
      }
    })
		modalRef.componentInstance.name = 'World';
  }

  openModalSignup() {
    const modalRefSignup = this.modalService.open(SignupModalComponent, { centered: true });
    modalRefSignup.result.then((data: any)=>{
      if(data.signup){
        this.postSignupSuccess(data);
      }
      if(data.openLogin){
        this.openModalLogin();
      }
    });
  }

  postSignupSuccess(data:any){
    this.openModalSignupOtp(data);
  }

  openModalForgotPassword() {
    const modalRefForgotPassword = this.modalService.open(ForgotPasswordModalComponent, { centered: true });
    modalRefForgotPassword.result.then((data: any)=>{
      
      if(data.openLogin){
        this.openModalLogin();
      }
    });
  }

  postLoginSuccess(data:any){
    if(!data.verified){
      this.openModalSignupOtp(data);
    }
  }

  openModalSignupOtp(data:any) {
    const modalRefSignupOtp = this.modalService.open(SignupOtpModalComponent);
    modalRefSignupOtp.componentInstance.mobile = data.mobile;
    modalRefSignupOtp.componentInstance.userid = data.userid;
    modalRefSignupOtp.result.then((data: any) => {
      console.log(data);
      if(data.openLogin){
        this.openModalLogin();
      }
    });
  }

  goToDashboard(){
    this.router.navigate(['india/dashboard']);
  }

  onLogout(){
    this.loaderEnable.update(()=> true);
    this.userStorage.logout().subscribe((status) => {
      if(status){
        this.loaderEnable.update(()=> false);
        this.router.navigate(['']);
      }
    });
  }


}
