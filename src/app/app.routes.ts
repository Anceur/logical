import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { StudentManagementComponent } from './student-management/student-management/student-management.component';
import { StudentManagementFormComponent } from './student-management/student-management-form/student-management-form.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { CategoriesOneComponent } from './home/categories/categories-one/categories-one.component';
import { CategoriesTwoComponent } from './home/categories/categories-two/categories-two.component';
import { CategoriesThreeComponent } from './home/categories/categories-three/categories-three.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeachersManagementComponent } from './teachers-management/teachers-management.component';
import { CoursesComponent } from './courses/courses.component';
import { PaymentComponent } from './payment/payment.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ClassesComponent } from './classes/classes.component';

export const routes: Routes = [
    {
        path : '',redirectTo:'home',pathMatch:'full'
    },
    {
        path : 'home',component:HomeComponent,
    },
    {
        path : 'student-management',component:StudentManagementComponent
    },
    {
        path : 'student-management-form',component:StudentManagementFormComponent
    },
    {
        path :'categories',component:CategoriesComponent
    },
    {
        path: 'categories-one',component:CategoriesOneComponent
    },
    {
        path: 'categories-two',component:CategoriesTwoComponent
    },
    {
        path: 'categories-three',component:CategoriesThreeComponent
    },
   
    {
        path: 'teachers',component:TeachersComponent
    },
    {
        path :'teachers-management',component:TeachersManagementComponent
    },
    {
        path:'courses',component:CoursesComponent
    },
    {
        path:'payment',component:PaymentComponent
    },
    {
        path :'classes',component:ClassesComponent
    },
    {
        path :'timetable',component:TimetableComponent
    },
    {
        path : '**',redirectTo:'home',pathMatch:'full'
    },
    

    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }