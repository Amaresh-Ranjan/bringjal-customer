import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewsFirstSectionComponent } from './user-reviews-first-section.component';

describe('UserReviewsFirstSectionComponent', () => {
  let component: UserReviewsFirstSectionComponent;
  let fixture: ComponentFixture<UserReviewsFirstSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReviewsFirstSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReviewsFirstSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
