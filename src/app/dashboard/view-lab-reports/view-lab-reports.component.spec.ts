import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLabReportsComponent } from './view-lab-reports.component';

describe('ViewLabReportsComponent', () => {
  let component: ViewLabReportsComponent;
  let fixture: ComponentFixture<ViewLabReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLabReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLabReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
