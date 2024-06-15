import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp } from 'firebase/app'; // Note the import from 'firebase/app'
import { getDatabase } from 'firebase/database'; // Note the import from 'firebase/database'
import { AppComponent } from './app.component';
import { firebaseConfig } from './core/constants/constants';
import { ChaqueTeachersComponent } from './chaque-teachers/chaque-teachers.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,ChaqueTeachersComponent
  ]
})
export class AppModule {
  constructor() {
    initializeApp(firebaseConfig);
  }
}