import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../shared/models/product.model';

export interface IProductsDto {
  total: number;
  page: number;
  pageSize: number;
  selectedProducts: IProductDto[];
}

export interface IProductDto {
  id: number;
  sku: string;
  title: string;
  price: number;
  basePrice: number;
  stocked: boolean;
  image: string;
  desc: string;
}

const productUrl = `${environment.apiBaseUrl}/products`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(sortProperty?: string): Observable<Product[]> {
    sortProperty ? (sortProperty = sortProperty.trim()) : (sortProperty = null);
    const options = sortProperty
      ? {
          params: new HttpParams().set('sort', sortProperty),
        }
      : {};

    return this.http.get<IProductsDto>(productUrl, options).pipe(
      map((data) => {
        return data.selectedProducts.map((dto) => {
          return new Product(<any>dto);
        });
      }),
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${productUrl}/${id}`).pipe(
      map((data) => {
        return new Product(data);
      }),
    );
  }

  saveProduct(product: Product): Observable<Product> {
    if (product.isNew()) {
      return this.createProduct(product);
    }
    return this.updateProduct(product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<IProductDto>(`${productUrl}/${product.id}`, product).pipe(
      map((data) => {
        return new Product(data);
      }),
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<IProductDto>(productUrl, product).pipe(
      map((data) => {
        return new Product(data);
      }),
    );
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${productUrl}/${product.id}`).pipe(
      map((data) => {
        return new Product(data);
      }),
    );
  }
}
