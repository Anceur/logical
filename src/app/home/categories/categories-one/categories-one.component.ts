import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IStudent, ITeacher } from '../../../core/models/common.model';
import { StudentManagementService } from '../../../core/services/student-management.service';

@Component({
  selector: 'app-categories-one',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categories-one.component.html',
  styleUrls: ['./categories-one.component.scss']
})
export class CategoriesOneComponent implements OnInit {
  students: IStudent[] = [];
  teachers: ITeacher[] = [];
  selectedStudent: IStudent | null = null;

  constructor(private studentService: StudentManagementService) { }

  ngOnInit(): void {
    this.getStudents();
    this.fetchTeachers();
  }

  getStudents() {
    this.studentService.getStudentsByCategory('Category 1').subscribe(students => {
      this.students = students;
    });
  }

  fetchTeachers() {
    this.studentService.getTeachersByCategory('Category 1').subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  getStudentsForTeacher(teacher: ITeacher): IStudent[] {
    return this.students.filter(student => student.Subject === teacher.Subject);
  }

  editStudent(student: IStudent) {
    this.selectedStudent = student;
    // Navigate to the student management form or implement the logic for editing the student
  }

  deleteStudent(student: IStudent) {
    if (student.key) {
      this.studentService.deleteStudent(student.key).then(() => {
        this.getStudents();  // Refresh the student list after deletion
      }).catch(error => {
        console.error("Error deleting student: ", error);
      });
    }
  }
}
