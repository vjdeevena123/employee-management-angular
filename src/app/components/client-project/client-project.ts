import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { APIResponseModel, IClientProject } from '../../models/interfaces/roles/roles';
import { ClientService } from '../../services/clientService/clientService';
import { ClientModel } from '../../models/class/clientModel';
import { Employee } from '../../models/interfaces/roles/roles';
import { MyButton } from "../../reusableComponents/my-button/my-button";
@Component({
  selector: 'app-client-project',
  imports: [DatePipe, ReactiveFormsModule, MyButton],
  templateUrl: './client-project.html',
  styleUrl: './client-project.css'
})

export class ClientProject implements OnInit {
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startDate: new FormControl(''),
    expectedEndDate: new FormControl(''),
    leadByEmpId: new FormControl(0),
    completedDate: new FormControl(''),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(0),
    projectCost: new FormControl(0),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(0),
  });

  clientProjectList = signal<IClientProject[]>([]);
  // clientProjectList: IClientProject[] = [];
  clientList: ClientModel[] = [];
  empList: Employee[] = [];
  clientService = inject(ClientService);

  ngOnInit(): void {
    this.getAllClientProjects();
    this.getAllClients();
    this.getAllEmployees();
  }

  saveClientProject() {
    const formValue = this.projectForm.value;
    this.clientService.addUpdateClientProject(formValue).subscribe((response: APIResponseModel) => {
      if (response.result) {
        this.getAllClientProjects();
        this.projectForm.reset();
      }else {
        console.error(response.message);
      }
    })
  }

  getAllClientProjects() {
    this.clientService.getAllClientProjects().subscribe((response: APIResponseModel) => {
      if (response.result) {
        this.clientProjectList.set(response.data);
      } else {
        console.error(response.message);
      }
    });
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe((response: APIResponseModel) => {
      if (response.result) {
        this.clientList = response.data;
      } else {
        console.error(response.message);
      }
    });
  }

  getAllEmployees() {
    this.clientService.getAllEmployees().subscribe((response: APIResponseModel) => {
      if (response.result) {
        this.empList = response.data;
      } else {
        console.error(response.message);
      }
    });
  }
}
