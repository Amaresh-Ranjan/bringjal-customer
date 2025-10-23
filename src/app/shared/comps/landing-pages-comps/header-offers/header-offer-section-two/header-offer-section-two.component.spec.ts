import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOfferSectionTwoComponent } from './header-offer-section-two.component';

describe('HeaderOfferSectionTwoComponent', () => {
  let component: HeaderOfferSectionTwoComponent;
  let fixture: ComponentFixture<HeaderOfferSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOfferSectionTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderOfferSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
