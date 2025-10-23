import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSectionTwoComponent } from './card-section-two.component';

describe('CardSectionTwoComponent', () => {
  let component: CardSectionTwoComponent;
  let fixture: ComponentFixture<CardSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSectionTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
