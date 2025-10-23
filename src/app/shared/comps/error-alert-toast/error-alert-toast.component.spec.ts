import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAlertToastComponent } from './error-alert-toast.component';

describe('ErrorAlertToastComponent', () => {
  let component: ErrorAlertToastComponent;
  let fixture: ComponentFixture<ErrorAlertToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorAlertToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorAlertToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
