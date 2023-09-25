import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from 'src/app/global/services/loader.service';
import { environment } from 'src/environments/environment';

const url = `${environment.backendPort}`

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoaderService) { }

  totalRequests = 0;
  completedRequests = 0;


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(`${url}/api/chat/storeMessages`)) {
      return next.handle(request)
    }

    this.loadingService.show()
    this.totalRequests++;

    return next.handle(request).pipe(
      finalize(() => {

        this.completedRequests++;

        if (this.completedRequests === this.totalRequests) {
          this.loadingService.hide();
          this.completedRequests = 0;
          this.totalRequests = 0;
        }
      })
    )
  }
}
