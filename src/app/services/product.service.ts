import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class ProductService {
    private productUrl: string = environment.apiUrl;

    constructor(private http: HttpClient){}

    getProducts(){
        console.log(this.productUrl);
        return this.http.get(this.productUrl);
    }
}