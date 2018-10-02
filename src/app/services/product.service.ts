import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ProductService {
    private productUrl: string = environment.apiUrl;

    constructor(private http: HttpClient){}

    getProducts(){
        console.log(this.productUrl);
        return this.http.get(this.productUrl)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error("Error occurred: "+error.error.message);
        } else {
            console.error(`Http Error with status code ${error.status} and body ${JSON.stringify(error.error)}`);
        }

        return throwError(error);
    }
}