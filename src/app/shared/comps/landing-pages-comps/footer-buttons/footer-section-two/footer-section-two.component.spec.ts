import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSectionTwoComponent } from './footer-section-two.component';

describe('FooterSectionTwoComponent', () => {
  let component: FooterSectionTwoComponent;
  let fixture: ComponentFixture<FooterSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSectionTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
