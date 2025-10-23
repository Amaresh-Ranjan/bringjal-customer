import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeroSectionComponent } from './main-hero-section.component';

describe('MainHeroSectionComponent', () => {
  let component: MainHeroSectionComponent;
  let fixture: ComponentFixture<MainHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainHeroSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
