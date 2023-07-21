import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignee } from '../store/space-store';
import { Project } from '../Project/interface/project';

@Injectable({
  providedIn: 'root'
})

export class SpaceService {

  constructor(private http: HttpClient) { }

  getAssignee(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getAssignee', { withCredentials: true })
  }

  addAssignee(payload: Assignee): Observable<any> {
    return this.http.post<Assignee>('http://localhost:3000/api/addAssignee', payload, { withCredentials: true })
  }

  editAssignee(payload: Assignee): Observable<any> {
    return this.http.patch<Assignee>(`http://localhost:3000/api/editAssignee/${payload._id}`, payload, { withCredentials: true })
  }

  deleteAssignee(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/deleteAssignee/${_id}`, { withCredentials: true })
  }

  getProject(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getProject', { withCredentials: true })
  }

  newProject(data: Project): Observable<Project> {
    console.log('getcaled', data);

    return this.http.post<Project>('http://localhost:3000/api/newProject', data, { withCredentials: true })
  }

  deleteProject(id: string) {
    return this.http.delete(`http://localhost:3000/api/deleteProject/${id}`, { withCredentials: true })
  }

}
