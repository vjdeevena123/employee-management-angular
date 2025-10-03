import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../../models/class/clientModel';
import { environment } from '../../../environments/environment.development';
import { APIResponseModel } from '../../models/interfaces/roles/roles';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  getAllClients() :Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.apiUrl + 'GetAllClients');
  }

  getAllEmployees() :Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.apiUrl + 'GetAllEmployee');
  }

  addUpdateClient(clientObj: ClientModel): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(environment.apiUrl + 'AddUpdateClient', clientObj);
  }

  deleteClientById(clientId: number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(environment.apiUrl + 'DeleteClientByClientId?clientId=' + clientId);
  }

  getAllClientProjects(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.apiUrl + 'GetAllClientProjects');
  }

  addUpdateClientProject(clientProject: any): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(environment.apiUrl + 'AddUpdateClientProject', clientProject);
  }

  getUserLogin(loginObj: any): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(environment.userUrl + 'Login', loginObj);
  }

  getUsersList(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.userUrl + 'GetAllUsers');
  }

  getUserByUserId(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.userUrl + 'GetUserByUserId?userId=' + localStorage.getItem('userId'));
  }

  updateUserPassword(userObj: any): Observable<APIResponseModel> {
    return this.http.put<APIResponseModel>(environment.userUrl + 'UpdateUser', userObj);
  }

  createUser(userObj: any): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(environment.userUrl + 'CreateNewUser', userObj);
  }
}
