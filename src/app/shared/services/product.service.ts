import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../shared/models/product.model';

export interface IProductsDto {
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

export interface IProductDto {
  id: string;
  sku: string;
  title: string;
  price: number;
  basePrice: number;
  stocked: boolean;
  image: string;
  desc: string;
}

@Injectable()
export class ProductService {
  private productUrl: string = environment.apiProductUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<IProductsDto>(this.productUrl).pipe(
      map((data) => {
        return data.selectedProducts.map((dto) => {
          return new Product(<any>dto);
        });
      }),
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.productUrl + id).pipe(
      map((data) => {
        return new Product(data);
      }),
    );
  }

  saveProduct(productId: string, product: Product): Observable<Product> {
    return this.http.put<IProductDto>(this.productUrl + productId, product).pipe(
      map((data) => {
        return new Product(data);
      }),
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<IProductDto>(this.productUrl, product).pipe(
      map((data) => {
        return new Product(data);
      }),
    );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.productUrl + id).pipe(
      map((data) => {
        return new Product(data);
      }),
    );
  }
}
