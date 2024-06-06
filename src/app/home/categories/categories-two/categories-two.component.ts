import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IStudent, ITeacher } from '../../../core/models/common.model';
import { StudentManagementService } from '../../../core/services/student-management.service';

@Component({
  selector: 'app-categories-two',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './categories-two.component.html',
  styleUrl: './categories-two.component.scss'
})
export class CategoriesTwoComponent implements OnInit{
  students: IStudent[] = [];
  teachers: ITeacher[] = [];


  constructor(private studentService: StudentManagementService) { }
  ngOnInit(): void {
    this.getStudents();
    this.fetchTeachers();
  }

  getStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students.filter(student => student.Category === 'Category 2');
    });
  }

  fetchTeachers() {
    this.studentService.getTeachersByCategory('Category 2').subscribe(teachers => {
      this.teachers = teachers;
    });
  }
  getStudentsForTeacher(teacher: ITeacher): IStudent[] {
    return this.students.filter(student => student.Subject === teacher.Subject);
  }
  deleteStudent(studentKey: string) {
    this.studentService.deleteStudent(studentKey).then(() => this.getStudents())
      .catch(error => console.error("Error deleting student: ", error));
  }
}
