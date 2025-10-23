import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOfferSectionThreeComponent } from './header-offer-section-three.component';

describe('HeaderOfferSectionThreeComponent', () => {
  let component: HeaderOfferSectionThreeComponent;
  let fixture: ComponentFixture<HeaderOfferSectionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOfferSectionThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderOfferSectionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
