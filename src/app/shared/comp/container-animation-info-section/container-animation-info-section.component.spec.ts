import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerAnimationInfoSectionComponent } from './container-animation-info-section.component';

describe('ContainerAnimationInfoSectionComponent', () => {
  let component: ContainerAnimationInfoSectionComponent;
  let fixture: ComponentFixture<ContainerAnimationInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerAnimationInfoSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerAnimationInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
