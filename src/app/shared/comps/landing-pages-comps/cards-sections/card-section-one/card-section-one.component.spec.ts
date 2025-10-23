import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSectionOneComponent } from './card-section-one.component';

describe('CardSectionOneComponent', () => {
  let component: CardSectionOneComponent;
  let fixture: ComponentFixture<CardSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSectionOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
