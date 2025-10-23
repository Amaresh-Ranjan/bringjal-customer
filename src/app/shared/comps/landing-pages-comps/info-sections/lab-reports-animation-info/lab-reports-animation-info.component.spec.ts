import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabReportsAnimationInfoComponent } from './lab-reports-animation-info.component';

describe('LabReportsAnimationInfoComponent', () => {
  let component: LabReportsAnimationInfoComponent;
  let fixture: ComponentFixture<LabReportsAnimationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabReportsAnimationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabReportsAnimationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
