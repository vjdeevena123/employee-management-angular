import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  router = inject(Router);

  logout() {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
