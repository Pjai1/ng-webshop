import { Injectable, ErrorHandler } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NoConnectionError } from '../errors/no-connection.error';
import { InternalServerError } from '../errors/internal-server.error';
import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private errorHandler: ErrorHandler) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log('hitting this ' + JSON.stringify(err));
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 0:
              console.error('Error Occurred with status ' + <any>err.status + ' and body ' + err.message);
              this.toastr.error('Oops, looks like something\'s wrong with your connection. Please retry.');
              return throwError(new NoConnectionError(err.message));

            case 404:
              console.error('Error Occurred with status ' + <any>err.status + ' and body ' + err);
              this.toastr.error('Oops, something went wrong. Please try again.');
              return throwError(new NotFoundError(err.status, err.statusText, err.message));

            case 500:
              console.error('Error Occurred with status ' + <any>err.status + ' and body ' + err.message);
              this.toastr.error('Oops, something went wrong. Please try again.');
              return throwError(new InternalServerError(err.status, err.statusText, err));

            default:
              console.log('Something went really wrong');
              return throwError(err);
          }
        } else {
          console.error('Error !!!!!');
          return throwError(err);
        }
      }),
    );
  }
}
