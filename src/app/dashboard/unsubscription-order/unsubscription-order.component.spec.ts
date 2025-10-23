import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscriptionOrderComponent } from './unsubscription-order.component';

describe('UnsubscriptionOrderComponent', () => {
  let component: UnsubscriptionOrderComponent;
  let fixture: ComponentFixture<UnsubscriptionOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsubscriptionOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsubscriptionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
