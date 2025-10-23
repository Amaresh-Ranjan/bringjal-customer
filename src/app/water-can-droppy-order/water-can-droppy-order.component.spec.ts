import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterCanDroppyOrderComponent } from './water-can-droppy-order.component';

describe('WaterCanDroppyOrderComponent', () => {
  let component: WaterCanDroppyOrderComponent;
  let fixture: ComponentFixture<WaterCanDroppyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterCanDroppyOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterCanDroppyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
