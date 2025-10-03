import { Component, inject, OnInit } from '@angular/core';
import {ClientModel} from '../../models/class/clientModel';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/clientService/clientService';
import { APIResponseModel } from '../../models/interfaces/roles/roles';
@Component({
  selector: 'app-client',
  imports: [FormsModule],
  templateUrl: './client.html',
  styleUrl: './client.css'
})

export class Client implements OnInit {
  clientObj: ClientModel = new ClientModel();
  clientList: ClientModel[] = []; 
  clientService = inject(ClientService);

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    // Call the service to get the clients
    this.clientService.getAllClients().subscribe((res: APIResponseModel) => {
      if (res.result) {
        this.clientList = res.data;
      } else {
        console.error('Error fetching clients:', res.message);
      }
    });
  }

  saveClient() {
    this.clientService.addUpdateClient(this.clientObj).subscribe((res: APIResponseModel) => {
      if (res.result) {
        this.loadClients();
        this.clientObj = new ClientModel();
      } else {
        console.error('Error saving client:', res.message);
      }
    });
  }

  deleteClient(clientId: number) {
    this.clientService.deleteClientById(clientId).subscribe((res: APIResponseModel) => {
      if (res.result) {
        this.loadClients();
      } else {
        console.error('Error deleting client:', res.message);
      }
    });
  }

  editClient(clientData: ClientModel) {
    this.clientObj = clientData ; // Create a copy of the client to edit
  }
}
