import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleiveryScheduleSectionComponent } from './deleivery-schedule-section.component';

describe('DeleiveryScheduleSectionComponent', () => {
  let component: DeleiveryScheduleSectionComponent;
  let fixture: ComponentFixture<DeleiveryScheduleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleiveryScheduleSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleiveryScheduleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
