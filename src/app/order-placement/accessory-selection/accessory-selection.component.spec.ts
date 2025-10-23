import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessorySelectionComponent } from './accessory-selection.component';

describe('AccessorySelectionComponent', () => {
  let component: AccessorySelectionComponent;
  let fixture: ComponentFixture<AccessorySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessorySelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessorySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
