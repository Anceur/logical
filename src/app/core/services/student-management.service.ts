import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IStudent, ITeacher } from '../models/common.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {

  private dbPath = '/students';
  private ddbbPath = '/teachers';

  constructor(private db: AngularFireDatabase) {}

  getTeachersByCategory(category: string): Observable<ITeacher[]> {
    return this.db.list<ITeacher>(`${this.ddbbPath}/${category}`).valueChanges();
  }
  

  // getStudentsForTeacher(teacher: ITeacher): Observable<IStudent[]> {
  //   return this.db.list<IStudent>(this.dbPath, ref =>
  //     ref.orderByChild('Subject').equalTo(teacher.Subject)
  //   ).valueChanges();
  // }
  deleteStudentByCategory(category: string, email: string) {
    return this.db.list<IStudent>(this.dbPath, ref =>
      ref.orderByChild('Category').equalTo(category).equalTo(email)
    ).remove();
  }
  getStudentsByCategory(category: string): Observable<IStudent[]> {
    return this.db.list<IStudent>(this.dbPath, ref =>
      ref.orderByChild('Category').equalTo(category)
    ).valueChanges();
  }
  updateTeacher(key: string, value: any): Promise<void> {
    return this.db.list(`${this.ddbbPath}`).update(key, value);
  }

  deleteTeacher(category: string, key: string): Promise<void> {
    return this.db.list(`${this.ddbbPath}/${category}`).remove(key);
  }
  deleteStudent(key: string) : Promise<void> {
    return this.db.list(this.dbPath).remove(key);
  }
  deleteStudentsForTeacher(teacherKey: string) {
    return this.db.list<IStudent>(this.dbPath, ref =>
      ref.orderByChild('teacherKey').equalTo(teacherKey)
    ).remove();
  }

  addTeacherToCategory(teacher: ITeacher, category: string) {
    return this.db.list(`${this.ddbbPath}/${category}`).push(teacher);
  }

  getAllStudents(): Observable<IStudent[]> {
    return this.db.list<IStudent>(this.dbPath).valueChanges();
  }
  getAllTeachers(category: string): Observable<ITeacher[]> {
    return this.db.list<ITeacher>(`${this.ddbbPath}/${category}`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const key = c.payload.key as string; // Ensure key is a string
          return { key, ...c.payload.val() as ITeacher };
        })
      )
    );
  }

  // getAllTeachers(category: string): Observable<ITeacher[]> {
  //   return this.db.list<ITeacher>(`${this.ddbbPath}/${category}`).valueChanges();
  // }

  getStudents(): Observable<IStudent[]> {
    return this.db.list<IStudent>(this.dbPath).valueChanges();
  }

  addStudent(student: IStudent) {
    return this.db.list(this.dbPath).push(student);
  }

  addTeacher(teacher: ITeacher) {
    return this.db.list(this.ddbbPath).push(teacher);
  }


 

  updateStudent(key: string, student: IStudent) {
    return this.db.list(this.dbPath).update(key, student);
  }

  // updateTeacher(key: string, teacher: ITeacher) {
  //   return this.db.list(this.ddbbPath).update(key, teacher);
  // }
}
