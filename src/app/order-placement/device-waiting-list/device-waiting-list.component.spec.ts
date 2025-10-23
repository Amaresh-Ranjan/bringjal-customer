import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceWaitingListComponent } from './device-waiting-list.component';

describe('InterestedUserComponent', () => {
  let component: DeviceWaitingListComponent;
  let fixture: ComponentFixture<DeviceWaitingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceWaitingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceWaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
