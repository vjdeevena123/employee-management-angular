import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Roles } from './components/roles/roles';
import { Master } from './components/master/master';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Employee_Project');
}
