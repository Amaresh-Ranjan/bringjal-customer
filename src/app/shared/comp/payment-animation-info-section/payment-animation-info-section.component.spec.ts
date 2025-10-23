import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAnimationInfoSectionComponent } from './payment-animation-info-section.component';

describe('PaymentAnimationInfoSectionComponent', () => {
  let component: PaymentAnimationInfoSectionComponent;
  let fixture: ComponentFixture<PaymentAnimationInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAnimationInfoSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentAnimationInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
