import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsMainComponent } from './blogs-main.component';

describe('BlogsMainComponent', () => {
  let component: BlogsMainComponent;
  let fixture: ComponentFixture<BlogsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
