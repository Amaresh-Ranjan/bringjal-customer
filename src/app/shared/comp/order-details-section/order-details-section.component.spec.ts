import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsSectionComponent } from './order-details-section.component';

describe('OrderDetailsSectionComponent', () => {
  let component: OrderDetailsSectionComponent;
  let fixture: ComponentFixture<OrderDetailsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
