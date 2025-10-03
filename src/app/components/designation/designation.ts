import { Component, inject, OnInit } from '@angular/core';
import { Master } from '../../services/master/master';
import { APIResponseModel, IDesignation } from '../../models/interfaces/roles/roles';

@Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.html',
  styleUrl: './designation.css'
})
export class Designation implements OnInit {
  designations: IDesignation[] = [];
  isLoader: boolean = true;
  masterService = inject(Master);

  ngOnInit() {
    this.masterService.getDesignations().subscribe((data: APIResponseModel) => {
      this.designations = data.data;
      this.isLoader = false;
    }, (error) => {
        alert('Error fetching designations: ' + error);
        this.isLoader = false;
      }
    );
  }

}
