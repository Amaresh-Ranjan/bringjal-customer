import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCommComponentComponent } from './order-comm-component.component';

describe('OrderCommComponentComponent', () => {
  let component: OrderCommComponentComponent;
  let fixture: ComponentFixture<OrderCommComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCommComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderCommComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
