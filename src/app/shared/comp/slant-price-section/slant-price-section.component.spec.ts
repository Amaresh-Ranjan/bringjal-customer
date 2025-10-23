import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlantPriceSectionComponent } from './slant-price-section.component';

describe('SlantPriceSectionComponent', () => {
  let component: SlantPriceSectionComponent;
  let fixture: ComponentFixture<SlantPriceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlantPriceSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlantPriceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
