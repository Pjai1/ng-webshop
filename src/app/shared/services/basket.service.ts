import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Basket } from '../models/basket.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const basketUrl = `${environment.apiBaseUrl}/basket/${environment.basketKey}`;

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}

  getBasket(): Observable<Basket> {
    return this.http.get<Basket>(basketUrl).pipe(
      map((data) => {
        return new Basket(data);
      }),
    );
  }

  addToBasket(productId: number): Observable<Basket> {
    return this.http.post<Basket>(`${basketUrl}/product/${productId}`, null).pipe(
      map((data) => {
        return new Basket(data);
      }),
    );
  }

  deleteBasket(): Observable<Basket> {
    return this.http.delete<Basket>(basketUrl).pipe(
      map((data) => {
        return new Basket(data);
      }),
    );
  }
}
