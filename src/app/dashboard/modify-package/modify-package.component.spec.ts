import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPackageComponent } from './modify-package.component';

describe('ModifyPackageComponent', () => {
  let component: ModifyPackageComponent;
  let fixture: ComponentFixture<ModifyPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
