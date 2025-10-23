import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSectionOneComponent } from './footer-section-one.component';

describe('FooterSectionOneComponent', () => {
  let component: FooterSectionOneComponent;
  let fixture: ComponentFixture<FooterSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSectionOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
