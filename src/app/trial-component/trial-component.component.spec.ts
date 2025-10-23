import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialComponentComponent } from './trial-component.component';

describe('TrialComponentComponent', () => {
  let component: TrialComponentComponent;
  let fixture: ComponentFixture<TrialComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
