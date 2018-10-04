import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../shared/models/product.model';

export interface IProductDto {
  total: number;
  page: number;
  pageSize: number;
  selectedProducts: [
    {
      id: string;
      sku: string;
      title: string;
      price: number;
      basePrice: number;
      stocked: boolean;
      image: string;
      desc: string;
    }
  ];
}

@Injectable()
export class ProductService {
  private productUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<IProductDto>(this.productUrl).pipe(
      map((data) => {
        return data.selectedProducts.map((dto) => {
          return new Product(<any>dto);
        });
      }),
    );
  }
}
