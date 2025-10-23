import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionOneComponent } from './hero-section-one.component';

describe('HeroSectionOneComponent', () => {
  let component: HeroSectionOneComponent;
  let fixture: ComponentFixture<HeroSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
