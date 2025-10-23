import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginAndSignupComponent } from './login-and-signup/login-and-signup.component';

@Component({
  selector: 'app-header-section',
  standalone: true,
  imports: [LoginAndSignupComponent, RouterModule],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.scss',
})
export class HeaderSectionComponent {}
