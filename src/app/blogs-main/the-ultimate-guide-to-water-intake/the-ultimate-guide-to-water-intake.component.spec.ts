import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheUltimateGuideToWaterIntakeComponent } from './the-ultimate-guide-to-water-intake.component';

describe('TheUltimateGuideToWaterIntakeComponent', () => {
  let component: TheUltimateGuideToWaterIntakeComponent;
  let fixture: ComponentFixture<TheUltimateGuideToWaterIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheUltimateGuideToWaterIntakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheUltimateGuideToWaterIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
