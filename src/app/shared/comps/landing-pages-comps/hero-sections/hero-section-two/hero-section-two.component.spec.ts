import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionTwoComponent } from './hero-section-two.component';

describe('HeroSectionTwoComponent', () => {
  let component: HeroSectionTwoComponent;
  let fixture: ComponentFixture<HeroSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
