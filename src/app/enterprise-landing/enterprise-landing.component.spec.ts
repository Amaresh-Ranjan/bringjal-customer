import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseLandingComponent } from './enterprise-landing.component';

describe('EnterpriseLandingComponent', () => {
  let component: EnterpriseLandingComponent;
  let fixture: ComponentFixture<EnterpriseLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterpriseLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
