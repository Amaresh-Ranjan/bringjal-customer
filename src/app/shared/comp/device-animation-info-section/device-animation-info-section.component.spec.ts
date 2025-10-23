import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAnimationInfoSectionComponent } from './device-animation-info-section.component';

describe('DeviceAnimationInfoSectionComponent', () => {
  let component: DeviceAnimationInfoSectionComponent;
  let fixture: ComponentFixture<DeviceAnimationInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceAnimationInfoSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceAnimationInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
