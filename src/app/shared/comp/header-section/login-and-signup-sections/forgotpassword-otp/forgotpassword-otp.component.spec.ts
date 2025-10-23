import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordOtpComponent } from './forgotpassword-otp.component';

describe('ForgotpasswordOtpComponent', () => {
  let component: ForgotpasswordOtpComponent;
  let fixture: ComponentFixture<ForgotpasswordOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotpasswordOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotpasswordOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
