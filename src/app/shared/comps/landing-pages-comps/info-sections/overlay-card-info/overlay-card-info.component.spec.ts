import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayCardInfoComponent } from './overlay-card-info.component';

describe('OverlayCardInfoComponent', () => {
  let component: OverlayCardInfoComponent;
  let fixture: ComponentFixture<OverlayCardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayCardInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
