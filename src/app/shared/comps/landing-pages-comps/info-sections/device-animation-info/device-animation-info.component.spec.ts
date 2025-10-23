import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAnimationInfoComponent } from './device-animation-info.component';

describe('DeviceAnimationInfoComponent', () => {
  let component: DeviceAnimationInfoComponent;
  let fixture: ComponentFixture<DeviceAnimationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceAnimationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceAnimationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
