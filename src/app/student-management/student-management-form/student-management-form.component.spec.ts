import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentManagementFormComponent } from './student-management-form.component';

describe('StudentManagementFormComponent', () => {
  let component: StudentManagementFormComponent;
  let fixture: ComponentFixture<StudentManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentManagementFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
