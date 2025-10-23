import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumScreenModalComponent } from './medium-screen-modal.component';

describe('MediumScreenModalComponent', () => {
  let component: MediumScreenModalComponent;
  let fixture: ComponentFixture<MediumScreenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediumScreenModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediumScreenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
