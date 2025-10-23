import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HassleFreeWatercanDeliveryAnimationInfoComponent } from './hassle-free-watercan-delivery-animation-info.component';

describe('HassleFreeWatercanDeliveryAnimationInfoComponent', () => {
  let component: HassleFreeWatercanDeliveryAnimationInfoComponent;
  let fixture: ComponentFixture<HassleFreeWatercanDeliveryAnimationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HassleFreeWatercanDeliveryAnimationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HassleFreeWatercanDeliveryAnimationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
