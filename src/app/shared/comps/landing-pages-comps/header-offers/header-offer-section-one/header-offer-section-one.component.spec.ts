import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOfferSectionOneComponent } from './header-offer-section-one.component';

describe('HeaderOfferSectionOneComponent', () => {
  let component: HeaderOfferSectionOneComponent;
  let fixture: ComponentFixture<HeaderOfferSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOfferSectionOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderOfferSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
