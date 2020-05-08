import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements  HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err) => {
        let message = ""
        if (err.status === 401) {
          //refresh token or navigate to login
          message = "Token has expired or you should be logged in"
        }
        else if (err.status === 404) {
          message = "404"
        }
        else if (err.status === 400) {
          message = "400"
        }
        else {
          message = "Unexpected error"
        }
        return throwError(err)
      })
    )
  }
}