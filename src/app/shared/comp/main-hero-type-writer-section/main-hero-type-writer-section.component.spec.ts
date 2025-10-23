import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeroTypeWriterSectionComponent } from './main-hero-type-writer-section.component';

describe('MainHeroTypeWriterSectionComponent', () => {
  let component: MainHeroTypeWriterSectionComponent;
  let fixture: ComponentFixture<MainHeroTypeWriterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainHeroTypeWriterSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainHeroTypeWriterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
