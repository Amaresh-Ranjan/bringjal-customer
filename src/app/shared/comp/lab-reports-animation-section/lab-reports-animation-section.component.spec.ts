import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabReportsAnimationSectionComponent } from './lab-reports-animation-section.component';

describe('LabReportsAnimationSectionComponent', () => {
  let component: LabReportsAnimationSectionComponent;
  let fixture: ComponentFixture<LabReportsAnimationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabReportsAnimationSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabReportsAnimationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
