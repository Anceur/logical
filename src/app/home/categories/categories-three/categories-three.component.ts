import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IStudent, ITeacher } from '../../../core/models/common.model';
import { StudentManagementService } from '../../../core/services/student-management.service';

@Component({
  selector: 'app-categories-three',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './categories-three.component.html',
  styleUrl: './categories-three.component.scss'
})
export class CategoriesThreeComponent implements OnInit {
  students: IStudent[] = [];
  teachers: ITeacher[] = [];
  selectedStudent: IStudent | null = null;

  constructor(private studentService: StudentManagementService) { }

  ngOnInit(): void {
    this.getStudents();
    this.fetchTeachers();
  }

  getStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students.filter(student => student.Category === 'Category 3');
    });
  }

  fetchTeachers() {
    this.studentService.getTeachersByCategory('Category 3').subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  getStudentsForTeacher(teacher: ITeacher): IStudent[] {
    return this.students.filter(student => student.Subject === teacher.Subject);
  }
  deleteStudent(student: IStudent) {
    if (!student || !student.key) {
      console.error("Invalid student or student key.");
      return;
    }
  
    this.studentService.deleteStudent(student.key)
      .then(() => {
        this.getStudents(); // Refresh the student list after deletion
      })
      .catch(error => {
        console.error("Error deleting student: ", error);
      });
  }
  
  }
