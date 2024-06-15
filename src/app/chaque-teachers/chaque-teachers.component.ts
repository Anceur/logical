import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ChaqueTeachersComponent  {


}
