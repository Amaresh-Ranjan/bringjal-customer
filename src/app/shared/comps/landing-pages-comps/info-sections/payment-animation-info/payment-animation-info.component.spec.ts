import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAnimationInfoComponent } from './payment-animation-info.component';

describe('PaymentAnimationInfoComponent', () => {
  let component: PaymentAnimationInfoComponent;
  let fixture: ComponentFixture<PaymentAnimationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAnimationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentAnimationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
