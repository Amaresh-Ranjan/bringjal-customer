import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingCanComponent } from './floating-can.component';

describe('FloatingCanComponent', () => {
  let component: FloatingCanComponent;
  let fixture: ComponentFixture<FloatingCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingCanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloatingCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
