import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentManagementService } from '../../core/services/student-management.service';
import { IStudent } from '../../core/models/common.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-management-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './student-management-form.component.html',
  styleUrls: ['./student-management-form.component.scss']
})
export class StudentManagementFormComponent {
  studentForm: FormGroup;
  showSubjectField = false;
  showTeachersField = false;
  teachers: any[] = [];

  constructor(private fb: FormBuilder, private studentService: StudentManagementService) {
    this.studentForm = this.fb.group({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      DateOfBirth: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Level: new FormControl('', [Validators.required]),
      Subject: new FormControl(''),
      Paye :new FormControl('', [Validators.required]),
      Category: new FormControl('', [Validators.required]),
      numerotel:new FormControl(''),
      numerotelPere:new FormControl('',[Validators.required]),
      Educate: new FormControl('')
    });
  }
  onCategoryChange() {
    const category = this.studentForm.get('Category')?.value;
    this.showSubjectField = category === 'Category 1' || category === 'Category 2' || category === 'Category 3';
    if (this.showSubjectField) {
      this.studentService.getTeachersByCategory(category).subscribe(teachers => {
        this.teachers = teachers;
        this.showTeachersField = true;
      });
    } else {
      this.showTeachersField = false;
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.studentService.addStudent(this.studentForm.value as IStudent).then(() => {
        console.log("Student added successfully!");
        this.studentForm.reset();
      }).catch(error => {
        console.error("Error adding student: ", error);
      });
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
 }
