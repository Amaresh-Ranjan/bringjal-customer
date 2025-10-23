import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlantPriceComponent } from './slant-price.component';

describe('SlantPriceComponent', () => {
  let component: SlantPriceComponent;
  let fixture: ComponentFixture<SlantPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlantPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlantPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
