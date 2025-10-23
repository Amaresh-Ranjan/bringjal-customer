import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginSignupPasswordComponent } from './user-login-signup-password.component';

describe('UserLoginSignupPasswordComponent', () => {
  let component: UserLoginSignupPasswordComponent;
  let fixture: ComponentFixture<UserLoginSignupPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginSignupPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLoginSignupPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
