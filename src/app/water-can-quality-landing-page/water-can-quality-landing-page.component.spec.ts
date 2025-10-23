import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterCanQualityLandingPageComponent } from './water-can-quality-landing-page.component';

describe('WaterCanQualityLandingPageComponent', () => {
  let component: WaterCanQualityLandingPageComponent;
  let fixture: ComponentFixture<WaterCanQualityLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterCanQualityLandingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterCanQualityLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
