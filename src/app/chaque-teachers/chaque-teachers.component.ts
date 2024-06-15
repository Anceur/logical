import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { StudentManagementService } from '../core/services/student-management.service';
import { ITeacher } from '../core/models/common.model';


@Component({
  selector: 'app-chaque-teachers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chaque-teachers.component.html',
  styleUrls: ['./chaque-teachers.component.scss']
})
export class ChaqueTeachersComponent implements OnInit {
  id!: string | null;

  teachers: ITeacher[] = [];
  filteredTeachers: ITeacher[] = [];
  selectedTeacher: ITeacher | null = null;

  constructor(private route: ActivatedRoute,private studentService: StudentManagementService) {}
 

  ngOnInit() {
    this.getAllTeachers();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); // التحقق من جلب 'id' كـ 'key'
      if (this.id) {
        this.loadTeacherDetails(this.id);
      } else {
        console.error('Key not found in route');
      }
    });
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


  loadTeacherDetails(id: string) {
    const database = getDatabase();
    const teacherRef = ref(database, `teachers/${id}`);
    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.teachers = Object.values(data);
      } else {
        this.teachers = [];
      }
    });
  }
}
