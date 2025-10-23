import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInfoSectionComponent } from './process-info-section.component';

describe('ProcessInfoSectionComponent', () => {
  let component: ProcessInfoSectionComponent;
  let fixture: ComponentFixture<ProcessInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessInfoSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
