import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../core/models/common.model';
import { StudentManagementService } from '../core/services/student-management.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teachers-management',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './teachers-management.component.html',
  styleUrls: ['./teachers-management.component.scss']
})
export class TeachersManagementComponent implements OnInit {
  teachers: ITeacher[] = [];
  selectedTeacher: ITeacher | null = null;

  constructor(private studentService: StudentManagementService) {}

  ngOnInit(): void {
    this.getAllTeachers();
 
  }

  getAllTeachers() {
    const categories = ['Category 1', 'Category 2', 'Category 3'];
    this.teachers = [];

    categories.forEach(category => {
      this.studentService.getAllTeachers(category).subscribe({
        next: (data: ITeacher[]) => {
          this.teachers = [...this.teachers, ...data];
        },
        error: (error: any) => {
          console.error(`Error fetching teachers for ${category}: `, error);
        }
      });
    });
  }
  editTeacher(teacher: ITeacher) {
    this.selectedTeacher = { ...teacher };
  }

  saveTeacher() {
    if (this.selectedTeacher && this.selectedTeacher.key) {
      this.studentService.updateTeacher(this.selectedTeacher.key, this.selectedTeacher).then(() => {
        this.getAllTeachers(); // Refresh the teacher list after saving
        this.selectedTeacher = null;
      }).catch(error => {
        console.error("Error updating teacher: ", error);
      });
    }
  }
  deleteTeacher(teacher: ITeacher) {
    if (teacher.key && teacher.Category) {
      this.studentService.deleteTeacher(teacher.Category, teacher.key).then(() => {
        this.getAllTeachers(); // Refresh the teacher list after deleting
      }).catch(error => {
        console.error("Error deleting teacher: ", error);
      });
    }
  }

  cancelEdit() {
    this.selectedTeacher = null;
  }
 
    }
