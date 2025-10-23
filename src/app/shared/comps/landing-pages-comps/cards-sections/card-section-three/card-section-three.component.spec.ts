import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSectionThreeComponent } from './card-section-three.component';

describe('CardSectionThreeComponent', () => {
  let component: CardSectionThreeComponent;
  let fixture: ComponentFixture<CardSectionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSectionThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSectionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
