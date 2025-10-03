import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../services/clientService/clientService';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {


  service = inject(ClientService);

  ngOnInit(): void {
    this.service.getUsersList().subscribe(res => {
      if(res.result) {
        console.log(res);
        this.service.getUserByUserId().subscribe(myUser => {
          console.log(myUser.data);
        });
      } else {
        alert('Failed to fetch users');
      }
    });       
  }

}
