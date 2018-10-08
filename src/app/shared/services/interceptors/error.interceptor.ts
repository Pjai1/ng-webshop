import { Injectable, ErrorHandler } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NoConnectionError } from '../../errors/no-connection.error';
import { ServerError } from '../../errors/server.error';
import { ClientError } from '../../errors/client.error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private errorHandler: ErrorHandler) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log('hitting this ' + JSON.stringify(err));
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status <= 499) {
            console.error('Error Occurred with status ' + <any>err.status + ' and body ' + JSON.stringify(err));
            this.toastr.error('Oops, something went wrong. Please try again.');
            return throwError(new ClientError(err.status, err.statusText, err.message));
          } else if (err.status >= 500) {
            console.error('Error Occurred with status ' + <any>err.status + ' and body ' + JSON.stringify(err.message));
            this.toastr.error('Oops, something went wrong. Please try again.');
            return throwError(new ServerError(err.status, err.statusText, err));
          } else if (err.status === 0) {
            console.error('Error Occurred with status ' + <any>err.status + ' and body ' + JSON.stringify(err.message));
            this.toastr.error('Oops, looks like something\'s wrong with your connection. Please retry.');
            return throwError(new NoConnectionError(err.message));
          }
        }
        console.error(
          'Something really bad happened with status ' + <any>err.status + ' and body ' + JSON.stringify(err.message),
        );
        this.toastr.error('Something really bad happened, please contact the administrator of this website.');
        return throwError(err);
      }),
      retry(2),
    );
  }
}
