import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterCanModalComponent } from './water-can-modal.component';

describe('WaterCanModalComponent', () => {
  let component: WaterCanModalComponent;
  let fixture: ComponentFixture<WaterCanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterCanModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterCanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
