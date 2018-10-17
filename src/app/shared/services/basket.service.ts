import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { IProductDto } from './product.service';

export interface IBasketDto {
  items?: BasketItemDto[];
}

export class BasketItemDto {
  id?: number;
  quantity?: number;
}

export interface BasketDto extends Array<BasketItemDto> {}

const basketUrl = `${environment.apiBaseUrl}/basket/${environment.basketKey}`;

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}

  getBasket(): Observable<IBasketDto> {
    return this.http.get<IBasketDto>(basketUrl);
  }

  addToBasket(productId: number, quantity: number): Observable<IBasketDto> {
    return this.http.post<IBasketDto>(`${basketUrl}/product/${productId}`, { quantity: quantity });
  }

  deleteBasket(): Observable<IBasketDto> {
    return this.http.delete<IBasketDto>(basketUrl);
  }

  deleteProductFromBasket(product: IProductDto): Observable<IBasketDto> {
    return this.http.delete<IBasketDto>(`${basketUrl}/product/${product.id}`);
  }
}
