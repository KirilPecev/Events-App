import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { ErrorInterceptor } from "../message-constants";

@Injectable({
  providedIn: "root",
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private toastrServise: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err) => {
        let message = "";
        if (err.status === 401) {
          err.url.includes("/login")
            ? (message = ErrorInterceptor.INVALID_CREDENTIALS)
            : (message = ErrorInterceptor.ERROR_401);
        } else if (err.status === 404) {
          message = ErrorInterceptor.ERROR_404;
        } else if (err.status === 400) {
          message = err.error[0].description;
        } else {
          message = ErrorInterceptor.UNEXPECTED_ERROR;
        }

        this.toastrServise.error(message);
        return throwError(err);
      })
    );
  }
}
