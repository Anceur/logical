import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaqueTeachersComponent } from './chaque-teachers.component';

describe('ChaqueTeachersComponent', () => {
  let component: ChaqueTeachersComponent;
  let fixture: ComponentFixture<ChaqueTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChaqueTeachersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChaqueTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
