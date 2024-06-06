import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentManagementService } from '../../core/services/student-management.service';
import { IStudent } from '../../core/models/common.model';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss']
})
export class StudentManagementComponent implements OnInit {
  students: IStudent[] = [];
  selectedStudent: IStudent | null = null;
   
 

  constructor(private studentService: StudentManagementService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (data: IStudent[]) => {
        this.students = data;
      },
      error: (error: any) => {
        console.error("Error fetching students: ", error);
      }
    });
  }

  deleteStudent(key: string | undefined) {
    if (key) {
      this.studentService.deleteStudent(key).then(() => {
        this.students = this.students.filter(student => student.key !== key);
      }).catch(error => {
        console.error("Error deleting student: ", error);
      });
    } else {
      console.error("Student key is undefined.");
    }
  }

  editStudent(student: IStudent) {
    this.selectedStudent = { ...student };
  }

  saveStudent() {
    if (this.selectedStudent && this.selectedStudent.key) {
      this.studentService.updateStudent(this.selectedStudent.key, this.selectedStudent).then(() => {
        this.getAllStudents();
        this.selectedStudent = null;
      }).catch(error => {
        console.error("Error updating student: ", error);
      });
    }
  }

  cancelEdit() {
    this.selectedStudent = null;
  }

}
