import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignee, Task } from '../store/space-store';
import { Project } from '../../user/space/Project/interface/project';
import { AuthService } from '../../user/service/auth.service';
import { i_manager } from '../user/i_manager';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { environment } from 'src/environments/environment';

const url = `${environment.backendPort}/api`

@Injectable({
  providedIn: 'root'
})

export class SpaceService {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private employeeService:EmployeeService) { }

  managerId!: string;

  idFecther() {
    let token = this.authService.getToken()
    if(token){
      this.managerId = token._id
    }
    if(this.managerId == undefined||null){
      token = this.employeeService.getToken()
      this.managerId = token.managerId
    }
    
    return token
  }

  getManager() {
    const manager = this.idFecther()
    return this.http.post<i_manager>(`${url}/getManager/${this.managerId}`, manager, { withCredentials: true })
  }

  updateManager(manager:i_manager){
    return this.http.put<i_manager>(`${url}/updateManager/${this.managerId}`, manager, { withCredentials: true })
  }

  getAssignee() {
    this.idFecther()
    return this.http.get<Assignee[]>(`${url}/getAssignee/${this.managerId}`, { withCredentials: true })
  }

  addAssignee(payload: Assignee) {
    this.idFecther()
    return this.http.post<Assignee>(`${url}/addAssignee/${this.managerId}`, payload, { withCredentials: true })
  }

  editAssignee(payload: Assignee) {
    return this.http.patch<Assignee>(`${url}/editAssignee/${payload._id}`, payload, { withCredentials: true })
  }

  deleteAssignee(_id: string) {
    return this.http.delete(`${url}/deleteAssignee/${_id}`, { withCredentials: true })
  }

  getProject() {
    this.idFecther()
    return this.http.get<Project[]>(`${url}/project/getProject/${this.managerId}`, { withCredentials: true })
  }

  newProject(data: Project): Observable<Project> {
    this.idFecther()
    return this.http.post<Project>(`${url}/project/newProject/${this.managerId}`, data, { withCredentials: true })
  }

  updateProject() {
    // TODO : Implement Update project API call
  }

  deleteProject(id: string) {

    return this.http.delete(`${url}/project/deleteProject/${id}`, { withCredentials: true })
    
  }

  getTask() {
    this.idFecther()
    return this.http.get<Task[]>(`${url}/task/getTask/${this.managerId}`, { withCredentials: true })
  }

  createTask(payload: Task) {    
    const id = payload.projectId
    if(id){
      return this.http.post<Task>(`${url}/task/createTask/${id}`, payload, { withCredentials: true })
    }
    return this.http.post<Task>(`${url}/task/createTask/${id}`, payload, { withCredentials: true })
  }

  editTask(payload: Task) {
    return this.http.put<Task>(`${url}/task/updateTask/${payload._id}`, payload, { withCredentials: true })
  }

  deleteTask(id: string) {
    return this.http.delete(`${url}/task/deleteTask/${id}`, { withCredentials: true })
  }

  getImage(data:i_manager){
    return this.http.post(`${url}/getImage`, data,{ withCredentials: true })
  }

}
