import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundEffectComponent } from './background-effect.component';

describe('BackgroundEffectComponent', () => {
  let component: BackgroundEffectComponent;
  let fixture: ComponentFixture<BackgroundEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundEffectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackgroundEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
