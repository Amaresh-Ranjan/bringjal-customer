import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayCardInfoSectionComponent } from './overlay-card-info-section.component';

describe('OverlayCardInfoSectionComponent', () => {
  let component: OverlayCardInfoSectionComponent;
  let fixture: ComponentFixture<OverlayCardInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayCardInfoSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayCardInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
