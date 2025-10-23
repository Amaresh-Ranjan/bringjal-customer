import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingCanSectionComponent } from './floating-can-section.component';

describe('FloatingCanSectionComponent', () => {
  let component: FloatingCanSectionComponent;
  let fixture: ComponentFixture<FloatingCanSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingCanSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloatingCanSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
