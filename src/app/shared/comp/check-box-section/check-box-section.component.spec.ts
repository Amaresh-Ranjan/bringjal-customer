import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxSectionComponent } from './check-box-section.component';

describe('CheckBoxSectionComponent', () => {
  let component: CheckBoxSectionComponent;
  let fixture: ComponentFixture<CheckBoxSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckBoxSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckBoxSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
