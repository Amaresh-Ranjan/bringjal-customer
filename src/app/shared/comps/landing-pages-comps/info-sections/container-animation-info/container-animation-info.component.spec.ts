import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerAnimationInfoComponent } from './container-animation-info.component';

describe('ContainerAnimationInfoComponent', () => {
  let component: ContainerAnimationInfoComponent;
  let fixture: ComponentFixture<ContainerAnimationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerAnimationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerAnimationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
