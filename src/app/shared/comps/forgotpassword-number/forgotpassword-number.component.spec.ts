import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordNumberComponent } from './forgotpassword-number.component';

describe('ForgotpasswordNumberComponent', () => {
  let component: ForgotpasswordNumberComponent;
  let fixture: ComponentFixture<ForgotpasswordNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotpasswordNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotpasswordNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
