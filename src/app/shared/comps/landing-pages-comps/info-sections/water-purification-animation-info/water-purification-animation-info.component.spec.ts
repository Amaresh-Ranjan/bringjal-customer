import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterPurificationAnimationInfoComponent } from './water-purification-animation-info.component';

describe('WaterPurificationAnimationInfoComponent', () => {
  let component: WaterPurificationAnimationInfoComponent;
  let fixture: ComponentFixture<WaterPurificationAnimationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterPurificationAnimationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterPurificationAnimationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
