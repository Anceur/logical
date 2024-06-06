import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesOneComponent } from './categories-one.component';

describe('CategoriesOneComponent', () => {
  let component: CategoriesOneComponent;
  let fixture: ComponentFixture<CategoriesOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
