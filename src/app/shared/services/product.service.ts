import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

export interface IProductsDto {
  total?: number;
  page?: number;
  pageSize?: number;
  selectedProducts: IProductDto[];
}

export interface IProductDto {
  id?: number;
  sku?: string;
  title?: string;
  price?: number;
  basePrice?: number;
  stocked?: boolean;
  image?: string;
  desc?: string;
}

const productUrl = `${environment.apiBaseUrl}/products`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(sortProperty?: string): Observable<IProductDto[]> {
    sortProperty ? (sortProperty = sortProperty.trim()) : (sortProperty = null);
    const options = sortProperty
      ? {
          params: new HttpParams().set('sort', sortProperty),
        }
      : {};

    return this.http.get<IProductsDto>(productUrl, options).pipe(map((products) => products.selectedProducts));
  }

  getProduct(id: number): Observable<IProductDto> {
    return this.http.get<IProductDto>(`${productUrl}/${id}`);
  }

  saveProduct(product: IProductDto): Observable<IProductDto> {
    if (!product.id) {
      return this.createProduct(product);
    }
    return this.updateProduct(product);
  }

  updateProduct(product: IProductDto): Observable<IProductDto> {
    return this.http.put<IProductDto>(`${productUrl}/${product.id}`, product);
  }

  createProduct(product: IProductDto): Observable<IProductDto> {
    return this.http.post<IProductDto>(productUrl, product);
  }

  deleteProduct(product: IProductDto): Observable<IProductDto> {
    return this.http.delete<IProductDto>(`${productUrl}/${product.id}`);
  }
}
