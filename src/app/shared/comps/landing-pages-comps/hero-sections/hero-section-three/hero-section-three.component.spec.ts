import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionThreeComponent } from './hero-section-three.component';

describe('HeroSectionThreeComponent', () => {
  let component: HeroSectionThreeComponent;
  let fixture: ComponentFixture<HeroSectionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroSectionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
