import { Component } from '@angular/core';
import { Roles } from '../roles/roles';
import { Designation } from '../designation/designation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-master',
  imports: [CommonModule, Roles, Designation],
  templateUrl: './master.html',
  styleUrl: './master.css'
})
export class Master {

  current: string ="Roles";

  changeTab(tabName: string) {
    this.current = tabName;
  }
}
