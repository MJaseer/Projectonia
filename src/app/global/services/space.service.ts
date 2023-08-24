import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignee, Task } from '../store/space-store';
import { Project } from '../../user/space/Project/interface/project';
import { AuthService } from '../../user/service/auth.service';
import { i_manager } from '../user/i_manager';

const url = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})

export class SpaceService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  managerId!: string;

  idFecther() {
    let token = this.authService.getToken()
    this.managerId = token._id
    return token
  }

  getManager() {
    const manager = this.idFecther()
    return this.http.post<i_manager[]>(`${url}/getManager/${this.managerId}`, manager, { withCredentials: true })
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
    return this.http.get<Project[]>(`${url}/getProject/${this.managerId}`, { withCredentials: true })
  }

  newProject(data: Project): Observable<Project> {
    this.idFecther()
    return this.http.post<Project>(`${url}/newProject/${this.managerId}`, data, { withCredentials: true })
  }

  updateProject() {
    // TODO : Implement Update project API call
  }

  deleteProject(id: string) {
    return this.http.delete(`${url}/deleteProject/${id}`, { withCredentials: true })
  }

  getTask() {
    this.idFecther()
    return this.http.get<Task[]>(`${url}/getTask/${this.managerId}`, { withCredentials: true })
  }

  createTask(payload: Task) {
    const id = payload.projectId
    return this.http.post<Task>(`${url}/createTask/${id}`, payload, { withCredentials: true })
  }

  editTask(payload: Task) {
    return this.http.put<Task>(`${url}/updateTask/${payload._id}`, payload, { withCredentials: true })
  }

  deleteTask(id: string) {
    return this.http.delete(`${url}/deleteTask/${id}`, { withCredentials: true })
  }

}
