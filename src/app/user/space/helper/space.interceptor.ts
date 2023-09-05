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

@Injectable()
export class SpaceInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, 
    private employeeService: EmployeeService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const data = this.authService.getToken()
    if (data) {
      const localToken = data.token

      const modRequest = request.clone({
        headers: request.headers.set('token', `${localToken}`)
      })

      return next.handle(modRequest);

    } else {
      const employee = this.employeeService.getToken()
      const localToken = employee.token

      const modRequest = request.clone({
        headers: request.headers.set('token', `${localToken}`)
      })

      return next.handle(modRequest);

    }

  }
}
