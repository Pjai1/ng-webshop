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

export class BasketDto {
  items: BasketItemDto[] = [];

  constructor(data?: any) {
    if (!data) {
      return;
    }
    data.forEach((item: BasketItemDto) => {
      this.items.push(item);
    });
  }
}

const basketUrl = `${environment.apiBaseUrl}/basket/${environment.basketKey}`;

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}

  getBasket(): Observable<Basket> {
    return this.http.get<BasketItemDto[]>(basketUrl).pipe(
      map((data) => {
        const basketDto = new BasketDto(data);
        return new Basket(<any>basketDto);
      }),
    );
  }

  addToBasket(product: Product, quantity: number): Observable<Basket> {
    return this.http.post<BasketItemDto[]>(`${basketUrl}/product/${product.id}`, { quantity: quantity }).pipe(
      map((data) => {
        const basketDto = new BasketDto(data);
        return new Basket(<any>basketDto);
      }),
    );
  }

  deleteBasket(): Observable<Basket> {
    return this.http.delete<BasketItemDto[]>(basketUrl).pipe(
      map((data) => {
        // although we get the deleted basket back, we have no use for it
        return new Basket();
      }),
    );
  }

  deleteProductFromBasket(product: Product): Observable<Basket> {
    return this.http.delete<BasketItemDto[]>(`${basketUrl}/product/${product.id}`).pipe(
      map((data) => {
        const basketDto = new BasketDto(data);
        return new Basket(<any>basketDto);
      }),
    );
  }
}
