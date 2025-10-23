import { Component } from '@angular/core';
import { LoginAndSignupComponent } from './login-and-signup/login-and-signup.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginAndSignupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
