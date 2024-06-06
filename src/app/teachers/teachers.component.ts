import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentManagementService } from '../core/services/student-management.service';
import { ITeacher } from '../core/models/common.model';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {
  teachersForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentManagementService) {
    this.teachersForm = this.fb.group({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Category:new FormControl('', [Validators.required]),
      Subject:new FormControl('', [Validators.required]),
  
    });
  }
 

  onSubmit() {
    if (this.teachersForm.valid) {
      const teacher = this.teachersForm.value as ITeacher;
      const category = this.teachersForm.get('Category')?.value;
      this.studentService.addTeacherToCategory(teacher, category).then(() => {
        console.log("Teacher added successfully!");
        this.teachersForm.reset();
      }).catch(error => {
        console.error("Error adding teacher: ", error);
      });
    } else {
      this.teachersForm.markAllAsTouched();
    }
  }
  
}
