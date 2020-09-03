import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerOverlayService } from "../services/spiner-overlay.service";
import { Observable, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  httpRequestUrls: Array<string> = [
    "api/notifications",
    "api/identity/pendingfriends",
  ];

  constructor(private readonly spinnerOverlayService: SpinnerOverlayService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const showSpinner: boolean = this.httpRequestUrls.some((x) =>
      req.url.endsWith(x)
    );
    let spinnerSubscription: Subscription;

    if (!showSpinner) {
      spinnerSubscription = this.spinnerOverlayService.spinner$.subscribe();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (!showSpinner) {
          spinnerSubscription.unsubscribe();
        }
      })
    );
  }
}
