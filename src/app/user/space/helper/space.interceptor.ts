import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Injectable()
export class SpaceInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // debugger
    const data = this.authService.getToken()
    console.log(data);

    const localToken = data.token

    const modRequest = request.clone({
      headers: request.headers.set('Authorization', `${localToken}`)
    })
    return next.handle(modRequest);
    
  }
}
