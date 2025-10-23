import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSectionThreeComponent } from './footer-section-three.component';

describe('FooterSectionThreeComponent', () => {
  let component: FooterSectionThreeComponent;
  let fixture: ComponentFixture<FooterSectionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSectionThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterSectionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
