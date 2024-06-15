import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../core/models/common.model';
import { StudentManagementService } from '../core/services/student-management.service';
import { Router, RouterLink } from '@angular/router';
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
  // teachers: ITeacher[] = [];
  // selectedTeacher: ITeacher | null = null;
  teachers: ITeacher[] = [];
  filteredTeachers: ITeacher[] = [];
  selectedTeacher: ITeacher | null = null;
  searchQuery: string = '';  // إضافة خاصية البحث
  
  constructor(private studentService: StudentManagementService,private router: Router) {}

  ngOnInit(): void {
    this.getAllTeachers();
 
  }

  getAllTeachers() {
    const categories = ['Category 1', 'Category 2', 'Category 3'];
    this.teachers = [];
    this.filteredTeachers = []; // إعادة تعيين القائمة المفلترة

    categories.forEach(category => {
      this.studentService.getTeachersByCategory(category).subscribe({
        next: (data: ITeacher[]) => {
          this.teachers = [...this.teachers, ...data];
          
          this.filteredTeachers = this.teachers; // تعيين القائمة المفلترة لتكون نفس قائمة المعلمين عند البداية
          console.log('Teachers:', this.teachers);
        },
        error: (error: any) => {
          console.error(`Error fetching teachers for ${category}: `, error);
        }
      });
    });
  }

  searchTeachers() {
    if (this.searchQuery) {
      this.filteredTeachers = this.teachers.filter(teacher =>
        teacher.FirstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        teacher.LastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        teacher.Subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        teacher.Category.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log('Filtered Teachers:', this.filteredTeachers);  // طباعة القائمة المفلترة
    } else {
      this.filteredTeachers = this.teachers;
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
  editTeacher(teacher: ITeacher) {
    this.selectedTeacher = { ...teacher };
  }
  saveTeacher() {
    if (this.selectedTeacher?.key && this.selectedTeacher?.Category) {
      const { key, Category, ...teacherWithoutKey } = this.selectedTeacher;
      this.studentService.updateTeacher(Category, key, teacherWithoutKey).then(() => {
        this.getAllTeachers(); // تحديث قائمة المعلمين بعد الحفظ
        this.selectedTeacher = null;
        console.log(key);
      }).catch(error => {
        console.error("Error updating teacher: ", error);
      });
    }
  }
  
  
 


  cancelEdit() {
    this.selectedTeacher = null;
  }
  
  printPage() {
    window.print();
  }

clickCard(id: string) {
  if (id) {
    this.router.navigate(['/teachers-management/chaque-teachers', id]);
  } else {
    console.error('Teacher key is undefined');
  }
}
    }
