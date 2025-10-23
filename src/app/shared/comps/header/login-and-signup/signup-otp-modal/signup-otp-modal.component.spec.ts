import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOtpModalComponent } from './signup-otp-modal.component';

describe('SignupOtpModalComponent', () => {
  let component: SignupOtpModalComponent;
  let fixture: ComponentFixture<SignupOtpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupOtpModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupOtpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
