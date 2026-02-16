import { isPlatformBrowser } from "@angular/common";
import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import {Observable} from "rxjs";

export function loggingInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  // Only attempt to read localStorage when running in the browser
  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    const token = localStorage.getItem('token');

    if (token && token !== 'undefined' && token !== 'null') {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(authReq);
    }
  }

  return next(req);
}
