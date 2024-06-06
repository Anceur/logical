import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTwoComponent } from './categories-two.component';

describe('CategoriesTwoComponent', () => {
  let component: CategoriesTwoComponent;
  let fixture: ComponentFixture<CategoriesTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
