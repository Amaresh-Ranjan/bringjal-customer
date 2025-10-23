import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterPurificationAnimationInfoSectionComponent } from './water-purification-animation-info-section.component';

describe('WaterPurificationAnimationInfoSectionComponent', () => {
  let component: WaterPurificationAnimationInfoSectionComponent;
  let fixture: ComponentFixture<WaterPurificationAnimationInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterPurificationAnimationInfoSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterPurificationAnimationInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
