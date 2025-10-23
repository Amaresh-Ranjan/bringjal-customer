import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewsSection } from './user-reviews-section';

describe('UserReviewsSection', () => {
  let component: UserReviewsSection;
  let fixture: ComponentFixture<UserReviewsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReviewsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReviewsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
