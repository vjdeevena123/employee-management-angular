import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRole } from '../../models/interfaces/roles/roles';

@Component({
  selector: 'app-roles',
  imports: [FormsModule,CommonModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles implements OnInit{
  // firstName: string = 'Angular';
  // lastName: string = 'Developer';
  // isActive: boolean = false;
  // currentDate: Date = new Date();
  // inputType: string = 'radio';

  http = inject(HttpClient);
  roles: IRole[] = [];
  
  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.http.get('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles').subscribe((res: any) => {
      this.roles = res.data;
    });
  }
}
