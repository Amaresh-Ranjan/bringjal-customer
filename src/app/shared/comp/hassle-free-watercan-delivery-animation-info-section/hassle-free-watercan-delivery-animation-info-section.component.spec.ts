import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HassleFreeWatercanDeliveryAnimationInfoSectionComponent } from './hassle-free-watercan-delivery-animation-info-section.component';

describe('HassleFreeWatercanDeliveryAnimationInfoSectionComponent', () => {
  let component: HassleFreeWatercanDeliveryAnimationInfoSectionComponent;
  let fixture: ComponentFixture<HassleFreeWatercanDeliveryAnimationInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HassleFreeWatercanDeliveryAnimationInfoSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HassleFreeWatercanDeliveryAnimationInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
