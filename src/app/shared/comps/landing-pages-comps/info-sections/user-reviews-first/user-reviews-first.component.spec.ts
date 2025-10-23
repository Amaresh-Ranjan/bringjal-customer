import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewsFirstComponent } from './user-reviews-first.component';

describe('UserReviewsFirstComponent', () => {
  let component: UserReviewsFirstComponent;
  let fixture: ComponentFixture<UserReviewsFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReviewsFirstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReviewsFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
