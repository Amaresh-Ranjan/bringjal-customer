import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupModalSectionComponent } from './login-signup-modal-section.component';

describe('LoginSignupModalSectionComponent', () => {
  let component: LoginSignupModalSectionComponent;
  let fixture: ComponentFixture<LoginSignupModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignupModalSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSignupModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
