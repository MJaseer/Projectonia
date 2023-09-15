import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { AdminService } from 'src/app/admin/service/admin.service';
import { environment } from 'src/environments/environment';

const url = `${environment.backendPort}`


@Injectable()
export class SpaceInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, 
    private employeeService: EmployeeService,
    private adminService:AdminService,
    ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.startsWith(`${url}/api/admin`)){
      const admin = this.adminService.getToken()
      
      const localToken = admin?.token
      if(localToken){
        const modRequest = request.clone({
          headers: request.headers.set('token', `${localToken}`)
        })
        return next.handle(modRequest);
      } else {
        return next.handle(request)
      }
    }
    
    const data = this.authService.getToken()
    const employee = this.employeeService.getToken()
    
    if (data) {
      const localToken = data?.token
      if(localToken){
        const modRequest = request.clone({
          headers: request.headers.set('token', `${localToken}`)
        })
        return next.handle(modRequest);
      } else {
        return next.handle(request)
      }
      
    } else if(employee){
      const localToken = employee?.token

      if(localToken){
        const modRequest = request.clone({
          headers: request.headers.set('token', `${localToken}`)
        })
        return next.handle(modRequest);
      } else {
        return next.handle(request)
      }

    } else {
      return next.handle(request)
    }

  }
}
