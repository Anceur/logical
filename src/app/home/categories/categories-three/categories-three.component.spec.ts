import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesThreeComponent } from './categories-three.component';

describe('CategoriesThreeComponent', () => {
  let component: CategoriesThreeComponent;
  let fixture: ComponentFixture<CategoriesThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
