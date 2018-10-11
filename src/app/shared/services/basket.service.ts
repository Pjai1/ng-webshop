import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Basket } from '../models/basket.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

export class BasketItemDto {
  id: number;
  quantity: number;
}

export interface BasketDto extends Array<BasketItemDto> {}

const basketUrl = `${environment.apiBaseUrl}/basket/${environment.basketKey}`;

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}

  getBasket(): Observable<Basket> {
    return this.http.get<BasketDto>(basketUrl).pipe(
      map((data) => {
        return new Basket(data);
      }),
    );
  }

  addToBasket(productId: number, quantity: number): Observable<Basket> {
    return this.http.post<BasketDto>(`${basketUrl}/product/${productId}`, { quantity: quantity }).pipe(
      map((data) => {
        return new Basket(data);
      }),
    );
  }

  deleteBasket(): Observable<Basket> {
    return this.http.delete<BasketDto>(basketUrl).pipe(
      map((data) => {
        return new Basket(data);
      }),
    );
  }

  deleteProductFromBasket(product: Product): Observable<Basket> {
    return this.http.delete<BasketDto>(`${basketUrl}/product/${product.id}`).pipe(
      map((data) => {
        return new Basket(data);
      }),
    );
  }
}
