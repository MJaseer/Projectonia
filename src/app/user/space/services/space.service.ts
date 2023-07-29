import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignee, Task } from '../store/space-store';
import { Project } from '../Project/interface/project';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class SpaceService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  managerId!: string;

  idFecther(){
    let token = this.authService.getToken()
    this.managerId = token.userId
  }

  getAssignee(): Observable<any> {
    this.idFecther()
    return this.http.get(`http://localhost:3000/api/getAssignee/${this.managerId}`, { withCredentials: true })
  }

  addAssignee(payload: Assignee): Observable<any> {
    this.idFecther()
    return this.http.post<Assignee>(`http://localhost:3000/api/addAssignee/${this.managerId}`, payload, { withCredentials: true })
  }

  editAssignee(payload: Assignee): Observable<any> {
    return this.http.patch<Assignee>(`http://localhost:3000/api/editAssignee/${payload._id}`, payload, { withCredentials: true })
  }

  deleteAssignee(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/deleteAssignee/${_id}`, { withCredentials: true })
  }

  getProject(): Observable<any> {
    this.idFecther()
    return this.http.get(`http://localhost:3000/api/getProject/${this.managerId}`, { withCredentials: true })
  }

  newProject(data: Project): Observable<Project> {
    this.idFecther()
    return this.http.post<Project>(`http://localhost:3000/api/newProject/${this.managerId}`, data, { withCredentials: true })
  }

  updateProject() {
    // TODO : Implement Update project API call
  }

  deleteProject(id: string) {
    return this.http.delete(`http://localhost:3000/api/deleteProject/${id}`, { withCredentials: true })
  }

  getTask() {
    this.idFecther()
    return this.http.get<Task[]>(`http://localhost:3000/api/getTask/${this.managerId}`, { withCredentials: true })
  }

  createTask(payload: Task) {
    const id = payload.projectId
    return this.http.post<Task>(`http://localhost:3000/api/createTask/${id}`, payload, { withCredentials: true })
  }

}
